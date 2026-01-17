# 🏢 MongoDB Database Structure - YogotextBD_Denim

## 📊 Overview

Your MongoDB instance now has a **hierarchical structure** with one main database containing **5 separate collections** for different types of fabric sample data.

```
YogotextBD_Denim (Database)
│
├── RegularSampleData (Collection)
│   ├── 33 fields per document
│   ├── 5 sample documents (RSF-2025-001 to RSF-2025-005)
│   └── Standard fabric finishing samples
│
├── HeatSettingSampleData (Collection)
│   ├── 28 fields per document
│   ├── 4 sample documents (HSF-2025-001 to HSF-2025-004)
│   └── Polyester with heat setting parameters
│
├── PaddingSampleData (Collection)
│   ├── 33 fields per document
│   ├── 4 sample documents (PSF-2025-001 to PSF-2025-004)
│   └── Dyed fabrics with color testing
│
├── TVersionSampleData (Collection)
│   ├── 24 fields per document
│   ├── 4 sample documents (TVS-2025-001 to TVS-2025-004)
│   └── Modified versions with design variations
│
└── MasterSongDevelopmentSampleData (Collection)
    ├── 38 fields per document
    ├── 4 sample documents (MSD-2025-001 to MSD-2025-004)
    └── New design development and pattern creation
```

---

## 🗄️ Collection Details

### 1️⃣ RegularSampleData

**Purpose:** Standard fabric samples with regular finishing processes

**Sample Count:** 5 documents  
**Codes:** RSF-2025-001 to RSF-2025-005

**Key Fields:**
```javascript
{
  sampleCode: "RSF-2025-001",
  construction: "Plain Weave",
  color: "Navy Blue",
  customerName: "ABC Textiles",
  customerRequiredWidth: "62~63''",
  weightBW: "10.00 oz",
  weavingPPI: 108,
  afterWashPPI: 112,
  qualityGrade: "A"
}
```

**Sample Data:**
| Code | Color | Construction | Customer | Quality |
|------|-------|--------------|----------|---------|
| RSF-2025-001 | Navy Blue | Plain Weave | ABC Textiles | A |
| RSF-2025-002 | White | Twill Weave | DEF Textiles | A |
| RSF-2025-003 | Light Gray | Oxford Cloth | GHI Textiles | A |
| RSF-2025-004 | Red | Poplin | JKL Textiles | A |
| RSF-2025-005 | Black | Satin Weave | MNO Textiles | A |

---

### 2️⃣ HeatSettingSampleData

**Purpose:** Heat-set polyester fabrics with temperature and pressure testing

**Sample Count:** 4 documents  
**Codes:** HSF-2025-001 to HSF-2025-004

**Key Fields:**
```javascript
{
  sampleCode: "HSF-2025-001",
  processingType: "Heat Setting",
  construction: "Polyester Blend",
  heatSettingTemperature: "150°C",
  heatSettingTime: "5 minutes",
  heatSettingPressure: "2.5 bar",
  stabilityPercentage: "98%",
  wrinkleRecovery: "Grade 4",
  qualityGrade: "A"
}
```

**Sample Data:**
| Code | Temperature | Time | Pressure | Stability | Status |
|------|-------------|------|----------|-----------|--------|
| HSF-2025-001 | 150°C | 5 min | 2.5 bar | 98% | Ready |
| HSF-2025-002 | 140°C | 4 min | 2.0 bar | 97% | Ready |
| HSF-2025-003 | 160°C | 6 min | 3.0 bar | 99% | Ready |
| HSF-2025-004 | 130°C | 3 min | 1.8 bar | 96% | Ready |

---

### 3️⃣ PaddingSampleData

**Purpose:** Dyed fabric samples with color fastness and quality testing

**Sample Count:** 4 documents  
**Codes:** PSF-2025-001 to PSF-2025-004

**Key Fields:**
```javascript
{
  sampleCode: "PSF-2025-001",
  processingType: "Padding",
  construction: "Cotton",
  color: "Royal Blue",
  paddingChemical: "Reactive Dye",
  paddingConcentration: "3%",
  paddingTemperature: "90°C",
  colorFastness: "Grade 4-5",
  washFastness: "4",
  lightFastness: "5",
  rubbingFastness: "4",
  qualityGrade: "A"
}
```

**Sample Data:**
| Code | Color | Dye Type | Concentration | Wash Fastness | Status |
|------|-------|----------|----------------|---------------|--------|
| PSF-2025-001 | Royal Blue | Reactive | 3% | 4 | Ready |
| PSF-2025-002 | Deep Red | Vat | 2.5% | 5 | Ready |
| PSF-2025-003 | Golden Yellow | Direct | 4% | 3 | Ready |
| PSF-2025-004 | Emerald Green | Reactive | 2.8% | 4 | Ready |

---

### 4️⃣ TVersionSampleData

**Purpose:** Modified versions of base samples with design variations and improvements

**Sample Count:** 4 documents  
**Codes:** TVS-2025-001 to TVS-2025-004

**Key Fields:**
```javascript
{
  sampleCode: "TVS-2025-001",
  processingType: "T-Version",
  construction: "Plain Weave",
  color: "Navy Blue",
  tVersionDesignation: "T-1",
  baseVersion: "RSF-2025-001",
  modificationDescription: "Increased thread count for better durability",
  tensileStrength: "450 N/5cm",
  tearStrength: "25 N",
  elongationPercentage: "12%",
  approvalStatus: "Under Review"
}
```

**Sample Data:**
| Code | Base | T-Version | Modification | Approval Status |
|------|------|-----------|--------------|-----------------|
| TVS-2025-001 | RSF-2025-001 | T-1 | Better durability | Under Review |
| TVS-2025-002 | RSF-2025-002 | T-2 | Enhanced breathability | Approved |
| TVS-2025-003 | RSF-2025-003 | T-3 | Softness enhancement | Pending |
| TVS-2025-004 | RSF-2025-004 | T-4 | Elasticity improvement | Approved |

---

### 5️⃣ MasterSongDevelopmentSampleData

**Purpose:** New design development, pattern creation, and prototype testing

**Sample Count:** 4 documents  
**Codes:** MSD-2025-001 to MSD-2025-004

**Key Fields:**
```javascript
{
  sampleCode: "MSD-2025-001",
  processingType: "Master Song Development",
  designName: "Ocean Wave Pattern",
  designCode: "OWP-2025-001",
  designPhase: "Testing",
  warpCount: "2000",
  weftCount: "1800",
  patternRepeatWidth: "15 inches",
  patternRepeatHeight: "20 inches",
  designedBy: "Sarah Johnson",
  approvalStatus: "Under Review"
}
```

**Sample Data:**
| Code | Design | Phase | Feasibility | Status |
|------|--------|-------|-------------|--------|
| MSD-2025-001 | Ocean Wave Pattern | Testing | High | Under Review |
| MSD-2025-002 | Leaf Texture Design | Development | High | Under Review |
| MSD-2025-003 | Golden Shimmer | Final | Medium | Production Ready |
| MSD-2025-004 | Geometric Art | Conceptual | High | Pending |

---

## 📈 Summary Statistics

### Total Data
```
Total Collections:     5
Total Documents:      21
  ├── Regular:        5 (23.8%)
  ├── Heat Setting:   4 (19.0%)
  ├── Padding:        4 (19.0%)
  ├── T-Version:      4 (19.0%)
  └── Master Dev:     4 (19.0%)

Total Fields Used:    ~150+ across all schemas
```

### Database Distribution
```
Database Name:        YogotextBD_Denim
Location:            MongoDB Atlas (Azure)
Collections:         5 active
Documents:           21 total
```

---

## 🌱 Seeding Strategy

### Automatic Seeding
All collections are seeded automatically with sample data:

```bash
# Seed all collections
npm run seed

# Seed specific collection
npm run seed:regular       # Regular Samples
npm run seed:heat          # Heat Setting Samples
npm run seed:padding       # Padding Samples
npm run seed:tversion      # T-Version Samples
npm run seed:masterdev     # Master Song Development Samples
```

### Seeding Process
1. **seedAll.js** orchestrates the process
2. Each seed script runs **sequentially**
3. Idempotent checks prevent duplicate inserts
4. Proper error handling and logging provided

### Seed Execution Order
```
1. seedRegularSamples.js
   ↓
2. seedHeatSettingSamples.js
   ↓
3. seedPaddingSamples.js
   ↓
4. seedTVersionSamples.js
   ↓
5. seedMasterSongDevelopmentSamples.js
   ↓
✅ All collections seeded successfully
```

---

## 🔗 Collection Relationships

### Data Dependencies
```
RegularSampleData (Base)
│
├─→ TVersionSampleData (References RSF samples)
│   └─ "baseVersion" field links to RegularSample
│
└─→ HeatSettingSampleData (Independent)
    └─ Similar structure but different processing

PaddingSampleData (Independent)
└─ Separate processing type

MasterSongDevelopmentSampleData (Independent)
└─ Design-focused, not tied to existing samples
```

### Cross-Collection Queries
To find T-Version samples based on a Regular Sample:
```javascript
// Find T-Version that modifies RSF-2025-001
db.TVersionSampleData.findOne({ baseVersion: "RSF-2025-001" })
```

---

## 📋 Field Mapping

### Common Fields (Across All Collections)
```javascript
{
  sampleCode: String,              // Unique identifier
  sampleItemCode: String,          // Internal code
  processingType: String,          // Type identifier
  construction: String,            // Weave type
  color: String,                   // Fabric color
  customerName: String,            // Customer
  qualityGrade: String,            // A, A+, B, C
  createdAt: Date,                 // Timestamp
  updatedAt: Date                  // Timestamp
}
```

### Type-Specific Fields
```javascript
// RegularSampleData
{ weavingPPI, afterWashPPI, customerRequiredWidth, weightBW }

// HeatSettingSampleData
{ heatSettingTemperature, heatSettingTime, heatSettingPressure, stabilityPercentage }

// PaddingSampleData
{ paddingChemical, paddingConcentration, colorFastness, washFastness }

// TVersionSampleData
{ tVersionDesignation, baseVersion, modificationDescription }

// MasterSongDevelopmentSampleData
{ designName, designPhase, warpCount, weftCount, patternRepeat }
```

---

## 🚀 Usage Examples

### Query Regular Samples
```javascript
const collection = db.collection('RegularSampleData')
const samples = await collection.find({ qualityGrade: 'A' }).toArray()
```

### Query T-Version Samples
```javascript
const collection = db.collection('TVersionSampleData')
const tVersions = await collection.find({ approvalStatus: 'Approved' }).toArray()
```

### Query Master Development Samples
```javascript
const collection = db.collection('MasterSongDevelopmentSampleData')
const readyForProduction = await collection.find({ approvalStatus: 'Production Ready' }).toArray()
```

### Aggregate Across Collections
```javascript
// Count documents in all collections
const collections = ['RegularSampleData', 'HeatSettingSampleData', 'PaddingSampleData', 'TVersionSampleData', 'MasterSongDevelopmentSampleData']

for (const col of collections) {
  const count = await db.collection(col).countDocuments()
  console.log(`${col}: ${count} documents`)
}
```

---

## 🔒 Data Integrity

### Unique Constraints
- **sampleCode**: Unique across all documents in each collection
- **sampleItemCode**: Unique within collection
- Indexes created on frequently queried fields

### Validation Rules
- Required fields must be present
- Sample codes follow pattern: `[Type]-YYYY-###`
  - RSF = Regular Sample
  - HSF = Heat Setting Sample
  - PSF = Padding Sample
  - TVS = T-Version Sample
  - MSD = Master Song Development

### Timestamps
- `createdAt`: Automatically set on document creation
- `updatedAt`: Automatically updated on modification

---

## 📊 Indexing Strategy

### Current Indexes
```javascript
// Applied to all collections
db.collection.createIndex({ sampleCode: 1 })        // For quick lookup
db.collection.createIndex({ customerName: 1 })      // For customer queries
db.collection.createIndex({ qualityGrade: 1 })      // For quality filtering
db.collection.createIndex({ createdAt: -1 })        // For sorting by date
```

---

## 🔄 Backup and Recovery

### Backup Collections
```bash
# MongoDB automatically backs up collections
# Use MongoDB Atlas backup features
```

### Recovery Options
1. Restore from MongoDB Atlas backup
2. Re-run seed scripts to restore sample data
3. Point-in-time recovery available

---

## 🎯 Future Expansion

### Adding New Sample Types
To add a new sample type (e.g., "Bleached Samples"):

1. **Create Model**
   ```javascript
   // models/bleachedSample.js
   const bleachedSampleSchema = new mongoose.Schema({...}, { collection: 'BleachedSampleData' })
   ```

2. **Create Seed Script**
   ```javascript
   // scripts/seedBleachedSamples.js
   const collection = await getCollection('BleachedSampleData')
   ```

3. **Add to Orchestration**
   ```javascript
   // seedAll.js - add to seeds array
   { file: 'seedBleachedSamples.js', name: 'Bleached Sample Data' }
   ```

4. **Add npm Script**
   ```json
   "seed:bleached": "node scripts/seedBleachedSamples.js"
   ```

---

## 📞 Support

### Common Operations

**View All Collections**
```bash
npm run seed                # Re-seed all data
```

**View Specific Collection**
```javascript
db.RegularSampleData.find().pretty()
db.TVersionSampleData.find().pretty()
db.MasterSongDevelopmentSampleData.find().pretty()
```

**Count Documents**
```javascript
db.RegularSampleData.countDocuments()         // 5
db.HeatSettingSampleData.countDocuments()     // 4
db.PaddingSampleData.countDocuments()         // 4
db.TVersionSampleData.countDocuments()        // 4
db.MasterSongDevelopmentSampleData.countDocuments()  // 4
```

### Database Statistics
```javascript
db.stats()  // Overall database stats
db.RegularSampleData.stats()  // Collection-specific stats
```

---

## ✅ Verification Checklist

After seeding, verify your setup:

- [ ] Database `YogotextBD_Denim` exists
- [ ] 5 collections created
- [ ] 21 total documents inserted
- [ ] All sample codes follow pattern
- [ ] Quality grades assigned appropriately
- [ ] Timestamps set on all documents
- [ ] No duplicate records
- [ ] All required fields populated

---

## 🎉 Summary

Your MongoDB database is now structured with:
- **1 Database**: YogotextBD_Denim
- **5 Collections**: For different sample types
- **21 Documents**: Sample data across all types
- **150+ Fields**: Comprehensive data schema
- **Extensible Design**: Ready for future sample types

Run `npm run seed` to start using your database!

