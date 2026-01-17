# 📊 Database Setup & Seed Data Documentation

## Overview

This document explains the database setup for the fabric sample data system, including multiple sample types and seed data generation.

---

## 🗂️ Sample Types Supported

### 1. **Regular Sample** (regularSample)
Represents standard fabric finishing without special treatments.

**Collection:** `RegularSample`  
**Model:** `models/regularSample.js`  
**Seed Script:** `scripts/seedRegularSamples.js`  
**Fields:** 33 (Basic info, production details, measurements, shrinkage)

**Example Data:**
- RSF-2025-001 (Navy Blue, Plain Weave)
- RSF-2025-002 (White, Twill Weave)
- RSF-2025-003 (Light Gray, Oxford Cloth)
- RSF-2025-004 (Red, Poplin)
- RSF-2025-005 (Black, Satin Weave)

---

### 2. **Heat Setting Sample** (heatSettingSample)
Represents heat-set polyester fabrics with special temperature and pressure settings.

**Collection:** `HeatSettingSample`  
**Model:** `models/heatSettingSample.js`  
**Seed Script:** `scripts/seedHeatSettingSamples.js`  
**Fields:** 28 (Basic info + heat setting details + testing results)

**Key Fields:**
- `heatSettingTemperature` - Temperature range (e.g., 150°C)
- `heatSettingTime` - Duration (e.g., 5 minutes)
- `heatSettingPressure` - Pressure applied (e.g., 2.5 bar)
- `stabilityPercentage` - Dimensional stability (e.g., 98%)
- `wrinkleRecovery` - Grade 3-5
- `qualityGrade` - A, B, C

**Example Data:**
- HSF-2025-001 (Navy Blue, 150°C, 5min)
- HSF-2025-002 (White, 140°C, 4min)
- HSF-2025-003 (Light Gray, 160°C, 6min)
- HSF-2025-004 (Black, 130°C, 3min)

---

### 3. **Padding Sample** (paddingSample)
Represents dyed fabric samples with color padding and fastness testing.

**Collection:** `PaddingSample`  
**Model:** `models/paddingSample.js`  
**Seed Script:** `scripts/seedPaddingSamples.js`  
**Fields:** 33 (Basic info + padding details + color testing)

**Key Fields:**
- `paddingChemical` - Dye type (Reactive, Vat, Direct)
- `paddingConcentration` - % concentration (e.g., 3%)
- `paddingTemperature` - Temperature (e.g., 90°C)
- `paddingTime` - Duration (e.g., 1 minute)
- `colorFastness` - Wash, light, rubbing fastness ratings
- `washFastness`, `lightFastness`, `rubbingFastness` - Grade 3-5

**Example Data:**
- PSF-2025-001 (Royal Blue, Reactive Dye, 3%)
- PSF-2025-002 (Deep Red, Vat Dye, 2.5%)
- PSF-2025-003 (Golden Yellow, Direct Dye, 4%)
- PSF-2025-004 (Emerald Green, Reactive Dye, 2.8%)

---

### 4. **Expandable Structure**
The system is designed to easily support additional sample types in the future:
- Bleached Samples
- Mercerized Samples
- Specialized Coatings
- Multi-layer Composites
- Custom Processing Types

---

## 🚀 Database Seeding

### Quick Start

#### Seed All Sample Data
```bash
npm run seed
```

This command runs all seed scripts in sequence:
1. Regular Samples (5 documents)
2. Heat Setting Samples (4 documents)
3. Padding Samples (4 documents)

**Total:** 13 sample documents

#### Seed Individual Sample Types

```bash
# Seed only Regular Samples
npm run seed:regular

# Seed only Heat Setting Samples
npm run seed:heat

# Seed only Padding Samples
npm run seed:padding
```

---

## 📁 Seed Files Structure

```
scripts/
├── seedRegularSamples.js         (Seed regular samples)
├── seedHeatSettingSamples.js     (Seed heat setting samples)
├── seedPaddingSamples.js         (Seed padding samples)
└── seedAll.js                    (Master seed - runs all)

models/
├── regularSample.js              (Regular sample schema)
├── heatSettingSample.js          (Heat setting sample schema)
├── paddingSample.js              (Padding sample schema)
└── user.js                       (Existing user model)
```

---

## 🔍 Sample Data Details

### Regular Sample Data (5 samples)

| Code | Color | Construction | Customer | Width | Temperature |
|------|-------|---------------|----------|-------|-------------|
| RSF-2025-001 | Navy Blue | Plain | ABC Textiles | 62~63'' | N/A |
| RSF-2025-002 | White | Twill | XYZ Corp | 60~62'' | N/A |
| RSF-2025-003 | Light Gray | Oxford | Premium Fabrics | 58~60'' | N/A |
| RSF-2025-004 | Red | Poplin | Fashion Textiles | 63~65'' | N/A |
| RSF-2025-005 | Black | Satin | Elite Fabrics | 61~62'' | N/A |

### Heat Setting Sample Data (4 samples)

| Code | Color | Construction | Temp | Time | Pressure |
|------|-------|---------------|------|------|----------|
| HSF-2025-001 | Navy | Poly Blend | 150°C | 5min | 2.5 bar |
| HSF-2025-002 | White | Poly Cotton | 140°C | 4min | 2.0 bar |
| HSF-2025-003 | Gray | Polyester | 160°C | 6min | 3.0 bar |
| HSF-2025-004 | Black | Microfiber | 130°C | 3min | 1.8 bar |

### Padding Sample Data (4 samples)

| Code | Color | Dye Type | Concentration | Temp | Quality |
|------|-------|----------|----------------|------|---------|
| PSF-2025-001 | Royal Blue | Reactive | 3% | 90°C | A |
| PSF-2025-002 | Deep Red | Vat | 2.5% | 85°C | A+ |
| PSF-2025-003 | Golden Yellow | Direct | 4% | 95°C | A |
| PSF-2025-004 | Emerald Green | Reactive | 2.8% | 88°C | A+ |

---

## 📊 Database Collections

After seeding, MongoDB will have the following collections:

### Collection: RegularSample
```javascript
{
  _id: ObjectId,
  sampleCode: "RSF-2025-001",  // Unique
  sampleItemCode: "ITEM-001",
  processingType: "Regular Finish",
  construction: "Plain Weave",
  color: "Navy Blue",
  customerName: "ABC Textiles",
  // ... 26 more fields
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: HeatSettingSample
```javascript
{
  _id: ObjectId,
  sampleCode: "HSF-2025-001",  // Unique
  sampleItemCode: "ITEM-HS-001",
  processingType: "Heat Setting",
  heatSettingTemperature: "150°C",
  heatSettingTime: "5 minutes",
  heatSettingPressure: "2.5 bar",
  stabilityPercentage: "98%",
  // ... 20 more fields
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: PaddingSample
```javascript
{
  _id: ObjectId,
  sampleCode: "PSF-2025-001",  // Unique
  sampleItemCode: "ITEM-PS-001",
  processingType: "Padding",
  paddingChemical: "Reactive Dye",
  paddingConcentration: "3%",
  paddingTemperature: "90°C",
  colorFastness: "Grade 4-5",
  // ... 25 more fields
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 Seed Script Details

### seedRegularSamples.js
- **Purpose:** Seed regular fabric sample data
- **Documents Created:** 5
- **Output:**
  ```
  ✅ Successfully seeded 5 regular samples
     - RSF-2025-001 (Navy Blue)
     - RSF-2025-002 (White)
     - RSF-2025-003 (Light Gray)
     - RSF-2025-004 (Red)
     - RSF-2025-005 (Black)
  ```

### seedHeatSettingSamples.js
- **Purpose:** Seed heat setting fabric sample data
- **Documents Created:** 4
- **Output:**
  ```
  ✅ Successfully seeded 4 heat setting samples
     - HSF-2025-001 (Navy Blue) @ 150°C
     - HSF-2025-002 (White) @ 140°C
     - HSF-2025-003 (Light Gray) @ 160°C
     - HSF-2025-004 (Black) @ 130°C
  ```

### seedPaddingSamples.js
- **Purpose:** Seed padding fabric sample data
- **Documents Created:** 4
- **Output:**
  ```
  ✅ Successfully seeded 4 padding samples
     - PSF-2025-001 (Royal Blue) - Reactive Dye
     - PSF-2025-002 (Deep Red) - Vat Dye
     - PSF-2025-003 (Golden Yellow) - Direct Dye
     - PSF-2025-004 (Emerald Green) - Reactive Dye
  ```

### seedAll.js
- **Purpose:** Master seed script that runs all seeds in sequence
- **Documents Created:** 13 total
- **Process:**
  1. Runs seedRegularSamples.js
  2. Runs seedHeatSettingSamples.js
  3. Runs seedPaddingSamples.js
  4. Reports completion

---

## 📋 Usage Instructions

### Step 1: Ensure MongoDB Connection
Make sure your `.env` file is configured:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB=fabric_data
```

### Step 2: Run Seeds
```bash
# Seed all data at once
npm run seed

# Or seed individual types
npm run seed:regular
npm run seed:heat
npm run seed:padding
```

### Step 3: Verify in MongoDB
```bash
# Connect to MongoDB and check collections
db.RegularSample.count()           # Should be 5
db.HeatSettingSample.count()       # Should be 4
db.PaddingSample.count()           # Should be 4
```

### Step 4: Use in API
After seeding, test the API:
```bash
# Start the server
npm run dev

# Query regular samples
curl http://localhost:3000/api/SamplesData/regular

# Get specific sample
curl http://localhost:3000/api/SamplesData/regular?code=RSF-2025-001

# Filter by customer
curl "http://localhost:3000/api/SamplesData/regular?customer=ABC"
```

---

## 🔄 Seed Idempotency

All seed scripts check if data already exists before inserting:

```javascript
const count = await collection.countDocuments({})
if (count > 0) {
  console.log(`Collection already has ${count} documents`)
  console.log('Skipping seed to avoid duplicates')
  process.exit(0)
}
```

**Benefits:**
- ✅ Safe to run multiple times
- ✅ Won't create duplicate data
- ✅ Prevents accidental data loss

---

## 📈 Expanding Sample Types

To add a new sample type (e.g., Bleached Sample):

### 1. Create Model
```bash
# Create models/bleachedSample.js with schema
```

### 2. Create Seed Data
```bash
# Create scripts/seedBleachedSamples.js
```

### 3. Update package.json
```json
{
  "scripts": {
    "seed": "node scripts/seedAll.js",
    "seed:bleached": "node scripts/seedBleachedSamples.js"
  }
}
```

### 4. Update seedAll.js
Add to seeds array:
```javascript
{ file: 'seedBleachedSamples.js', name: 'Bleached Samples' }
```

---

## 🐛 Troubleshooting

### Issue: "MONGODB_URI is not set"
**Solution:** Set environment variable in `.env`:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/
```

### Issue: "E11000 duplicate key error"
**Solution:** Collection already has data. 
```bash
# Delete and reseed:
# In MongoDB console: db.RegularSample.deleteMany({})
# Then run: npm run seed
```

### Issue: "Connection timeout"
**Solution:** Check MongoDB connection string and network access.

---

## 📊 Sample Count Summary

| Sample Type | Count | Model | Collection |
|-------------|-------|-------|-----------|
| Regular | 5 | regularSample.js | RegularSample |
| Heat Setting | 4 | heatSettingSample.js | HeatSettingSample |
| Padding | 4 | paddingSample.js | PaddingSample |
| **TOTAL** | **13** | **3 models** | **3 collections** |

---

## 🎯 Next Steps

1. ✅ Run seed: `npm run seed`
2. ✅ Start server: `npm run dev`
3. ✅ Test API: `curl http://localhost:3000/api/SamplesData/regular`
4. ✅ View data in MongoDB Atlas
5. ✅ Integrate with frontend

---

## 📖 Related Documentation

- [Regular Sample API](app/api/SamplesData/regular/README.md)
- [API Testing Guide](REGULAR_SAMPLE_API_TESTING.md)
- [Architecture Guide](REGULAR_SAMPLE_ARCHITECTURE.md)

