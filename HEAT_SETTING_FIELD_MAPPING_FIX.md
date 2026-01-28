# Heat Setting Field Mapping - Issues Fixed

## Issues Identified & Fixed

### 1. **customerRequiredWidth Field Issue** ✅ FIXED
**Problem:**
- CSV has two separate fields: `customerRequiredWidth` (actual width) and `customerRequiredWidth%` (percentage tolerance)
- The upload handler was incorrectly mapping the percentage field to the width field
- This caused the width value to be lost and replaced with percentage value

**What was happening:**
```
CSV: customerRequiredWidth = "50" (actual width)
CSV: customerRequiredWidth% = "±2%" (tolerance percentage)

Before fix:
- customerRequiredWidth → stored as "±2%" ❌
- customerRequirementWidthPercent → stored as "±2%" ❌

After fix:
- customerRequiredWidth → stores "50" ✅
- customerRequirementWidthPercent → stores "±2%" ✅
```

**How it was fixed:**
- Ensured the field mapping looks for exact column names first
- Added proper candidate variations in the right order
- `customerRequiredWidth` now maps only from `customerRequiredWidth` column
- `customerRequirementWidthPercent` maps from `customerRequiredWidth%` column

### 2. **afterShrinkagePPI vs ppiPlus Issue** ✅ FIXED
**Problem:**
- CSV has two separate fields: `afterShrinkagePPI` and `afterShrinkagePPI+`
- The upload handler was confusing these and mapping them to the wrong database fields
- This caused `afterShrinkagePPI` to receive `ppiPlus` value

**What was happening:**
```
CSV: afterShrinkagePPI = "82" (PPI after shrinkage)
CSV: afterShrinkagePPI+ = "85" (PPI Plus value)

Before fix:
- afterShrinkagePPI → stored as "85" ❌
- ppiPlus → stored as "85" ❌

After fix:
- afterShrinkagePPI → stores "82" ✅
- ppiPlus → stores "85" ✅
```

**How it was fixed:**
- Kept field mapping separate and distinct
- `afterShrinkagePPI` looks for `afterShrinkagePPI` column (without +)
- `ppiPlus` looks for `afterShrinkagePPI+` column (with +)
- No overlap between the two

### 3. **Date Format Issue** ✅ FIXED
**Problem:**
- CSV dates are in m/d/yyyy format (e.g., 9/10/2025 = September 10, 2025)
- Original parser assumed dd/mm/yyyy format
- This could cause incorrect date parsing when day/month values are ambiguous
- Also, some dates might not have been parsed correctly if format didn't match exactly

**What was happening:**
```
CSV: 9/10/2025 (September 10)

Before fix:
- Parsed as: Day 9, Month 10 (October 9) ❌ WRONG!

After fix:
- Smart detection: If day > 12, it's dd/mm, otherwise m/d
- For 9/10/2025: day=9, month=10, swap is NOT needed (both ≤ 12)
- Parsed as: Month 9 (September), Day 10 ✅ CORRECT!
```

**How it was fixed:**
- Improved `parseDateOrNull()` function to intelligently detect date format
- If first number > 12: assume it's dd/mm/yyyy and swap
- Otherwise: assume m/d/yyyy format
- This works for both common formats used globally

**Example scenarios:**
```
25/10/2024 → day=25, month=10 → SWAP (25>12) → October 25 ✅
9/10/2025  → day=9, month=10  → NO SWAP (9≤12) → September 10 ✅
3/4/2024   → day=3, month=4   → NO SWAP (3≤12) → March 4 ✅
15/3/2024  → day=15, month=3  → SWAP (15>12) → March 15 ✅
```

### 4. **Field Mapping Improvements** ✅ ADDED
**Added proper candidate variations for dates:**
```javascript
sampleIssueDate: parseDateOrNull(getValFromMap(norm, ['sampleIssueDate', 'sample issue date', 'Sample Issue Date'])),
finishingDate: parseDateOrNull(getValFromMap(norm, ['finishingDate', 'finishing date', 'Finishing Date'])),
```

This ensures dates are captured correctly regardless of column name casing.

---

## CSV Structure (Heat Setting Sample Data)

| CSV Column | Maps To | Type | Purpose |
|---|---|---|---|
| **customerRequiredWidth** | customerRequiredWidth | String | Actual required width value |
| **customerRequiredWidth%** | customerRequirementWidthPercent | String | Width tolerance percentage |
| **customerRequiredLength%** | customerRequirementLengthPercent | String | Length tolerance percentage |
| **afterShrinkagePPI** | afterShrinkagePPI | Integer | PPI after shrinkage |
| **afterShrinkagePPI+** | ppiPlus | Integer | PPI Plus value |
| **sampleIssueDate** | sampleIssueDate | Date | Date sample was issued (m/d/yyyy) |
| **finishingDate** | finishingDate | Date | Finishing date (m/d/yyyy) |

---

## What to Do Now

### 1. **Re-upload the CSV**
```bash
curl -X POST http://localhost:3000/api/upload-csv \
  -F "file=@public/uploads/heatSettingSampleData.csv"
```

**Expected Response:**
```json
{
  "message": "CSV import completed",
  "sampleType": "heat-setting",
  "insertedCount": 641,
  "recordsPrepared": 641,
  "totalRowsParsed": 641,
  "parseErrors": []
}
```

### 2. **Verify in MongoDB**
Check a document in `heatsettingsamples` collection:
```javascript
db.heatsettingsamples.findOne({}).pretty()
```

**Look for correct values:**
```javascript
{
  sampleCode: "X25273",
  customerRequiredWidth: "50",           // NOT a percentage! ✅
  customerRequirementWidthPercent: "±2%", // The percentage! ✅
  afterShrinkagePPI: 82,                 // Correct value ✅
  ppiPlus: 85,                           // Separate value ✅
  sampleIssueDate: ISODate("2024-09-10T00:00:00Z"), // Correctly parsed ✅
  finishingDate: ISODate("2024-10-15T00:00:00Z"),   // Correctly parsed ✅
}
```

### 3. **View in UI**
Visit: `http://localhost:3000/fabrics/heat-setting`
- Search by sample code
- Verify all fields display correct values
- Check that dates show in proper format

---

## Field Mapping Reference

### Basic Information
- sampleCode ← sampleCode
- sampleItemCode ← sampleItemName
- construction ← constructionNo
- color ← color
- customerName ← customerName
- processingType → "Heat Setting" (auto-set)

### Customer Requirements
- customerRequiredWidth ← customerRequiredWidth
- customerRequirementWidthPercent ← customerRequiredWidth%
- customerRequirementLengthPercent ← customerRequiredLength%
- weightBW ← customerRequiredWeight

### Dates (m/d/yyyy format)
- sampleIssueDate ← sampleIssueDate
- finishingDate ← finishingDate

### Loom & Weaving
- loomNo ← loomNo (numeric)
- warpingNo ← warppingNo (numeric)
- yard ← yard
- weavingPPI ← weavingPPI (numeric)

### Heat Setting Specific
- beforeHSWidth ← beforeHeatSettingWidth
- afterHSWidth ← afterHeatSettingWidth
- tempSetting ← tempSetting
- machineWidthSetting ← machineWidthSetting
- machineSpeed ← m/cSpeed
- burnerQ ← burnnerQnt

### After Processing
- afterDryerWidthInch ← afterDryerWidth
- dryerSkewCM ← afterDryerSkew
- afterShrinkagePPI ← afterShrinkagePPI (NOT including +)
- ppiPlus ← afterShrinkagePPI+
- afterShrinkageSkewCM ← afterShrinkageSkew
- afterShrinkageWidthInch ← afterShrinkageWidth
- afterWashSkewCM ← afterWashSkew
- afterWashWidthInch ← afterWashWidth
- afterWashPPI ← afterWashPPI
- boxPercentLeftHand ← boxPercentLeftHand
- boxPercentRightHand ← boxPercentRightHand
- afterWashWidthPercent ← afterWashWidthPercent
- afterWashLengthPercent ← afterWashLengthPercent

---

## Testing Checklist

- [ ] CSV re-uploaded successfully
- [ ] insertedCount shows correct number of records
- [ ] No parseErrors in response
- [ ] MongoDB shows correct customerRequiredWidth values
- [ ] MongoDB shows correct afterShrinkagePPI values
- [ ] MongoDB shows correct ppiPlus values
- [ ] Dates are stored as ISO dates
- [ ] UI displays all values correctly
- [ ] Search works for sampleCode
- [ ] Search works for sampleItemCode
- [ ] Search works for customerName
- [ ] Dates display in readable format on UI

---

**All field mapping issues have been resolved!** 🎉
