 import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import RegularSample from '@/models/regularSample';
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
  // dd/mm/yyyy or d/m/yyyy
  const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (m) {
    const day = parseInt(m[1], 10);
    const month = parseInt(m[2], 10) - 1;
    const year = parseInt(m[3], 10);
    const d = new Date(Date.UTC(year, month, day));
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
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

    const fileName = `${Date.now()}_${file.name || 'regularSampleData.csv'}`;
    const filePath = path.join(uploadDir, fileName);

    const bytes = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(bytes));

    const records = [];
    const parseErrors = [];
    let csvRowIndex = 0;

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          csvRowIndex++;
          try {
            const norm = buildNormalizedRowMap(row);

            const sampleData = {
              sampleCode: getValFromMap(norm, ['Sample Code', 'samplecode', 'sample_code', 'Sample Item Name/Code', 'sampleitemcode', 'sampleitemname/code']),
              sampleItemCode: getValFromMap(norm, ['Sample Item Name/Code', 'sampleitemcode', 'sample item name/code']),
              processingType: getValFromMap(norm, ['Processing type', 'processingtype']) || 'Regular Finish',
              construction: getValFromMap(norm, ['Construction']),
              color: getValFromMap(norm, ['Color']),
              customerName: getValFromMap(norm, ['Customer']),
              customerRequiredWidth: getValFromMap(norm, ['Customer Required Width']),
              customerRequirementLengthPercent: getValFromMap(norm, ['Customer Requirement Length(%)']),
              customerRequirementWidthPercent: getValFromMap(norm, ['Customer Requirement Width(%)']),
              weightBW: getValFromMap(norm, ['Weight B/W']),
              sampleIssueDate: parseDateOrNull(getValFromMap(norm, ['Sample Issue Date'])),
              finishingDate: parseDateOrNull(getValFromMap(norm, ['Finishing Date'])),
              loomNo: parseIntOrNull(getValFromMap(norm, ['Loom No'])),
              warpingNo: parseIntOrNull(getValFromMap(norm, ['Warpping No', 'Warping No'])),
              yard: getValFromMap(norm, ['Yard']),
              weavingPPI: parseIntOrNull(getValFromMap(norm, ['Weaving PPI'])),
              afterDryerWidthInch: getValFromMap(norm, ['After Dryer Width(Inch)']),
              dryerSkewCM: getValFromMap(norm, ['Dryer Skey(CM)', 'Dryer Skew(CM)']),
              afterShrinkageSkewCM: getValFromMap(norm, ['After Shrinkage Skey(CM)', 'After Shrinkage Skew(CM)']),
              afterShrinkagePPI: parseIntOrNull(getValFromMap(norm, ['After Shrinkage PPI'])),
              ppiPlus: parseIntOrNull(getValFromMap(norm, ['PPI(+)', 'PPI'])),
              afterWashSkewCM: getValFromMap(norm, ['After Wash Skew(CM)']),
              afterShrinkageWidthInch: getValFromMap(norm, ['After Srinkage Width(Inch)', 'After Shrinkage Width(Inch)']),
              boxPercentRightHand: getValFromMap(norm, ['Box % (Right Hand)']),
              boxPercentLeftHand: getValFromMap(norm, ['Box % (Left Hand)']),
              afterWashWidthPercent: getValFromMap(norm, ['After Wash Width %']),
              afterWashLengthPercent: getValFromMap(norm, ['After Wash Length %']),
              afterWashWidthInch: getValFromMap(norm, ['After Wash Width(Inch)']),
              afterWashPPI: getValFromMap(norm, ['After Wash PPI']),
              sampleProcessingDetails: getValFromMap(norm, ['Fabrics Process Flow', 'Fabric Process Flow', 'sampleprocessingdetails']),
              remarks: getValFromMap(norm, ['Remarks', 'remark']),
            };

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
        const result = await RegularSample.insertMany(records, { ordered: false });
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