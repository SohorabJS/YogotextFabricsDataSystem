 import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import RegularSample from '@/models/regularSample';
import { connectMongoose } from '@/lib/mongoose';

export const runtime = 'nodejs'; // ensure Node runtime (Next.js 14+); remove if unsupported

export async function POST(req) {
  try {
    // Connect to DB
    await connectMongoose();

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided. Send file in form-data with key "file".' },
        { status: 400 }
      );
    }

    // Save temporary file
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = `${Date.now()}_${file.name || 'regularSampleData.csv'}`;
    const filePath = path.join(uploadDir, fileName);

    const bytes = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(bytes));

    const records = [];
    const parseErrors = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          try {
            // Normalize and coerce fields
            const parseIntOrNull = (v) => {
              const n = parseInt(String(v || '').trim(), 10);
              return Number.isNaN(n) ? null : n;
            };
            const parseDateOrNull = (v) => {
              if (!v) return null;
              const d = new Date(v);
              return isNaN(d.getTime()) ? null : d;
            };
            const trimOrNull = (v) => (v === undefined || v === null ? null : String(v).trim());

            const sampleData = {
              sampleCode: trimOrNull(row['Sample Code']),
              sampleItemCode: trimOrNull(row['Sample Item Name/Code']),
              processingType: trimOrNull(row['Processing type']) || 'Regular Finish',
              construction: trimOrNull(row['Construction']),
              color: trimOrNull(row['Color']),
              customerName: trimOrNull(row['Customer']),
              customerRequiredWidth: trimOrNull(row['Customer Required Width']),
              customerRequirementLengthPercent: trimOrNull(row['Customer Requirement Length(%)']),
              customerRequirementWidthPercent: trimOrNull(row['Customer Requirement Width(%)']),
              weightBW: trimOrNull(row['Weight B/W']),
              sampleIssueDate: parseDateOrNull(row['Sample Issue Date']),
              finishingDate: parseDateOrNull(row['Finishing Date']),
              loomNo: parseIntOrNull(row['Loom No']),
              warpingNo: parseIntOrNull(row['Warpping No']),
              yard: trimOrNull(row['Yard']),
              weavingPPI: parseIntOrNull(row['Weaving PPI']),
              afterDryerWidthInch: trimOrNull(row['After Dryer Width(Inch)']),
              dryerSkewCM: trimOrNull(row['Dryer Skey(CM)']),
              afterShrinkageSkewCM: trimOrNull(row['After Shrinkage Skey(CM)']),
              afterShrinkagePPI: parseIntOrNull(row['After Shrinkage PPI']),
              ppiPlus: parseIntOrNull(row['PPI(+)']),
              afterWashSkewCM: trimOrNull(row['After Wash Skew(CM)']),
              afterShrinkageWidthInch: trimOrNull(row['After Srinkage Width(Inch)']),
              boxPercentRightHand: trimOrNull(row['Box % (Right Hand)']),
              boxPercentLeftHand: trimOrNull(row['Box % (Left Hand)']),
              afterWashWidthPercent: trimOrNull(row['After Wash Width %']),
              afterWashLengthPercent: trimOrNull(row['After Wash Length %']),
              afterWashWidthInch: trimOrNull(row['After Wash Width(Inch)']),
              afterWashPPI: trimOrNull(row['After Wash PPI']),
              sampleProcessingDetails: trimOrNull(row['Fabrics Process Flow']),
            };

            // Only push rows with sampleCode (or tweak as per your schema)
            if (sampleData.sampleCode) records.push(sampleData);
            else parseErrors.push({ row, reason: 'Missing sampleCode' });
          } catch (err) {
            parseErrors.push({ row, reason: err.message });
          }
        })
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });

    // Insert into DB (allow partial successes)
    let insertedCount = 0;
    const insertionErrors = [];
    if (records.length > 0) {
      try {
        const result = await RegularSample.insertMany(records, { ordered: false });
        insertedCount = result.length;
      } catch (err) {
        // If insertMany throws, it may be a BulkWriteError with result.result.ok etc.
        // Try to extract insertedCount and errors
        if (err?.insertedDocs) {
          insertedCount = err.insertedDocs.length;
        }
        // Capture message and write errors for diagnostics
        insertionErrors.push(err.message || String(err));
      }
    }

    // Cleanup temp file
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