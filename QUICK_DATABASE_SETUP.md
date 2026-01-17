# 🚀 Quick Database Setup Guide

## ⚡ 30-Second Setup

### 1. Seed All Data
```bash
npm run seed
```

### 2. Start Server
```bash
npm run dev
```

### 3. Verify Data
```bash
curl http://localhost:3000/api/SamplesData/regular
```

**Done!** ✅

---

## 📊 What Gets Created

After running `npm run seed`, your MongoDB will have:

### RegularSample Collection (5 documents)
```javascript
RSF-2025-001  // Navy Blue, Plain Weave
RSF-2025-002  // White, Twill Weave
RSF-2025-003  // Light Gray, Oxford Cloth
RSF-2025-004  // Red, Poplin
RSF-2025-005  // Black, Satin Weave
```

### HeatSettingSample Collection (4 documents)
```javascript
HSF-2025-001  // 150°C, 5min, 2.5bar
HSF-2025-002  // 140°C, 4min, 2.0bar
HSF-2025-003  // 160°C, 6min, 3.0bar
HSF-2025-004  // 130°C, 3min, 1.8bar
```

### PaddingSample Collection (4 documents)
```javascript
PSF-2025-001  // Reactive Dye, 3%, 90°C
PSF-2025-002  // Vat Dye, 2.5%, 85°C
PSF-2025-003  // Direct Dye, 4%, 95°C
PSF-2025-004  // Reactive Dye, 2.8%, 88°C
```

---

## 🎯 Common Commands

### Seed All Data
```bash
npm run seed
```

### Seed Individual Types
```bash
npm run seed:regular      # Only regular samples
npm run seed:heat         # Only heat setting samples
npm run seed:padding      # Only padding samples
```

### Start Development Server
```bash
npm run dev
```

### Test the API
```bash
# Get all samples
curl http://localhost:3000/api/SamplesData/regular

# Get by sample code
curl "http://localhost:3000/api/SamplesData/regular?code=RSF-2025-001"

# Get by customer
curl "http://localhost:3000/api/SamplesData/regular?customer=ABC"

# With pagination
curl "http://localhost:3000/api/SamplesData/regular?page=1&limit=5"
```

---

## 📁 Files Created

### Models (3 new files)
```
models/
├── regularSample.js         ← 33 fields
├── heatSettingSample.js     ← 28 fields
└── paddingSample.js         ← 33 fields
```

### Seed Scripts (4 new files)
```
scripts/
├── seedRegularSamples.js
├── seedHeatSettingSamples.js
├── seedPaddingSamples.js
└── seedAll.js              ← Runs all seeds
```

### Documentation (1 new file)
```
DATABASE_SETUP.md           ← This guide
```

---

## ✅ Requirements

- ✅ Node.js installed
- ✅ MongoDB URI in `.env` file
- ✅ MongoDB database created

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB=fabric_data
```

---

## 🔄 Sample Type Hierarchy

```
Sample Types
├── Regular Sample (5)
│   └── Standard fabric finishing
├── Heat Setting Sample (4)
│   └── Polyester with temperature settings
└── Padding Sample (4)
    └── Dyed fabrics with color fastness
```

**Expandable to future types:**
- Bleached Samples
- Mercerized Samples
- Special Coatings
- Multi-layer Composites

---

## 📊 Data Summary

| Type | Count | Status |
|------|-------|--------|
| Regular | 5 | ✅ Ready |
| Heat Setting | 4 | ✅ Ready |
| Padding | 4 | ✅ Ready |
| **TOTAL** | **13** | **✅ Ready** |

---

## 🎨 Sample Data Preview

### Regular Sample (RSF-2025-001)
```json
{
  "sampleCode": "RSF-2025-001",
  "sampleItemCode": "ITEM-001",
  "processingType": "Regular Finish",
  "construction": "Plain Weave",
  "color": "Navy Blue",
  "customerName": "ABC Textiles",
  "customerRequiredWidth": "62~63''",
  "weightBW": "10.00 oz",
  "weavingPPI": 108,
  "afterWashPPI": 112,
  "qualityGrade": "A"
}
```

### Heat Setting Sample (HSF-2025-001)
```json
{
  "sampleCode": "HSF-2025-001",
  "sampleItemCode": "ITEM-HS-001",
  "processingType": "Heat Setting",
  "construction": "Polyester Blend",
  "color": "Navy Blue",
  "customerName": "TechFabrics Ltd",
  "heatSettingTemperature": "150°C",
  "heatSettingTime": "5 minutes",
  "heatSettingPressure": "2.5 bar",
  "stabilityPercentage": "98%",
  "qualityGrade": "A"
}
```

### Padding Sample (PSF-2025-001)
```json
{
  "sampleCode": "PSF-2025-001",
  "sampleItemCode": "ITEM-PS-001",
  "processingType": "Padding",
  "construction": "Cotton",
  "color": "Royal Blue",
  "customerName": "ColorTech Fabrics",
  "paddingChemical": "Reactive Dye",
  "paddingConcentration": "3%",
  "paddingTemperature": "90°C",
  "colorFastness": "Grade 4-5",
  "qualityGrade": "A"
}
```

---

## 🚦 Workflow

```
1. Configure .env
   └─ Set MONGODB_URI

2. Run Seed
   └─ npm run seed

3. Start Server
   └─ npm run dev

4. Test API
   └─ curl http://localhost:3000/api/SamplesData/regular

5. Check MongoDB
   └─ 13 documents total across 3 collections
```

---

## 💡 Tips

- **Safe to Run Multiple Times:** Seed scripts check for existing data
- **No Data Loss:** Only inserts if collection is empty
- **Easy to Expand:** Add new sample types by creating model + seed
- **Scalable:** Works with multiple MongoDB instances

---

## 🆘 Help

### MongoDB Connection Issues
```bash
# Check connection string in .env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/

# Verify in MongoDB Atlas
# Network Access → Add IP Address
```

### Seed Failed
```bash
# Check if collection exists
# If yes: delete and try again
# If no: check MongoDB connection

# Try individual seed
npm run seed:regular
```

### No Data Showing
```bash
# Verify seed ran successfully
npm run seed

# Check MongoDB collection
# Collections: RegularSample, HeatSettingSample, PaddingSample
```

---

## 📚 Full Documentation

- **Detailed Setup:** [DATABASE_SETUP.md](DATABASE_SETUP.md)
- **API Reference:** [README.md](app/api/SamplesData/regular/README.md)
- **API Testing:** [REGULAR_SAMPLE_API_TESTING.md](REGULAR_SAMPLE_API_TESTING.md)
- **Architecture:** [REGULAR_SAMPLE_ARCHITECTURE.md](REGULAR_SAMPLE_ARCHITECTURE.md)

---

## ✨ Summary

**You have:**
- ✅ 3 data models (Regular, Heat Setting, Padding)
- ✅ 4 seed scripts (3 individual + 1 master)
- ✅ 13 sample documents ready to use
- ✅ Expandable architecture for future types

**Ready to:**
- ✅ Run `npm run seed`
- ✅ Start `npm run dev`
- ✅ Test API with curl or Postman
- ✅ Integrate with frontend

