# 🚀 Multi-Sample Type Upload Guide

## Overview

Your system supports uploading **multiple types of samples** with **automatic detection**. Each CSV is uploaded separately, and the system automatically routes it to the correct collection.

---

## 📋 Sample Types Available

| Sample Type | Collection | Auto-Detect Fields | Status |
|---|---|---|---|
| **Regular** | `regularsamples` | No heat setting fields | ✅ Ready |
| **Heat Setting** | `heatsettingsamples` | beforeHSWidth, afterHSWidth, tempSetting, machineSpeed, etc. | ✅ Ready |
| **Padding** | `paddingsamples` | (Model ready, needs CSV) | 🟡 Ready for setup |
| **T-Version** | `tVersionsamples` | (Model ready, needs CSV) | 🟡 Ready for setup |
| **Mercerise** | `merceriseSamples` | (Model ready, needs CSV) | 🟡 Ready for setup |
| **Master Song** | `masterSongDevelopmentSamples` | (Model ready, needs CSV) | 🟡 Ready for setup |

---

## 🔄 How Auto-Detection Works

The upload handler automatically detects the sample type by checking the CSV headers:

```javascript
// Regular Sample → NO heat setting fields
CSV Headers: sampleCode, construction, color, ... → regularsamples collection

// Heat Setting Sample → HAS heat setting fields
CSV Headers: ..., beforeHeatSettingWidth, afterHeatSettingWidth, tempSetting, ... → heatsettingsamples collection

// Padding Sample (future) → HAS padding specific fields
CSV Headers: ..., paddingType, paddingThickness, ... → paddingsamples collection
```

---

## 📤 Upload Process

### Step 1: Prepare Your CSV Files

Keep them organized:
```
public/uploads/
├── regularSampleData.csv          (for regular samples)
├── heatSettingSampleData.csv      (for heat setting samples)
├── paddingSampleData.csv          (for padding samples - when ready)
├── tVersionSampleData.csv         (for t-version samples - when ready)
└── merceriseSampleData.csv        (for mercerise samples - when ready)
```

### Step 2: Upload Each Type Separately

```bash
# Upload Regular Samples
curl -X POST http://localhost:3000/api/upload-csv \
  -F "file=@public/uploads/regularSampleData.csv"

# Upload Heat Setting Samples
curl -X POST http://localhost:3000/api/upload-csv \
  -F "file=@public/uploads/heatSettingSampleData.csv"

# Upload Padding Samples (when ready)
curl -X POST http://localhost:3000/api/upload-csv \
  -F "file=@public/uploads/paddingSampleData.csv"

# And so on...
```

### Step 3: Check Response

```json
{
  "message": "CSV import completed",
  "sampleType": "heat-setting",        // ← System detected this
  "totalRowsParsed": 100,
  "recordsPrepared": 100,
  "insertedCount": 100
}
```

**Key indicators:**
- ✅ `"sampleType"` shows what was detected
- ✅ `"insertedCount"` shows how many records were added
- ✅ `"parseErrors"` shows any problems (if empty, all good)

---

## 🎯 Upload Timeline

### Today - Ready to Upload
```
✅ Regular Samples    - CSV in public/uploads/
✅ Heat Setting       - CSV in public/uploads/ (heatSettingSampleData.csv)
```

### Next - When You Prepare CSVs
```
🟡 Padding Samples    - CSV needed
🟡 T-Version Samples  - CSV needed
🟡 Mercerise Samples  - CSV needed
🟡 Master Song Dev    - CSV needed
```

**Note:** The models are already created. You just need to prepare the CSVs!

---

## 🔗 Access Your Data

After uploading, access each sample type via its dedicated page:

```
Regular Samples:
  → http://localhost:3000/fabrics/regular

Heat Setting Samples:
  → http://localhost:3000/fabrics/heat-setting

Padding Samples (coming soon):
  → http://localhost:3000/fabrics/padding

T-Version Samples (coming soon):
  → http://localhost:3000/fabrics/tversion

Mercerise Samples (coming soon):
  → http://localhost:3000/fabrics/mercerise

Master Song Dev Samples (coming soon):
  → http://localhost:3000/fabrics/master-song-development
```

---

## 📊 Database Collections After Upload

Each upload creates/populates a separate collection:

```javascript
// After uploading all sample types, you'll have:

MongoDB Database:
├── regularsamples              // ~5000+ records
├── heatsettingsamples          // ~600+ records
├── paddingsamples              // (when you upload padding CSV)
├── tVersionsamples             // (when you upload t-version CSV)
├── merceriseSamples            // (when you upload mercerise CSV)
└── masterSongDevelopmentSamples // (when you upload master song CSV)

users                           // (existing)
```

---

## 🔍 Query Each Collection via API

```bash
# Get all regular samples
curl http://localhost:3000/api/SamplesData/regular

# Get all heat setting samples
curl http://localhost:3000/api/SamplesData/heatSetting

# Get all padding samples (when populated)
curl http://localhost:3000/api/SamplesData/padding

# Search within a type
curl http://localhost:3000/api/SamplesData/heatSetting?sampleCode=HS-001

# Search in different type
curl http://localhost:3000/api/SamplesData/regular?customerName=Premium
```

---

## ✅ Benefits of This Approach

```
✅ Separate uploads for each type
✅ Auto-detection = no manual routing needed
✅ Independent collections = organized data
✅ Dedicated pages = focused UI per type
✅ Dedicated APIs = clean endpoints
✅ Flexible = add new types anytime
✅ Scalable = handle thousands of records
✅ No data mixing = clean, organized
```

---

## 🎯 Current CSV Files Ready

### Regular Samples
- **File**: `/public/uploads/regularSampledata.csv` (note: lowercase 'a')
- **Rows**: Multiple records
- **Status**: Ready to upload

### Heat Setting Samples
- **File**: `/public/uploads/heatSettingSampleData.csv`
- **Rows**: 642 records
- **Status**: Ready to upload
- **Format**: ✅ Correct (36 columns, all fields present)

---

## 🚀 Quick Start - Upload Both Now

```bash
# 1. Upload Regular Samples
curl -X POST http://localhost:3000/api/upload-csv \
  -F "file=@public/uploads/regularSampledata.csv"

# Wait for response, then:

# 2. Upload Heat Setting Samples
curl -X POST http://localhost:3000/api/upload-csv \
  -F "file=@public/uploads/heatSettingSampleData.csv"

# 3. Verify both uploaded successfully
curl http://localhost:3000/api/SamplesData/regular?limit=1
curl http://localhost:3000/api/SamplesData/heatSetting?limit=1

# 4. Test web interfaces
# Visit: http://localhost:3000/fabrics/regular
# Visit: http://localhost:3000/fabrics/heat-setting
```

---

## 📝 CSV Requirements

For each sample type, prepare CSV with:
1. ✅ Correct column names (or supported variations)
2. ✅ Unique sampleCode in first column
3. ✅ Dates in dd/mm/yyyy format
4. ✅ All required fields populated
5. ✅ No special formatting issues

**We'll handle:**
- ✅ Field mapping (CSV → Database)
- ✅ Type conversion (String/Number/Date)
- ✅ Error tracking
- ✅ Batch insert

---

## 🎓 Example Upload Workflow

```
Day 1:
  1. Upload regularSampleData.csv
  2. Verify in database
  3. Test search page
  
Day 2:
  1. Upload heatSettingSampleData.csv
  2. Verify in database
  3. Test search page
  
Day 3+:
  1. Prepare other sample type CSVs
  2. Upload when ready
  3. Repeat process
```

---

## 🔒 Data Safety

Each upload:
- ✅ Validates all rows before inserting
- ✅ Tracks errors per row
- ✅ Allows partial success
- ✅ Never overwrites existing data (unless duplicate key)
- ✅ Cleans up uploaded file after processing
- ✅ Returns detailed response with counts

---

## ❓ FAQ

### Q: Can I upload the same CSV twice?
**A**: Yes, but it will create duplicates unless sampleCode is unique. Use update endpoint to modify existing records.

### Q: What if upload fails?
**A**: Check response for `parseErrors` array. Each error shows rowNumber and reason. Fix those rows and try again.

### Q: Can I upload in any order?
**A**: Yes! Order doesn't matter. Each type auto-detects and routes correctly.

### Q: Can I have both regular and heat setting in one CSV?
**A**: Not recommended. Keep them separate. If mixed, only one type will be detected and processed.

### Q: What about data update/delete?
**A**: Use API endpoints (PUT/PATCH/DELETE). Later, build control panel UI for easier updates.

---

## 🎯 Next Steps

1. **Today**: Upload both CSV files (regular + heat setting)
2. **Verify**: Check both pages load with data
3. **Test**: Search functionality on both
4. **Mobile**: Test on mobile/tablet/desktop
5. **Prepare**: Other sample types CSVs when ready

---

## 📞 Need Help?

- Upload issues? → See [HEAT_SETTING_CSV_SETUP.md](HEAT_SETTING_CSV_SETUP.md)
- Field questions? → See [HEAT_SETTING_FIELD_MAPPING.md](HEAT_SETTING_FIELD_MAPPING.md)
- Technical details? → See [HEAT_SETTING_IMPLEMENTATION_COMPLETE.md](HEAT_SETTING_IMPLEMENTATION_COMPLETE.md)
- System overview? → See [HEAT_SETTING_INDEX.md](HEAT_SETTING_INDEX.md)

---

**Status**: ✅ Ready to Upload
**CSVs Available**: Regular + Heat Setting
**Auto-Detection**: ✅ Working
**System**: ✅ Production Ready

**Start uploading today!** 🚀
