# Heat Setting Sample Field Mapping Reference

## Quick Reference Table

| # | CSV Column Name | Database Field | Type | Required | Notes |
|---|---|---|---|---|---|
| 1 | sampleCode | sampleCode | String | ✅ YES | Unique identifier - Must be unique per record |
| 2 | sampleItemName | sampleItemCode | String | ✓ | Item code alternative name |
| 3 | constructionNo | construction | String | ✓ | Fabric construction pattern |
| 4 | color | color | String | ✓ | Sample color |
| 5 | customerName | customerName | String | ✓ | Customer/buyer name |
| 6 | customerRequiredWidth | customerRequiredWidth | String | ✓ | Width specification |
| 7 | customerRequiredWidth% | customerRequirementWidthPercent | String | ✓ | Width tolerance percentage |
| 8 | customerRequiredLength% | customerRequirementLengthPercent | String | ✓ | Length tolerance percentage |
| 9 | customerRequiredWeight | weightBW | String | ✓ | Weight B/W (Between) |
| 10 | loomNo | loomNo | Number | ✓ | Loom machine number |
| 11 | warppingNo | warpingNo | Number | ✓ | Warping beam number |
| 12 | yard | yard | String | ✓ | Yard identification |
| 13 | **beforeHeatSettingWidth** | **beforeHSWidth** | String | ✓ | **🔥 HS Only** - Width before heat setting |
| 14 | **afterHeatSettingWidth** | **afterHSWidth** | String | ✓ | **🔥 HS Only** - Width after heat setting |
| 15 | afterDryerWidth | afterDryerWidthInch | String | ✓ | Dryer width measurement (inches) |
| 16 | weavingPPI | weavingPPI | Number | ✓ | PPI (Picks Per Inch) during weaving |
| 17 | afterDryerSkew | dryerSkewCM | String | ✓ | Skew measurement after dryer (CM) |
| 18 | sampleIssueDate | sampleIssueDate | Date | ✓ | Date when sample was issued (dd/mm/yyyy) |
| 19 | finishingDate | finishingDate | Date | ✓ | Date when finishing was completed (dd/mm/yyyy) |
| 20 | afterShrinkageSkew | afterShrinkageSkewCM | String | ✓ | Skew after shrinkage (CM) |
| 21 | afterShrinkagePPI | afterShrinkagePPI | Number | ✓ | PPI after shrinkage process |
| 22 | afterShrinkagePPI+ | ppiPlus | Number | ✓ | Additional PPI increment |
| 23 | afterWashSkew | afterWashSkewCM | String | ✓ | Skew after washing (CM) |
| 24 | afterShrinkageWidth | afterShrinkageWidthInch | String | ✓ | Width after shrinkage (inches) |
| 25 | boxPercentRightHand | boxPercentRightHand | String | ✓ | Right hand box percentage |
| 26 | boxPercentLeftHand | boxPercentLeftHand | String | ✓ | Left hand box percentage |
| 27 | afterWashWidthPercent | afterWashWidthPercent | String | ✓ | Width percentage after washing |
| 28 | afterWashLengthPercent | afterWashLengthPercent | String | ✓ | Length percentage after washing |
| 29 | afterWashWidth | afterWashWidthInch | String | ✓ | Width after washing (inches) |
| 30 | afterWashPPI | afterWashPPI | String | ✓ | PPI after washing |
| 31 | **burnnerQnt** | **burnerQ** | String | ✓ | **🔥 HS Only** - Burner quantity/type |
| 32 | **m/cSpeed** | **machineSpeed** | String | ✓ | **🔥 HS Only** - Machine speed (m/min) |
| 33 | **machineWidthSetting** | **machineWidthSetting** | String | ✓ | **🔥 HS Only** - Machine width setting (inches) |
| 34 | **tempSetting** | **tempSetting** | String | ✓ | **🔥 HS Only** - Temperature setting (°C) |
| 35 | sampleProcessingDetails | sampleProcessingDetails | String | ✓ | Processing notes/details |

---

## Field Categories

### 🔵 Basic Information (6 fields)
```
1. sampleCode              → sampleCode
2. sampleItemName          → sampleItemCode
3. constructionNo          → construction
4. color                   → color
5. customerName            → customerName
6. (auto)                  → processingType = "Heat Setting"
```

### 📏 Customer Requirements (3 fields)
```
7. customerRequiredWidth     → customerRequiredWidth
8. customerRequiredWidth%    → customerRequirementWidthPercent
9. customerRequiredLength%   → customerRequirementLengthPercent
10. customerRequiredWeight   → weightBW
```

### 🎬 Production Information (3 fields)
```
11. loomNo       → loomNo
12. warppingNo   → warpingNo
13. yard         → yard
```

### 🌡️ Heat Setting Specific (4 fields) 🔥
```
14. beforeHeatSettingWidth   → beforeHSWidth
15. afterHeatSettingWidth    → afterHSWidth
16. burnnerQnt               → burnerQ
17. m/cSpeed                 → machineSpeed
18. machineWidthSetting      → machineWidthSetting
19. tempSetting              → tempSetting
```

### 📊 Measurement Data (16 fields)
```
20. weavingPPI               → weavingPPI
21. afterDryerWidth          → afterDryerWidthInch
22. afterDryerSkew           → dryerSkewCM
23. afterShrinkagePPI        → afterShrinkagePPI
24. afterShrinkagePPI+       → ppiPlus
25. afterShrinkageWidth      → afterShrinkageWidthInch
26. afterWashSkew            → afterWashSkewCM
27. afterWashWidth           → afterWashWidthInch
28. afterWashPPI             → afterWashPPI
29. boxPercentRightHand      → boxPercentRightHand
30. boxPercentLeftHand       → boxPercentLeftHand
31. afterWashWidthPercent    → afterWashWidthPercent
32. afterWashLengthPercent   → afterWashLengthPercent
```

### 📅 Dates (2 fields)
```
33. sampleIssueDate    → sampleIssueDate    (dd/mm/yyyy format)
34. finishingDate      → finishingDate      (dd/mm/yyyy format)
```

### 📝 Notes (1 field)
```
35. sampleProcessingDetails → sampleProcessingDetails
```

---

## Field Types & Constraints

### String Fields
- `sampleCode`, `sampleItemCode`, `construction`, `color`, `customerName`
- `customerRequiredWidth`, `customerRequirementWidthPercent`, `customerRequirementLengthPercent`, `weightBW`
- `yard`, `afterDryerWidthInch`, `dryerSkewCM`, `afterShrinkageSkewCM`, `afterShrinkageWidthInch`
- `afterWashSkewCM`, `afterWashWidthPercent`, `afterWashLengthPercent`, `afterWashWidthInch`, `afterWashPPI`
- `boxPercentRightHand`, `boxPercentLeftHand`, `burnerQ`, `machineSpeed`, `machineWidthSetting`, `tempSetting`
- `sampleProcessingDetails`

### Number Fields
- `loomNo` - Integer
- `warpingNo` - Integer
- `weavingPPI` - Integer
- `afterShrinkagePPI` - Integer
- `ppiPlus` - Integer

**Parsing**: Non-numeric characters are stripped, then parsed as integer

### Date Fields
- `sampleIssueDate`
- `finishingDate`

**Accepted Formats**:
- `dd/mm/yyyy` (e.g., 25/12/2023)
- `dd-mm-yyyy` (e.g., 25-12-2023)

**Stored As**: ISO 8601 UTC format in MongoDB

---

## Critical Fields (Must Not Be Null)

| Field | Why | Impact |
|---|---|---|
| **sampleCode** | Used as unique identifier for searches | Without it, record won't be inserted |
| **beforeHSWidth** | Heat setting specific measurement | Without it, heat setting purpose is unclear |
| **afterHSWidth** | Shows effectiveness of heat setting | Core metric for heat setting process |
| **tempSetting** | Critical for heat setting process | Reproducibility depends on this |
| **machineSpeed** | Affects heat setting quality | Speed-temperature combination matters |

---

## Field Name Mismatch Summary

The following CSV column names differ from database field names:

| CSV Name | Database Name | Reason | Fix Method |
|---|---|---|---|
| sampleItemName | sampleItemCode | Code/Name distinction | Auto-mapped |
| constructionNo | construction | Removed "No" suffix | Auto-mapped |
| customerRequiredWidth% | customerRequirementWidthPercent | Clarity on "Requirement" | Auto-mapped |
| customerRequiredLength% | customerRequirementLengthPercent | Clarity on "Requirement" | Auto-mapped |
| customerRequiredWeight | weightBW | Changed to "Weight B/W" | Auto-mapped |
| beforeHeatSettingWidth | beforeHSWidth | Abbreviated for brevity | Auto-mapped |
| afterHeatSettingWidth | afterHSWidth | Abbreviated for brevity | Auto-mapped |
| afterDryerWidth | afterDryerWidthInch | Added measurement unit | Auto-mapped |
| afterDryerSkew | dryerSkewCM | Added measurement unit | Auto-mapped |
| afterShrinkagePPI+ | ppiPlus | Removed special character | Auto-mapped |
| afterWashSkew | afterWashSkewCM | Added measurement unit | Auto-mapped |
| afterShrinkageWidth | afterShrinkageWidthInch | Added measurement unit | Auto-mapped |
| afterWashWidth | afterWashWidthInch | Added measurement unit | Auto-mapped |
| burnnerQnt | burnerQ | Simplified name | Auto-mapped |
| m/cSpeed | machineSpeed | Expanded abbreviation | Auto-mapped |

**All mismatches are automatically handled by the upload handler - no manual correction needed!**

---

## Header Name Variations Supported

For extra flexibility, the system accepts multiple variations of each field:

### Example: Temperature Setting
```
✓ tempSetting
✓ temp setting
✓ temperature setting
✓ tempsetting
```

### Example: Machine Speed
```
✓ m/cSpeed
✓ machineSpeed
✓ machine speed
✓ m/c speed
✓ machinespeed
```

### Example: Box Percent Right
```
✓ boxPercentRightHand
✓ box percent right hand
✓ Box % (Right Hand)
✓ boxpercentrighthand
```

**The normalization process:**
1. Convert to lowercase
2. Remove special characters (%, /, -, etc.)
3. Remove spaces
4. Match against field variations

---

## MongoDB Document Example

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  
  // Basic Information
  sampleCode: "HS-2024-001",
  sampleItemCode: "HSI-2024-001",
  construction: "80x80",
  color: "Navy Blue",
  customerName: "Premium Fabrics Ltd",
  processingType: "Heat Setting",
  
  // Customer Requirements
  customerRequiredWidth: "150 cm",
  customerRequirementWidthPercent: "±2%",
  customerRequirementLengthPercent: "±3%",
  weightBW: "180-200 gsm",
  
  // Production Info
  loomNo: 5,
  warpingNo: 12,
  yard: "Yard A",
  
  // Heat Setting Specific
  beforeHSWidth: "155 cm",
  afterHSWidth: "150.2 cm",
  burnerQ: "Medium",
  machineSpeed: "120 m/min",
  machineWidthSetting: "155 cm",
  tempSetting: "185°C",
  
  // Measurements
  weavingPPI: 80,
  afterDryerWidthInch: "59.2",
  dryerSkewCM: "0.5",
  afterShrinkagePPI: 82,
  ppiPlus: 85,
  afterShrinkageWidthInch: "59.0",
  afterWashSkewCM: "0.2",
  afterWashWidth: "58.8",
  afterWashPPI: "81",
  boxPercentRightHand: "2.5%",
  boxPercentLeftHand: "2.3%",
  afterWashWidthPercent: "99.6%",
  afterWashLengthPercent: "98.5%",
  
  // Dates
  sampleIssueDate: ISODate("2024-01-15T00:00:00Z"),
  finishingDate: ISODate("2024-01-28T00:00:00Z"),
  
  // Notes
  sampleProcessingDetails: "Heat setting applied with controlled temperature and machine speed. Final width achieved within tolerance.",
  
  // Metadata
  createdAt: ISODate("2024-01-28T10:30:00Z"),
  updatedAt: ISODate("2024-01-28T10:30:00Z"),
  __v: 0
}
```

---

## Upload Handler Logic Flow

```
1. CSV File Received
   ↓
2. Read Headers
   ↓
3. Detect Sample Type (Heat Setting vs Regular)
   ↓
4. For Each Row:
   → Normalize header names
   → Extract value using flexible matching
   → Parse based on field type (String/Number/Date)
   → Add to records array
   ↓
5. Insert into Correct Collection:
   - Heat Setting → heatsettingsamples
   - Regular → regularsamples
   ↓
6. Return Results (success/error counts)
```

---

## Testing Checklist

After uploading, verify:

### 1. Basic Fields
- [ ] sampleCode displays correctly
- [ ] sampleItemCode shows data
- [ ] construction value visible
- [ ] color displays
- [ ] customerName appears

### 2. Heat Setting Fields (Critical)
- [ ] beforeHSWidth has data (not null/empty)
- [ ] afterHSWidth has data (not null/empty)
- [ ] machineSpeed shows value
- [ ] tempSetting displays temperature
- [ ] burnerQ shows burner info

### 3. Measurement Fields
- [ ] weavingPPI displays as number
- [ ] afterShrinkagePPI shows value
- [ ] Box percentages display (e.g., "2.5%")
- [ ] Width measurements in inches
- [ ] Skew measurements in CM

### 4. Date Fields
- [ ] sampleIssueDate formats correctly (visible date)
- [ ] finishingDate formats correctly (visible date)
- [ ] Dates are searchable

### 5. API Responses
- [ ] GET /api/SamplesData/heatSetting returns records
- [ ] Search by sampleCode returns correct record
- [ ] Search by customerName returns all matching records
- [ ] Pagination works (?page=1&limit=10)

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|---|---|---|
| Fields store as null | Column name mismatch | Verify column names or use variations |
| Dates show as null | Wrong format (not dd/mm/yyyy) | Reformat dates in CSV |
| Numbers show as null | Contains non-numeric chars | Remove special characters |
| Search returns empty | Data wasn't inserted | Check upload response for errors |
| Wrong sample type detected | Missing heat setting fields | Ensure CSV has beforeHeatSettingWidth, afterHeatSettingWidth, etc |
| Duplicate records | Same sampleCode uploaded twice | Clear database or use different codes |

---

**Version**: 2.0 Heat Setting Support
**Last Updated**: January 28, 2026
**Status**: ✅ Complete & Production Ready
