 import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import RegularSample from '@/models/regularSample';
import HeatSettingSample from '@/models/heatSettingSample';
import { connectMongoose } from '@/lib/mongoose';

export const runtime = 'nodejs';

function normalizeKey(k) {
  return String(k || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function buildNormalizedRowMap(row) {
  const map = {};
  for (const k of Object.keys(row || {})) {
    map[normalizeKey(k)] = row[k];
  }
  return map;
}

function getValFromMap(map, candidates) {
  for (const c of candidates) {
    const v = map[normalizeKey(c)];
    if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
  }
  return null;
}

function parseIntOrNull(v) {
  if (v === null || v === undefined) return null;
  const cleaned = String(v).trim().replace(/[^0-9\-]/g, '');
  const n = parseInt(cleaned, 10);
  return Number.isNaN(n) ? null : n;
}

function parseDateOrNull(v) {
  if (!v) return null;
  const s = String(v).trim();
  // Support both m/d/yyyy and dd/mm/yyyy formats
  // Try to intelligently parse - if first number > 12, it's likely dd/mm/yyyy
  const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (m) {
    let day = parseInt(m[1], 10);
    let month = parseInt(m[2], 10);
    const year = parseInt(m[3], 10);
    
    // If day > 12, swap them (means it's dd/mm format)
    if (day > 12 && month <= 12) {
      [day, month] = [month, day];
    }
    // Otherwise assume m/d/yyyy format (month, day order)
    
    const d = new Date(Date.UTC(year, month - 1, day));
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Detect sample type (heat setting vs regular) from CSV headers
 * Heat Setting samples have: beforeHeatSettingWidth, afterHeatSettingWidth, machineWidthSetting, tempSetting
 * Regular samples do NOT have these fields
 */
function detectSampleType(headers) {
  const normalizedHeaders = headers.map(h => normalizeKey(h));
  
  const heatSettingIndicators = [
    'beforeheatsettingwidth',
    'afterheatsettingwidth',
    'beforehswidth',
    'afterhswidth',
    'machinewidthsetting',
    'tempsetting',
    'burnerq',
    'burnnerqnt',
    'mcspeeed',
    'machinespeeed'
  ];
  
  const hasHeatSettingFields = heatSettingIndicators.some(indicator =>
    normalizedHeaders.some(header => header.includes(indicator))
  );
  
  return hasHeatSettingFields ? 'heat-setting' : 'regular';
}

export async function POST(req) {
  try {
    await connectMongoose();

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided. Send file in form-data with key "file".' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = `${Date.now()}_${file.name || 'sampleData.csv'}`;
    const filePath = path.join(uploadDir, fileName);

    const bytes = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(bytes));

    const records = [];
    const parseErrors = [];
    let csvRowIndex = 0;
    let sampleType = null;
    let firstRowHeaders = null;

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          csvRowIndex++;
          try {
            // Detect sample type from first row headers
            if (!sampleType && !firstRowHeaders) {
              firstRowHeaders = Object.keys(row);
              sampleType = detectSampleType(firstRowHeaders);
            }

            const norm = buildNormalizedRowMap(row);

            let sampleData;

            if (sampleType === 'heat-setting') {
              // HEAT SETTING SAMPLE MAPPING
              sampleData = {
                sampleCode: getValFromMap(norm, ['sampleCode', 'sample code', 'Sample Code']),
                sampleItemCode: getValFromMap(norm, ['sampleItemName', 'sampleItemCode', 'sample item name', 'sample item code']),
                construction: getValFromMap(norm, ['constructionNo', 'construction', 'Construction']),
                color: getValFromMap(norm, ['color', 'Color']),
                customerName: getValFromMap(norm, ['customerName', 'customer name', 'Customer Name']),
                customerRequiredWidth: getValFromMap(norm, ['customerRequiredWidth', 'customer required width', 'Customer Required Width']),
                customerRequirementWidthPercent: getValFromMap(norm, ['customerRequiredWidth%', 'customerRequirementWidthPercent', 'customer required width percent', 'customer requirement width percent']),
                customerRequirementLengthPercent: getValFromMap(norm, ['customerRequiredLength%', 'customerRequirementLengthPercent', 'customer required length percent', 'customer requirement length percent']),
                weightBW: getValFromMap(norm, ['customerRequiredWeight', 'weightBW', 'weight bw']),
                processingType: 'Heat Setting',
                loomNo: parseIntOrNull(getValFromMap(norm, ['loomNo', 'loom no', 'Loom No'])),
                warpingNo: parseIntOrNull(getValFromMap(norm, ['warppingNo', 'warpingNo', 'warpping no', 'Warping No'])),
                yard: getValFromMap(norm, ['yard', 'Yard']),
                beforeHSWidth: getValFromMap(norm, ['beforeHeatSettingWidth', 'beforeHSWidth', 'before heat setting width']),
                afterHSWidth: getValFromMap(norm, ['afterHeatSettingWidth', 'afterHSWidth', 'after heat setting width']),
                afterDryerWidthInch: getValFromMap(norm, ['afterDryerWidth', 'afterDryerWidthInch', 'after dryer width']),
                weavingPPI: parseIntOrNull(getValFromMap(norm, ['weavingPPI', 'weaving ppi', 'Weaving PPI'])),
                dryerSkewCM: getValFromMap(norm, ['afterDryerSkew', 'dryerSkewCM', 'dryer skew', 'Dryer Skew(CM)']),
                afterShrinkageSkewCM: getValFromMap(norm, ['afterShrinkageSkew', 'afterShrinkageSkewCM', 'after shrinkage skew']),
                afterShrinkagePPI: parseIntOrNull(getValFromMap(norm, ['afterShrinkagePPI', 'after shrinkage ppi', 'After Shrinkage PPI'])),
                ppiPlus: parseIntOrNull(getValFromMap(norm, ['afterShrinkagePPI+', 'ppiPlus', 'ppi plus', 'PPI(+)'])),
                afterWashSkewCM: getValFromMap(norm, ['afterWashSkew', 'afterWashSkewCM', 'after wash skew']),
                afterShrinkageWidthInch: getValFromMap(norm, ['afterShrinkageWidth', 'afterShrinkageWidthInch', 'after shrinkage width']),
                boxPercentRightHand: getValFromMap(norm, ['boxPercentRightHand', 'box percent right hand', 'Box % (Right Hand)']),
                boxPercentLeftHand: getValFromMap(norm, ['boxPercentLeftHand', 'box percent left hand', 'Box % (Left Hand)']),
                afterWashWidthPercent: getValFromMap(norm, ['afterWashWidthPercent', 'after wash width percent', 'After Wash Width %']),
                afterWashLengthPercent: getValFromMap(norm, ['afterWashLengthPercent', 'after wash length percent', 'After Wash Length %']),
                afterWashWidthInch: getValFromMap(norm, ['afterWashWidth', 'afterWashWidthInch', 'after wash width']),
                afterWashPPI: getValFromMap(norm, ['afterWashPPI', 'after wash ppi', 'After Wash PPI']),
                burnerQ: getValFromMap(norm, ['burnnerQnt', 'burnerQ', 'burner qty']),
                machineSpeed: getValFromMap(norm, ['m/cSpeed', 'machineSpeed', 'machine speed', 'm/c speed']),
                machineWidthSetting: getValFromMap(norm, ['machineWidthSetting', 'machine width setting']),
                tempSetting: getValFromMap(norm, ['tempSetting', 'temp setting', 'temperature setting']),
                sampleIssueDate: parseDateOrNull(getValFromMap(norm, ['sampleIssueDate', 'sample issue date', 'Sample Issue Date'])),
                finishingDate: parseDateOrNull(getValFromMap(norm, ['finishingDate', 'finishing date', 'Finishing Date'])),
                sampleProcessingDetails: getValFromMap(norm, ['sampleProcessingDetails', 'fabrics process flow', 'sample processing details']),
              };
            } else {
              // REGULAR SAMPLE MAPPING (existing)
              sampleData = {
                sampleCode: getValFromMap(norm, ['sampleCode', 'sample code', 'Sample Code', 'samplecode', 'sample_code']),
                sampleItemCode: getValFromMap(norm, ['sampleItemCode', 'sample item code', 'Sample Item Code']),
                processingType: getValFromMap(norm, ['processingType', 'processing type', 'Processing Type']) || 'Regular Finish',
                construction: getValFromMap(norm, ['construction', 'Construction']),
                color: getValFromMap(norm, ['color', 'Color']),
                customerName: getValFromMap(norm, ['customerName', 'customer name', 'Customer Name', 'Customer']),
                customerRequiredWidth: getValFromMap(norm, ['customerRequiredWidth', 'customer required width', 'Customer Required Width']),
                customerRequirementLengthPercent: getValFromMap(norm, ['customerRequirementLengthPercent', 'customer requirement length percent']),
                customerRequirementWidthPercent: getValFromMap(norm, ['customerRequirementWidthPercent', 'customer requirement width percent']),
                weightBW: getValFromMap(norm, ['weightBW', 'weight bw', 'Weight B/W']),
                sampleIssueDate: parseDateOrNull(getValFromMap(norm, ['sampleIssueDate', 'sample issue date'])),
                finishingDate: parseDateOrNull(getValFromMap(norm, ['finishingDate', 'finishing date'])),
                loomNo: parseIntOrNull(getValFromMap(norm, ['loomNo', 'loom no', 'Loom No'])),
                warpingNo: parseIntOrNull(getValFromMap(norm, ['warpingNo', 'warpping no', 'Warpping No', 'Warping No'])),
                yard: getValFromMap(norm, ['yard', 'Yard']),
                weavingPPI: parseIntOrNull(getValFromMap(norm, ['weavingPPI', 'weaving ppi', 'Weaving PPI'])),
                afterDryerWidthInch: getValFromMap(norm, ['afterDryerWidthInch', 'after dryer width inch', 'After Dryer Width(Inch)']),
                dryerSkewCM: getValFromMap(norm, ['dryerSkewCM', 'dryer skew cm', 'Dryer Skey(CM)', 'Dryer Skew(CM)']),
                afterShrinkageSkewCM: getValFromMap(norm, ['afterShrinkageSkewCM', 'after shrinkage skew cm', 'After Shrinkage Skey(CM)', 'After Shrinkage Skew(CM)']),
                afterShrinkagePPI: parseIntOrNull(getValFromMap(norm, ['afterShrinkagePPI', 'after shrinkage ppi', 'After Shrinkage PPI'])),
                ppiPlus: parseIntOrNull(getValFromMap(norm, ['ppiPlus', 'ppi plus', 'PPI(+)', 'PPI'])),
                afterWashSkewCM: getValFromMap(norm, ['afterWashSkewCM', 'after wash skew cm', 'After Wash Skew(CM)']),
                afterShrinkageWidthInch: getValFromMap(norm, ['afterShrinkageWidthInch', 'after shrinkage width inch', 'After Srinkage Width(Inch)', 'After Shrinkage Width(Inch)']),
                boxPercentRightHand: getValFromMap(norm, ['boxPercentRightHand', 'box percent right hand', 'Box % (Right Hand)', 'box%righthand']),
                boxPercentLeftHand: getValFromMap(norm, ['boxPercentLeftHand', 'box percent left hand', 'Box % (Left Hand)', 'box%lefthand']),
                afterWashWidthPercent: getValFromMap(norm, ['afterWashWidthPercent', 'after wash width percent', 'After Wash Width %', 'a/wash width %']),
                afterWashLengthPercent: getValFromMap(norm, ['afterWashLengthPercent', 'after wash length percent', 'After Wash Length %', 'a/wash length %']),
                afterWashWidthInch: getValFromMap(norm, ['afterWashWidthInch', 'after wash width inch', 'After Wash Width(Inch)']),
                afterWashPPI: getValFromMap(norm, ['afterWashPPI', 'after wash ppi', 'After Wash PPI']),
                sampleProcessingDetails: getValFromMap(norm, ['sampleProcessingDetails', 'fabrics process flow', 'Fabrics Process Flow', 'Fabric Process Flow']),
                remarks: getValFromMap(norm, ['Remarks', 'remarks', 'Remark', 'remark']),
              };
            }

            // fallback: use item code as sample code if sampleCode missing
            if (!sampleData.sampleCode && sampleData.sampleItemCode) {
              sampleData.sampleCode = sampleData.sampleItemCode;
            }

            if (sampleData.sampleCode) {
              records.push(sampleData);
            } else {
              parseErrors.push({ rowNumber: csvRowIndex, row, reason: 'Missing sampleCode or sampleItemCode' });
            }
          } catch (err) {
            parseErrors.push({ rowNumber: csvRowIndex, row, reason: err.message || String(err) });
          }
        })
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });

    let insertedCount = 0;
    const insertionErrors = [];
    if (records.length > 0) {
      try {
        // Choose model based on detected sample type
        const Model = sampleType === 'heat-setting' ? HeatSettingSample : RegularSample;
        const result = await Model.insertMany(records, { ordered: false });
        insertedCount = result.length;
      } catch (err) {
        if (err?.insertedDocs) {
          insertedCount = err.insertedDocs.length;
        }
        insertionErrors.push(err.message || String(err));
      }
    }

    try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch {}

    return NextResponse.json(
      {
        message: 'CSV import completed',
        sampleType: sampleType || 'unknown',
        totalRowsParsed: records.length + parseErrors.length,
        recordsPrepared: records.length,
        insertedCount,
        parseErrors: parseErrors.length ? parseErrors : undefined,
        insertionErrors: insertionErrors.length ? insertionErrors : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}