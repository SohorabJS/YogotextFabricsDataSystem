# Heat Setting Sample API

Heat Setting Sample API provides comprehensive CRUD operations and search functionality for heat setting fabric samples.

## Base URL

```
/api/SamplesData/heatSetting
```

## Endpoints

### 1. Get All Samples

**GET** `/api/SamplesData/heatSetting`

Retrieve all heat setting samples with pagination and filtering support.

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)
- `sampleCode` (string, optional): Search by sample code
- `sampleItemCode` (string, optional): Search by sample item code
- `customerName` (string, optional): Search by customer name
- `color` (string, optional): Filter by color
- `processingType` (string, optional): Filter by processing type
- `sortBy` (string, optional): Sort field (default: createdAt)
- `sortOrder` (number, optional): Sort order (1 for ascending, -1 for descending, default: -1)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65d8c123...",
      "sampleCode": "HS-001",
      "sampleItemCode": "HSI-001",
      "customerName": "Customer A",
      "color": "Blue",
      "construction": "Plain Weave",
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalCount": 50,
    "totalPages": 5,
    "hasNextPage": true
  },
  "message": "Samples retrieved successfully"
}
```

### 2. Search by Sample Code

**GET** `/api/SamplesData/heatSetting?sampleCode=HS-001`

Returns all samples matching the provided sample code.

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 3,
  "message": "Found 3 sample(s) successfully"
}
```

### 3. Search by Sample Item Code

**GET** `/api/SamplesData/heatSetting?sampleItemCode=HSI-001`

Returns all samples matching the provided sample item code.

### 4. Search by Customer Name

**GET** `/api/SamplesData/heatSetting?customerName=Customer A`

Returns all samples for a specific customer.

### 5. Get Sample by ID

**GET** `/api/SamplesData/heatSetting/[id]`

Retrieve a specific sample by its MongoDB ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65d8c123...",
    "sampleCode": "HS-001",
    "sampleItemCode": "HSI-001",
    ...
  },
  "message": "Sample retrieved successfully"
}
```

### 6. Create Sample

**POST** `/api/SamplesData/heatSetting`

Create a new heat setting sample.

**Request Body:**
```json
{
  "sampleCode": "HS-001",
  "sampleItemCode": "HSI-001",
  "construction": "Plain Weave",
  "color": "Blue",
  "customerName": "Customer A",
  "customerRequiredWidth": "62~63''",
  "customerRequirementLengthPercent": "+/-(3~4)%",
  "customerRequirementWidthPercent": "+/-(3~4)%",
  "weightBW": "10.00 oz",
  "processingType": "Heat Setting",
  "loomNo": 101,
  "warpingNo": 45,
  "yard": "102Y",
  "weavingPPI": 80,
  "afterDryerWidthInch": "64.3''",
  "dryerSkewCM": "0.5",
  "afterShrinkageSkewCM": "0.3",
  "afterShrinkagePPI": 82,
  "ppiPlus": 2,
  "afterWashSkewCM": "0.2",
  "afterShrinkageWidthInch": "65''",
  "boxPercentRightHand": "2%",
  "boxPercentLeftHand": "1.5%",
  "afterWashWidthPercent": "+1%",
  "afterWashLengthPercent": "+0.5%",
  "afterWashWidthInch": "65.5''",
  "afterWashPPI": "83",
  "burnerQ": "High",
  "machineSpeed": "100",
  "machineWidthSetting": "64''",
  "tempSetting": "180°C",
  "sampleIssueDate": "2024-01-15",
  "finishingDate": "2024-01-20",
  "sampleProcessingDetails": "Heat Setting → Dryer(Box 180°C)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65d8c123...",
    "sampleCode": "HS-001",
    ...
  },
  "message": "Sample created successfully"
}
```

### 7. Update Sample (Full Update)

**PUT** `/api/SamplesData/heatSetting/[id]`

Fully update an existing sample.

**Request Body:** Same as Create

**Response:**
```json
{
  "success": true,
  "data": {...},
  "message": "Sample updated successfully"
}
```

### 8. Partial Update Sample

**PATCH** `/api/SamplesData/heatSetting/[id]`

Partially update specific fields of a sample.

**Request Body:**
```json
{
  "color": "Green",
  "afterShrinkagePPI": 85
}
```

**Response:**
```json
{
  "success": true,
  "data": {...},
  "message": "Sample partially updated successfully"
}
```

### 9. Delete Sample

**DELETE** `/api/SamplesData/heatSetting/[id]`

Delete a sample by its ID.

**Response:**
```json
{
  "success": true,
  "data": {...},
  "message": "Sample deleted successfully"
}
```

## Field Definitions

### Basic Sample Info
- `sampleCode` (string, required): Unique sample identifier
- `sampleItemCode` (string, optional): Item code for the sample
- `construction` (string, optional): Weave construction
- `color` (string, optional): Fabric color
- `customerName` (string, optional): Customer name
- `customerRequiredWidth` (string, optional): Required width specification
- `customerRequirementLengthPercent` (string, optional): Length tolerance percentage
- `customerRequirementWidthPercent` (string, optional): Width tolerance percentage
- `weightBW` (string, optional): Weight in oz

### Production Details
- `loomNo` (number, optional): Loom number
- `warpingNo` (number, optional): Warping number
- `yard` (string, optional): Yardage
- `weavingPPI` (number, optional): PPI before heat setting
- `sampleIssueDate` (date, optional): Date sample was issued
- `finishingDate` (date, optional): Date sample was finished

### Heat Setting Measurements
- `afterDryerWidthInch` (string, optional): Width after dryer
- `dryerSkewCM` (string, optional): Skew measurement from dryer
- `afterShrinkageSkewCM` (string, optional): Skew after shrinkage
- `afterShrinkagePPI` (number, optional): PPI after shrinkage
- `ppiPlus` (number, optional): PPI increase value

### Washing Results
- `afterWashSkewCM` (string, optional): Skew after washing
- `afterShrinkageWidthInch` (string, optional): Width after shrinkage
- `boxPercentRightHand` (string, optional): Right hand box percentage
- `boxPercentLeftHand` (string, optional): Left hand box percentage
- `afterWashWidthPercent` (string, optional): Width change percentage
- `afterWashLengthPercent` (string, optional): Length change percentage
- `afterWashWidthInch` (string, optional): Width after washing
- `afterWashPPI` (string, optional): PPI after washing

### Machine Settings
- `burnerQ` (string, optional): Burner setting
- `machineSpeed` (string, optional): Machine speed
- `machineWidthSetting` (string, optional): Machine width setting
- `tempSetting` (string, optional): Temperature setting (e.g., "180°C")

### Additional
- `processingType` (string, default: "Heat Setting"): Processing type
- `sampleProcessingDetails` (string, optional): Processing flow details

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "errors": {
    "sampleCode": "Sample code is required and must be a non-empty string"
  },
  "message": "Validation failed"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Sample not found",
  "message": "No sample found with the provided ID"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Database connection error",
  "message": "Server error"
}
```

## Usage Examples

### Create a new Heat Setting sample
```bash
curl -X POST http://localhost:3000/api/SamplesData/heatSetting \
  -H "Content-Type: application/json" \
  -d '{
    "sampleCode": "HS-001",
    "sampleItemCode": "HSI-001",
    "customerName": "Customer A",
    "color": "Blue"
  }'
```

### Search samples by sample code
```bash
curl http://localhost:3000/api/SamplesData/heatSetting?sampleCode=HS-001
```

### Get all samples with pagination
```bash
curl http://localhost:3000/api/SamplesData/heatSetting?page=1&limit=20
```

### Update a sample
```bash
curl -X PUT http://localhost:3000/api/SamplesData/heatSetting/65d8c123... \
  -H "Content-Type: application/json" \
  -d '{
    "color": "Green",
    "afterWashPPI": "85"
  }'
```

## Notes

- All timestamp fields accept ISO 8601 date format
- Search operations are case-insensitive
- Default sort is by creation date (newest first)
- Pagination starts from page 1
- Maximum limit per page is configurable (default: 10)
