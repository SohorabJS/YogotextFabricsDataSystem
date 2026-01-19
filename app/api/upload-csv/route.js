import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import RegularSample from '@/models/regularSample';
import { connectMongoose } from '@/lib/mongoose';

export async function POST(req) {
  try {
    // Connect to database
    await connectMongoose();

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      console.log('FormData entries:', Array.from(formData.entries()));
      return NextResponse.json(
        { error: 'No file provided. Make sure to send file in form-data with key "file"' },
        { status: 400 }
      );
    }

    // Save file temporarily
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}_${file.name || 'regularSampleData.csv'}`;
    const filePath = path.join(uploadDir, fileName);

    const bytes = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(bytes));

    // Parse CSV and insert into database
    const records = [];
    let processedCount = 0;
    let errorCount = 0;
    const errors = [];

    return new Promise((resolve) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', async (row) => {
          try {
            // Map CSV columns to database fields
            const sampleData = {
              sampleCode: row['Sample Code']?.trim(),
              sampleItemCode: row['Sample Item Name/Code']?.trim(),
              processingType: row['Processing type']?.trim() || 'Regular Finish',
              construction: row['Construction']?.trim(),
              color: row['Color']?.trim(),
              customerName: row['Customer']?.trim(),
              customerRequiredWidth: row['Customer Required Width']?.trim(),
              customerRequirementLengthPercent: row['Customer Requirement Length(%)']?.trim(),
              customerRequirementWidthPercent: row['Customer Requirement Width(%)']?.trim(),
              weightBW: row['Weight B/W']?.trim(),
              sampleIssueDate: row['Sample Issue Date'] ? new Date(row['Sample Issue Date']) : null,
              finishingDate: row['Finishing Date'] ? new Date(row['Finishing Date']) : null,
              loomNo: row['Loom No'] ? parseInt(row['Loom No']) : null,
              warpingNo: row['Warpping No'] ? parseInt(row['Warpping No']) : null,
              yard: row['Yard']?.trim(),
              weavingPPI: row['Weaving PPI'] ? parseInt(row['Weaving PPI']) : null,
              afterDryerWidthInch: row['After Dryer Width(Inch)']?.trim(),
              dryerSkewCM: row['Dryer Skey(CM)']?.trim(),
              afterShrinkageSkewCM: row['After Shrinkage Skey(CM)']?.trim(),
              afterShrinkagePPI: row['After Shrinkage PPI'] ? parseInt(row['After Shrinkage PPI']) : null,
              ppiPlus: row['PPI(+)'] ? parseInt(row['PPI(+)']) : null,
              afterWashSkewCM: row['After Wash Skew(CM)']?.trim(),
              afterShrinkageWidthInch: row['After Srinkage Width(Inch)']?.trim(),
              boxPercentRightHand: row['Box % (Right Hand)']?.trim(),
              boxPercentLeftHand: row['Box % (Left Hand)']?.trim(),
              afterWashWidthPercent: row['After Wash Width %']?.trim(),
              afterWashLengthPercent: row['After Wash Length %']?.trim(),
              afterWashWidthInch: row['After Wash Width(Inch)']?.trim(),
              afterWashPPI: row['After Wash PPI']?.trim(),
              sampleProcessingDetails: row['Fabrics Process Flow']?.trim(),
            };

            // Only add if sample code exists
            if (sampleData.sampleCode) {
              records.push(sampleData);
            }
          } catch (err) {
            errorCount++;
            errors.push(`Row error: ${err.message}`);
          }
        })
        .on('end', async () => {
          try {
            // Insert all records into database
            if (records.length > 0) {
              const result = await RegularSample.insertMany(records);
              processedCount = result.length;
            }

            // Clean up temporary file
            fs.unlinkSync(filePath);

            resolve(
              NextResponse.json(
                {
                  message: 'CSV imported successfully',
                  processedCount,
                  errorCount,
                  errors: errors.length > 0 ? errors : undefined,
                },
                { status: 200 }
              )
            );
          } catch (err) {
            // Clean up temporary file
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }

            resolve(
              NextResponse.json(
                { error: `Database insertion error: ${err.message}` },
                { status: 500 }
              )
            );
          }
        })
        .on('error', (err) => {
          // Clean up temporary file
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }

          resolve(
            NextResponse.json(
              { error: `CSV parsing error: ${err.message}` },
              { status: 500 }
            )
          );
        });
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}
