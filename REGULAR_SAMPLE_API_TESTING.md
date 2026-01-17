# Regular Sample API - Quick Testing Guide

This guide provides ready-to-use examples for testing all API endpoints.

## Base URL
```
http://localhost:3000/api/SamplesData/regular
```

## 1. CREATE - Add New Sample

### cURL
```bash
curl -X POST http://localhost:3000/api/SamplesData/regular \
  -H "Content-Type: application/json" \
  -d '{
    "sampleCode": "RSF-2025-001",
    "sampleItemCode": "ITEM-001",
    "processingType": "Regular Finish",
    "construction": "Plain",
    "color": "Navy Blue",
    "customerName": "ABC Textiles",
    "customerRequiredWidth": "62~63 inch",
    "weightBW": "10.00 oz",
    "sampleIssueDate": "2025-01-17",
    "loomNo": 5,
    "warpingNo": 102,
    "yard": "102Y",
    "weavingPPI": 108,
    "afterWashPPI": 112,
    "sampleProcessingDetails": "Singeing → Dryer(5box 60°C) → Sanforized"
  }'
```

### JavaScript/Fetch
```javascript
const response = await fetch('http://localhost:3000/api/SamplesData/regular', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sampleCode: 'RSF-2025-001',
    sampleItemCode: 'ITEM-001',
    color: 'Navy Blue',
    customerName: 'ABC Textiles'
  })
});
const data = await response.json();
console.log(data);
```

---

## 2. READ - Get All Samples

### Basic (No Filters)
```bash
curl http://localhost:3000/api/SamplesData/regular
```

### With Pagination
```bash
curl "http://localhost:3000/api/SamplesData/regular?page=1&limit=5"
```

### Filter by Customer
```bash
curl "http://localhost:3000/api/SamplesData/regular?customerName=ABC&limit=10"
```

### Filter by Color
```bash
curl "http://localhost:3000/api/SamplesData/regular?color=Navy&limit=10"
```

### Multiple Filters + Sorting
```bash
curl "http://localhost:3000/api/SamplesData/regular?customerName=ABC&color=Navy&sortBy=createdAt&sortOrder=-1&page=1&limit=10"
```

### Sort Newest First
```bash
curl "http://localhost:3000/api/SamplesData/regular?sortBy=createdAt&sortOrder=-1&limit=10"
```

### Sort by Sample Code (A-Z)
```bash
curl "http://localhost:3000/api/SamplesData/regular?sortBy=sampleCode&sortOrder=1&limit=10"
```

---

## 3. READ - Get Single Sample by ID

### cURL (Replace [ID] with actual MongoDB ObjectId)
```bash
curl http://localhost:3000/api/SamplesData/regular/67a8b1c2d3e4f5g6h7i8j9k0
```

### JavaScript/Fetch
```javascript
const sampleId = '67a8b1c2d3e4f5g6h7i8j9k0';
const response = await fetch(`http://localhost:3000/api/SamplesData/regular/${sampleId}`);
const data = await response.json();
console.log(data);
```

---

## 4. READ - Search by Sample Code

### cURL
```bash
curl "http://localhost:3000/api/SamplesData/regular?code=RSF-2025-001"
```

### JavaScript/Fetch
```javascript
const response = await fetch('http://localhost:3000/api/SamplesData/regular?code=RSF-2025-001');
const data = await response.json();
console.log(data);
```

---

## 5. READ - Get Samples by Customer

### cURL
```bash
curl "http://localhost:3000/api/SamplesData/regular?customer=ABC"
```

### Get All ABC Textiles Samples
```bash
curl "http://localhost:3000/api/SamplesData/regular?customer=ABC%20Textiles"
```

---

## 6. UPDATE - Full Update (PUT)

### Update All Fields
```bash
curl -X PUT http://localhost:3000/api/SamplesData/regular/67a8b1c2d3e4f5g6h7i8j9k0 \
  -H "Content-Type: application/json" \
  -d '{
    "sampleCode": "RSF-2025-001-UPDATED",
    "color": "Red",
    "customerName": "XYZ Corporation",
    "construction": "Twill",
    "weavingPPI": 120
  }'
```

### JavaScript/Fetch
```javascript
const sampleId = '67a8b1c2d3e4f5g6h7i8j9k0';
const response = await fetch(`http://localhost:3000/api/SamplesData/regular/${sampleId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    color: 'Red',
    customerName: 'XYZ Corporation'
  })
});
const data = await response.json();
console.log(data);
```

---

## 7. UPDATE - Partial Update (PATCH) - Edit Specific Fields

### Update Color Only
```bash
curl -X PATCH http://localhost:3000/api/SamplesData/regular/67a8b1c2d3e4f5g6h7i8j9k0 \
  -H "Content-Type: application/json" \
  -d '{"color": "Green"}'
```

### Update Multiple Fields
```bash
curl -X PATCH http://localhost:3000/api/SamplesData/regular/67a8b1c2d3e4f5g6h7i8j9k0 \
  -H "Content-Type: application/json" \
  -d '{
    "afterWashWidthPercent": "2.0%",
    "afterWashLengthPercent": "2.5%",
    "afterWashPPI": 115
  }'
```

### Update Measurements
```bash
curl -X PATCH http://localhost:3000/api/SamplesData/regular/67a8b1c2d3e4f5g6h7i8j9k0 \
  -H "Content-Type: application/json" \
  -d '{
    "weavingPPI": 112,
    "afterShrinkagePPI": 114,
    "dryerSkewCM": "0.4"
  }'
```

### JavaScript/Fetch
```javascript
const sampleId = '67a8b1c2d3e4f5g6h7i8j9k0';
const response = await fetch(`http://localhost:3000/api/SamplesData/regular/${sampleId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    color: 'Purple',
    afterWashWidthPercent: '2.0%'
  })
});
const data = await response.json();
console.log(data);
```

---

## 8. DELETE - Remove Sample

### cURL
```bash
curl -X DELETE http://localhost:3000/api/SamplesData/regular/67a8b1c2d3e4f5g6h7i8j9k0
```

### JavaScript/Fetch
```javascript
const sampleId = '67a8b1c2d3e4f5g6h7i8j9k0';
const response = await fetch(`http://localhost:3000/api/SamplesData/regular/${sampleId}`, {
  method: 'DELETE'
});
const data = await response.json();
console.log(data);
```

---

## Advanced Query Examples

### Complex Filtering with Pagination
```bash
curl "http://localhost:3000/api/SamplesData/regular?customerName=ABC&color=Navy&processingType=Regular%20Finish&page=2&limit=5"
```

### Sorting by Issue Date (Oldest First)
```bash
curl "http://localhost:3000/api/SamplesData/regular?sortBy=sampleIssueDate&sortOrder=1&limit=20"
```

### Large Limit for Export
```bash
curl "http://localhost:3000/api/SamplesData/regular?page=1&limit=100"
```

---

## Response Examples

### Successful Creation (201)
```json
{
  "success": true,
  "data": {
    "_id": "67a8b1c2d3e4f5g6h7i8j9k0",
    "sampleCode": "RSF-2025-001",
    "sampleItemCode": "ITEM-001",
    "color": "Navy Blue",
    "customerName": "ABC Textiles",
    "createdAt": "2025-01-17T10:30:00.000Z",
    "updatedAt": "2025-01-17T10:30:00.000Z"
  },
  "message": "Sample created successfully"
}
```

### Successful Retrieval (200)
```json
{
  "success": true,
  "data": [
    {
      "_id": "67a8b1c2d3e4f5g6h7i8j9k0",
      "sampleCode": "RSF-2025-001",
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

### Validation Error (400)
```json
{
  "success": false,
  "errors": {
    "sampleCode": "Sample code is required and must be a non-empty string",
    "sampleItemCode": "Sample item code is required and must be a non-empty string"
  },
  "message": "Validation failed"
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": "Sample not found",
  "message": "No sample found with the provided ID"
}
```

---

## Testing with Postman

### Step 1: Create Collection
- Create new collection called "Regular Sample API"

### Step 2: Add Request Examples
- POST Create Sample
- GET All Samples
- GET Single Sample by ID
- PATCH Update Sample
- DELETE Sample

### Step 3: Set Variables
- Add variable `baseUrl`: `http://localhost:3000/api/SamplesData/regular`
- Add variable `sampleId`: `67a8b1c2d3e4f5g6h7i8j9k0` (after creating a sample)

### Step 4: Use Variables in Requests
```
GET {{baseUrl}}/{{sampleId}}
POST {{baseUrl}}
PATCH {{baseUrl}}/{{sampleId}}
DELETE {{baseUrl}}/{{sampleId}}
```

---

## Testing with Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create new request
3. Set method and URL
4. Add request body as JSON
5. Send request and view response

---

## Performance Testing

### Get Sample Count
```bash
# This returns total count in pagination object
curl "http://localhost:3000/api/SamplesData/regular?limit=1"
```

### Bulk Operations Script
```bash
#!/bin/bash

# Create multiple samples
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/SamplesData/regular \
    -H "Content-Type: application/json" \
    -d "{
      \"sampleCode\": \"RSF-2025-00$i\",
      \"sampleItemCode\": \"ITEM-00$i\",
      \"customerName\": \"Customer $i\"
    }"
  echo ""
done
```

---

## Troubleshooting

### Connection Issues
- Check if Next.js server is running: `npm run dev`
- Verify port 3000 is accessible

### Database Issues
- Verify MongoDB connection in `lib/mongodb.js`
- Check MongoDB is running

### Validation Errors
- Ensure required fields `sampleCode` and `sampleItemCode` are provided
- Check field data types match schema

### ID Format Errors
- MongoDB IDs must be valid ObjectIds (24 hex characters)
- Use actual ID from creation response

