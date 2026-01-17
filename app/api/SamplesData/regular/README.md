# Regular Sample Data API Documentation

## Overview
This API provides comprehensive CRUD operations for managing fabric regular sample data. The system follows a modular architecture with clear separation of concerns:

- **Model** (`regularSample.model.js`): Mongoose schema definition
- **Service** (`regularSample.service.js`): Business logic and database operations
- **Validation** (`regularSample.validation.js`): Input validation rules
- **Controller** (`regularSample.controller.js`): Request/response handling
- **Routes** (`route.js`): API endpoint definitions

## Base URL
```
/api/SamplesData/regular
```

## API Endpoints

### 1. CREATE - Add a New Sample
**Endpoint:** `POST /api/SamplesData/regular`

**Request Body:**
```json
{
  "sampleCode": "RSF-2025-001",
  "sampleItemCode": "ITEM-001",
  "processingType": "Regular Finish",
  "construction": "Plain",
  "color": "Navy Blue",
  "customerName": "ABC Textiles",
  "customerRequiredWidth": "62~63''",
  "customerRequirementLengthPercent": "+/-(3~4)%",
  "customerRequirementWidthPercent": "+/-(3~4)%",
  "weightBW": "10.00 oz",
  "sampleIssueDate": "2025-01-17",
  "finishingDate": "2025-01-18",
  "loomNo": 5,
  "warpingNo": 102,
  "yard": "102Y",
  "afterDryerWidthInch": "C:64.3'' F:65.3''",
  "weavingPPI": 108,
  "dryerSkewCM": "0.5",
  "afterShrinkageSkewCM": "0.3",
  "afterShrinkagePPI": 110,
  "ppiPlus": 2,
  "afterWashSkewCM": "0.2",
  "afterShrinkageWidthInch": "C:65'' F:66''",
  "boxPercentRightHand": "2.5%",
  "boxPercentLeftHand": "2.3%",
  "afterWashWidthPercent": "1.5%",
  "afterWashLengthPercent": "2.0%",
  "afterWashWidthInch": "64.5",
  "afterWashPPI": 112,
  "sampleProcessingDetails": "Singeing → Dryer(5box 60°C) → Sanforized"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "67a8b1c2d3e4f5g6h7i8j9k0",
    "sampleCode": "RSF-2025-001",
    "sampleItemCode": "ITEM-001",
    ...
    "createdAt": "2025-01-17T10:30:00.000Z",
    "updatedAt": "2025-01-17T10:30:00.000Z"
  },
  "message": "Sample created successfully"
}
```

---

### 2. READ - Get All Samples (with Pagination & Filtering)
**Endpoint:** `GET /api/SamplesData/regular`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sampleCode` (optional): Filter by sample code (partial match)
- `customerName` (optional): Filter by customer name (partial match)
- `color` (optional): Filter by color (partial match)
- `processingType` (optional): Filter by processing type (exact match)
- `sortBy` (optional): Sort field (default: createdAt)
- `sortOrder` (optional): Sort order 1 for ascending, -1 for descending (default: -1)

**Example Request:**
```
GET /api/SamplesData/regular?page=1&limit=10&customerName=ABC&sortBy=sampleCode&sortOrder=1
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "67a8b1c2d3e4f5g6h7i8j9k0",
      "sampleCode": "RSF-2025-001",
      "sampleItemCode": "ITEM-001",
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

---

### 3. READ - Get Single Sample by ID
**Endpoint:** `GET /api/SamplesData/regular/:id`

**Path Parameters:**
- `id` (required): MongoDB ObjectId of the sample

**Example Request:**
```
GET /api/SamplesData/regular/67a8b1c2d3e4f5g6h7i8j9k0
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "67a8b1c2d3e4f5g6h7i8j9k0",
    "sampleCode": "RSF-2025-001",
    ...
    "createdAt": "2025-01-17T10:30:00.000Z",
    "updatedAt": "2025-01-17T10:30:00.000Z"
  },
  "message": "Sample retrieved successfully"
}
```

---

### 4. READ - Search by Sample Code
**Endpoint:** `GET /api/SamplesData/regular?code=RSF-2025-001`

**Query Parameters:**
- `code` (required): Sample code to search for (exact match)

**Example Request:**
```
GET /api/SamplesData/regular?code=RSF-2025-001
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "67a8b1c2d3e4f5g6h7i8j9k0",
    "sampleCode": "RSF-2025-001",
    ...
  },
  "message": "Sample found successfully"
}
```

---

### 5. READ - Get Samples by Customer
**Endpoint:** `GET /api/SamplesData/regular?customer=ABC Textiles`

**Query Parameters:**
- `customer` (required): Customer name (partial match)

**Example Request:**
```
GET /api/SamplesData/regular?customer=ABC
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "67a8b1c2d3e4f5g6h7i8j9k0",
      "sampleCode": "RSF-2025-001",
      "customerName": "ABC Textiles",
      ...
    }
  ],
  "count": 5,
  "message": "Samples retrieved successfully"
}
```

---

### 6. UPDATE - Full Update of a Sample
**Endpoint:** `PUT /api/SamplesData/regular/:id`

**Path Parameters:**
- `id` (required): MongoDB ObjectId of the sample

**Request Body:** All fields are optional (provide fields you want to update)
```json
{
  "color": "Red",
  "customerRequiredWidth": "63~64''",
  "afterWashWidthPercent": "1.8%"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "67a8b1c2d3e4f5g6h7i8j9k0",
    "sampleCode": "RSF-2025-001",
    "color": "Red",
    ...
    "updatedAt": "2025-01-17T11:45:00.000Z"
  },
  "message": "Sample updated successfully"
}
```

---

### 7. UPDATE - Partial Update (Edit Specific Fields)
**Endpoint:** `PATCH /api/SamplesData/regular/:id`

**Path Parameters:**
- `id` (required): MongoDB ObjectId of the sample

**Request Body:** Provide only the fields you want to update
```json
{
  "afterWashWidthPercent": "1.8%",
  "afterWashPPI": 115
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "67a8b1c2d3e4f5g6h7i8j9k0",
    "sampleCode": "RSF-2025-001",
    "afterWashWidthPercent": "1.8%",
    "afterWashPPI": 115,
    ...
    "updatedAt": "2025-01-17T11:45:00.000Z"
  },
  "message": "Sample partially updated successfully"
}
```

---

### 8. DELETE - Remove a Sample
**Endpoint:** `DELETE /api/SamplesData/regular/:id`

**Path Parameters:**
- `id` (required): MongoDB ObjectId of the sample

**Example Request:**
```
DELETE /api/SamplesData/regular/67a8b1c2d3e4f5g6h7i8j9k0
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "67a8b1c2d3e4f5g6h7i8j9k0",
    "sampleCode": "RSF-2025-001",
    ...
  },
  "message": "Sample deleted successfully"
}
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "errors": {
    "sampleCode": "Sample code is required and must be a non-empty string"
  },
  "message": "Validation failed"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "error": "Sample not found",
  "message": "No sample found with the provided ID"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "error": "Error message",
  "message": "Server error"
}
```

---

## Data Model Fields

### Required Fields:
- `sampleCode` (String): Unique sample identifier
- `sampleItemCode` (String): Item code for the sample

### Optional Fields:

**Basic Info:**
- `processingType` (String, default: "Regular Finish")
- `construction` (String)
- `color` (String)
- `customerName` (String)
- `customerRequiredWidth` (String)
- `customerRequirementLengthPercent` (String)
- `customerRequirementWidthPercent` (String)
- `weightBW` (String)

**Production Details:**
- `sampleIssueDate` (Date)
- `finishingDate` (Date)
- `loomNo` (Number)
- `warpingNo` (Number)
- `yard` (String)

**Measurements:**
- `afterDryerWidthInch` (String)
- `weavingPPI` (Number)
- `dryerSkewCM` (String)
- `afterShrinkageSkewCM` (String)
- `afterShrinkagePPI` (Number)
- `ppiPlus` (Number)
- `afterWashSkewCM` (String)
- `afterShrinkageWidthInch` (String)

**Shrinkage/Box:**
- `boxPercentRightHand` (String)
- `boxPercentLeftHand` (String)
- `afterWashWidthPercent` (String)
- `afterWashLengthPercent` (String)
- `afterWashWidthInch` (String)
- `afterWashPPI` (Number)

**Processing:**
- `sampleProcessingDetails` (String)

---

## Usage Examples

### Example 1: Create a New Sample
```bash
curl -X POST http://localhost:3000/api/SamplesData/regular \
  -H "Content-Type: application/json" \
  -d '{
    "sampleCode": "RSF-2025-001",
    "sampleItemCode": "ITEM-001",
    "customerName": "ABC Textiles",
    "color": "Navy Blue"
  }'
```

### Example 2: Get All Samples with Pagination
```bash
curl http://localhost:3000/api/SamplesData/regular?page=1&limit=5
```

### Example 3: Update a Specific Field
```bash
curl -X PATCH http://localhost:3000/api/SamplesData/regular/67a8b1c2d3e4f5g6h7i8j9k0 \
  -H "Content-Type: application/json" \
  -d '{
    "afterWashWidthPercent": "2.0%"
  }'
```

### Example 4: Delete a Sample
```bash
curl -X DELETE http://localhost:3000/api/SamplesData/regular/67a8b1c2d3e4f5g6h7i8j9k0
```

### Example 5: Search by Customer
```bash
curl http://localhost:3000/api/SamplesData/regular?customer=ABC
```

---

## Architecture Overview

```
regularSample.model.js
    ↓ (Defines schema)
regularSample.service.js
    ↓ (Business logic)
regularSample.validation.js + regularSample.controller.js
    ↓ (Validation & Request handling)
route.js (Next.js API routes)
    ↓
HTTP Responses
```

---

## Features

✅ **Full CRUD Operations** - Create, Read, Update, Delete samples
✅ **Pagination** - Efficient data retrieval with limit and page control
✅ **Advanced Filtering** - Filter by sample code, customer, color, and processing type
✅ **Search Functionality** - Quick search by sample code and customer name
✅ **Input Validation** - Comprehensive validation on both create and update operations
✅ **Partial Updates** - Update specific fields without affecting others
✅ **Comprehensive Error Handling** - Clear error messages and status codes
✅ **Timestamps** - Automatic createdAt and updatedAt tracking
✅ **Database Connection** - Integrated with MongoDB via Mongoose

