# CSV Field Mapping Analysis & Fix Report

## Problem Identified ✅

The four fields storing as **null** in MongoDB were caused by **header name mismatches** between your CSV file and the CSV upload handler:

```
🔴 CSV Headers (Your File):          vs  🔴 Handler Expected:
boxPercentRightHand                       'Box % (Right Hand)'
boxPercentLeftHand                        'Box % (Left Hand)'
afterWashWidthPercent                     'After Wash Width %'
afterWashLengthPercent                    'After Wash Length %'
```

**Result**: The handler couldn't find these columns, so they were stored as `null`

---

## Solution Applied ✅

Updated [app/api/upload-csv/route.js](app/api/upload-csv/route.js) to recognize **multiple variations** of each column name:

### Four Critical Fields - Now Fixed:

| Field Name | Now Recognizes |
|---|---|
| `boxPercentRightHand` | `'boxPercentRightHand'`, `'box percent right hand'`, `'Box % (Right Hand)'`, `'box%righthand'` |
| `boxPercentLeftHand` | `'boxPercentLeftHand'`, `'box percent left hand'`, `'Box % (Left Hand)'`, `'box%lefthand'` |
| `afterWashWidthPercent` | `'afterWashWidthPercent'`, `'after wash width percent'`, `'After Wash Width %'`, `'a/wash width %'` |
| `afterWashLengthPercent` | `'afterWashLengthPercent'`, `'after wash length percent'`, `'After Wash Length %'`, `'a/wash length %'` |

---

## CSV Field Verification

✅ **Your CSV Headers Match Model Fields**:

| CSV Header | Model Field | Status |
|---|---|---|
| sampleCode | `sampleCode` | ✅ MATCH |
| sampleItemCode | `sampleItemCode` | ✅ MATCH |
| processingType | `processingType` | ✅ MATCH |
| construction | `construction` | ✅ MATCH |
| color | `color` | ✅ MATCH |
| customerName | `customerName` | ✅ MATCH |
| customerRequiredWidth | `customerRequiredWidth` | ✅ MATCH |
| customerRequirementLengthPercent | `customerRequirementLengthPercent` | ✅ MATCH |
| customerRequirementWidthPercent | `customerRequirementWidthPercent` | ✅ MATCH |
| weightBW | `weightBW` | ✅ MATCH |
| sampleIssueDate | `sampleIssueDate` | ✅ MATCH |
| finishingDate | `finishingDate` | ✅ MATCH |
| loomNo | `loomNo` | ✅ MATCH |
| warpingNo | `warpingNo` | ✅ MATCH |
| yard | `yard` | ✅ MATCH |
| afterDryerWidthInch | `afterDryerWidthInch` | ✅ MATCH |
| weavingPPI | `weavingPPI` | ✅ MATCH |
| dryerSkewCM | `dryerSkewCM` | ✅ MATCH |
| afterShrinkageSkewCM | `afterShrinkageSkewCM` | ✅ MATCH |
| afterShrinkagePPI | `afterShrinkagePPI` | ✅ MATCH |
| ppiPlus | `ppiPlus` | ✅ MATCH |
| afterWashSkewCM | `afterWashSkewCM` | ✅ MATCH |
| afterShrinkageWidthInch | `afterShrinkageWidthInch` | ✅ MATCH |
| boxPercentRightHand | `boxPercentRightHand` | ⚠️ **NOW FIXED** |
| boxPercentLeftHand | `boxPercentLeftHand` | ⚠️ **NOW FIXED** |
| afterWashWidthPercent | `afterWashWidthPercent` | ⚠️ **NOW FIXED** |
| afterWashLengthPercent | `afterWashLengthPercent` | ⚠️ **NOW FIXED** |
| afterWashWidthInch | `afterWashWidthInch` | ✅ MATCH |
| afterWashPPI | `afterWashPPI` | ✅ MATCH |
| sampleProcessingDetails | `sampleProcessingDetails` | ✅ MATCH |
| Remarks | `remarks` | ✅ MATCH |

---

## What Changed

### File Modified
- [app/api/upload-csv/route.js](app/api/upload-csv/route.js)

### Changes Made
Updated the CSV field mapping object to accept **case-insensitive** and **multiple variations** of each column header name. The handler now uses a normalization function that:

1. Converts all header names to lowercase
2. Removes special characters (%, spaces, etc.)
3. Matches against multiple known variations

---

## How to Test

### Step 1: Upload Your CSV
Use the CSV upload API to import your existing CSV data:

```bash
curl -X POST http://localhost:3000/api/upload-csv \
  -F "file=@public/uploads/ssss.csv"
```

### Step 2: Search for Data
Open the Regular Samples page and search for a sample:
- http://localhost:3000/fabrics/regular

### Step 3: Verify the Fix
The four previously null fields should now display:
- `boxPercentRightHand` → Should show values like "2.09%" instead of "N/A"
- `boxPercentLeftHand` → Should show values like "-1.80%" instead of "N/A"
- `afterWashWidthPercent` → Should show values like "0.85%" instead of "N/A"
- `afterWashLengthPercent` → Should show values like "1.0%" instead of "N/A"

---

## Data in CSV File

Sample of existing data in your `ssss.csv` (first 3 rows):

```
sampleCode: PR055-01R6
boxPercentRightHand: 2.09%
boxPercentLeftHand: -1.80%
afterWashWidthPercent: 0.85%
afterWashLengthPercent: 1.0%

sampleCode: 21123-2
boxPercentRightHand: 1.23%
boxPercentLeftHand: 1.13%
afterWashWidthPercent: 1.25%
afterWashLengthPercent: 0.0%

sampleCode: PR-055-01R6
boxPercentRightHand: 0.56%
boxPercentLeftHand: -1.82%
afterWashWidthPercent: 0.00%
afterWashLengthPercent: 0.0%
```

✅ **Good news**: Your CSV has data for all four fields!

---

## Why This Happened

The original upload handler was looking for formatted column names like:
- `'Box % (Right Hand)'` 
- `'Box % (Left Hand)'`
- etc.

But your CSV uses the **database field names directly**:
- `boxPercentRightHand`
- `boxPercentLeftHand`
- etc.

This is actually **better practice** because it directly matches your database schema. The fix now supports both approaches.

---

## UI Display Fix (Already Applied)

In addition to the backend fix, the UI was also updated to show null values more clearly:

- **File**: [components/SampleResultsGrid.jsx](components/SampleResultsGrid.jsx)
- **Change**: Null values now display as **"N/A" in red color** instead of a dash
- **Benefit**: Users can clearly see which fields need data

---

## Next Steps

1. **Clear old data**: Consider removing the null records or updating them
   ```bash
   # In MongoDB:
   db.regularsamples.deleteMany({ sampleCode: { $exists: true } })
   ```

2. **Re-upload CSV**: Use the upload API with your existing CSV file

3. **Verify data**: Search in the UI to confirm all four fields now have values

---

## Summary

| Issue | Status | Fix |
|---|---|---|
| CSV headers mismatch | ✅ **FIXED** | Updated handler to recognize all variations |
| Null values in database | ✅ **WILL BE FIXED** | Upload new data with corrected handler |
| UI not showing null values | ✅ **FIXED** | Changed display to show "N/A" in red |
| Model field definitions | ✅ **OK** | All fields properly defined |

**Result**: Your CSV data will now properly import with all values populated! 🎉
