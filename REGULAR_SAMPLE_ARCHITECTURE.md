# Regular Sample Data System - Architecture & Implementation Guide

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                 │
│  (Web Browser, Mobile App, Postman, cURL, External Systems)         │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                      HTTP Requests/Responses
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                      NEXT.JS API ROUTES                             │
│              /api/SamplesData/regular/route.js                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  GET, POST, PUT, PATCH, DELETE HTTP Methods              │   │
│  │  Route Handler - Determines which operation to perform    │   │
│  └─────────────────────┬───────────────────────────────────────┘   │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    CONTROLLER LAYER                                  │
│          regularSample.controller.js                                 │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  ✓ createSample()                                           │   │
│  │  ✓ getAllSamples()                                          │   │
│  │  ✓ getSampleById()                                          │   │
│  │  ✓ updateSample()                                           │   │
│  │  ✓ partialUpdateSample()                                    │   │
│  │  ✓ deleteSample()                                           │   │
│  │  ✓ searchBySampleCode()                                     │   │
│  │  ✓ getSamplesByCustomer()                                   │   │
│  │                                                              │   │
│  │  ➜ Parse requests                                           │   │
│  │  ➜ Call validation & service                                │   │
│  │  ➜ Format responses                                         │   │
│  └─────────────────────┬──────────────────────────────────────┘   │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
    ┌───────────────┐  ┌──────────────┐  ┌────────────────┐
    │ VALIDATION    │  │   SERVICE    │  │  ERROR         │
    │  LAYER        │  │   LAYER      │  │  HANDLING      │
    └───────────────┘  └──────────────┘  └────────────────┘

            regularSample.validation.js    regularSample.service.js

            ✓ validateCreateSample()       ✓ createSample()
            ✓ validateUpdateSample()       ✓ getAllSamples()
            ✓ validateQueryParams()        ✓ getSampleById()
                                          ✓ updateSample()
                                          ✓ partialUpdateSample()
                                          ✓ deleteSample()
                                          ✓ searchBySampleCode()
                                          ✓ getSamplesByCustomer()
              │
              └────────────────┬─────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    DATA MODEL LAYER                                  │
│                 regularSample.model.js                               │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Mongoose Schema Definition                                 │   │
│  │  ➜ 30+ Fields for fabric sample data                       │   │
│  │  ➜ Type validation                                         │   │
│  │  ➜ Unique constraints (sampleCode)                         │   │
│  │  ➜ Timestamps (createdAt, updatedAt)                       │   │
│  └─────────────────────┬──────────────────────────────────────┘   │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────┐
│                   MONGODB DATABASE                                   │
│         Collections: RegularSample                                   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Document Structure:                                        │   │
│  │  {                                                           │   │
│  │    _id: ObjectId,                                            │   │
│  │    sampleCode: String,                                       │   │
│  │    sampleItemCode: String,                                   │   │
│  │    color: String,                                            │   │
│  │    customerName: String,                                     │   │
│  │    ... (27 more fields)                                      │   │
│  │    createdAt: Date,                                          │   │
│  │    updatedAt: Date                                           │   │
│  │  }                                                            │   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

## Request-Response Flow

### Example: Creating a New Sample

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. CLIENT SENDS REQUEST                                        │
│    POST /api/SamplesData/regular                              │
│    Headers: { Content-Type: application/json }                │
│    Body: {                                                     │
│      sampleCode: "RSF-2025-001",                             │
│      sampleItemCode: "ITEM-001",                             │
│      color: "Navy Blue",                                     │
│      customerName: "ABC Textiles"                            │
│    }                                                           │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. NEXT.JS ROUTE HANDLER (route.js)                          │
│    Receives POST request                                       │
│    Routes to: regularSampleController.createSample()         │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. CONTROLLER (regularSample.controller.js)                   │
│    ✓ Calls: regularSampleValidation.validateCreateSample()  │
│    ✓ If valid: Calls regularSampleService.createSample()    │
│    ✓ Format response                                          │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. VALIDATION (regularSample.validation.js)                   │
│    Checks:                                                     │
│    ✓ sampleCode is string & not empty                        │
│    ✓ sampleItemCode is string & not empty                    │
│    ✓ All optional fields have correct types                  │
│    Returns: { isValid: true/false, errors: {} }             │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. SERVICE (regularSample.service.js)                        │
│    ✓ Create new RegularSample instance                       │
│    ✓ Call: newSample.save()                                  │
│    ✓ Save to MongoDB                                          │
│    ✓ Return result with success status                       │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. MONGODB OPERATION                                           │
│    Insert Document:                                            │
│    {                                                           │
│      _id: ObjectId("67a8b1c2d3e4f5g6h7i8j9k0"),            │
│      sampleCode: "RSF-2025-001",                            │
│      sampleItemCode: "ITEM-001",                            │
│      color: "Navy Blue",                                    │
│      customerName: "ABC Textiles",                          │
│      createdAt: 2025-01-17T10:30:00Z,                       │
│      updatedAt: 2025-01-17T10:30:00Z                        │
│    }                                                           │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. RETURN RESPONSE TO CLIENT                                  │
│    Status: 201 Created                                        │
│    Body: {                                                    │
│      success: true,                                          │
│      data: { ... created sample with _id },                │
│      message: "Sample created successfully"                 │
│    }                                                           │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow for GET Request

```
┌─────────────────────────────────────────────────────────────────┐
│ CLIENT REQUEST                                                  │
│ GET /api/SamplesData/regular?customerName=ABC&limit=10       │
└──────────────────────────┬──────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   ┌─────────┐      ┌──────────┐      ┌───────────┐
   │   PARSE │      │ VALIDATE │      │   ROUTE   │
   │ PARAMS  │      │  PARAMS  │      │  HANDLER  │
   └────┬────┘      └────┬─────┘      └─────┬─────┘
        │                │                  │
        └────────────────┼──────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │   CONTROLLER                   │
        │   getAllSamples()              │
        │   - Connect to DB              │
        │   - Call service method        │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │   SERVICE                      │
        │   Build filter: {              │
        │     customerName: /ABC/i       │
        │   }                            │
        │   Query: find(filter)          │
        │          .skip(0)              │
        │          .limit(10)            │
        │   Count total documents        │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │   MONGODB QUERY                │
        │   Find all with customerName   │
        │   Return 10 documents          │
        │   Count total matches          │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │   FORMAT RESPONSE              │
        │   {                            │
        │     success: true,             │
        │     data: [...samples],        │
        │     pagination: {              │
        │       page: 1,                 │
        │       limit: 10,               │
        │       totalCount: 25,          │
        │       totalPages: 3,           │
        │       hasNextPage: true        │
        │     }                          │
        │   }                            │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │   SEND RESPONSE (200 OK)       │
        │   With pagination info         │
        └────────────────────────────────┘
```

## File Dependencies

```
regularSample.controller.js
    ├─ imports: regularSample.service.js
    ├─ imports: regularSample.validation.js
    └─ imports: lib/mongodb.js (for DB connection)

route.js
    └─ imports: regularSample.controller.js

regularSample.service.js
    └─ imports: models/regularSample.js

regularSample.model.js
    └─ imports: mongoose

regularSample.validation.js
    └─ (No imports - pure validation functions)
```

## CRUD Operations Matrix

```
┌─────────────┬──────────┬──────────────────┬─────────────────────┐
│ Operation   │ HTTP     │ Endpoint         │ Handler Method      │
├─────────────┼──────────┼──────────────────┼─────────────────────┤
│ CREATE      │ POST     │ /api/.../regular │ createSample()      │
├─────────────┼──────────┼──────────────────┼─────────────────────┤
│ READ (All)  │ GET      │ /api/.../regular │ getAllSamples()     │
├─────────────┼──────────┼──────────────────┼─────────────────────┤
│ READ (One)  │ GET      │ /api/.../:id     │ getSampleById()     │
├─────────────┼──────────┼──────────────────┼─────────────────────┤
│ READ (Find) │ GET      │ /api/...?code=X  │ searchBySampleCode()│
├─────────────┼──────────┼──────────────────┼─────────────────────┤
│ READ (List) │ GET      │ /api/...?cust=Y  │ getSamplesByCustom()│
├─────────────┼──────────┼──────────────────┼─────────────────────┤
│ UPDATE      │ PUT      │ /api/.../:id     │ updateSample()      │
├─────────────┼──────────┼──────────────────┼─────────────────────┤
│ PARTIAL UPD │ PATCH    │ /api/.../:id     │ partialUpdateSample│
├─────────────┼──────────┼──────────────────┼─────────────────────┤
│ DELETE      │ DELETE   │ /api/.../:id     │ deleteSample()      │
└─────────────┴──────────┴──────────────────┴─────────────────────┘
```

## Error Handling Flow

```
                    REQUEST ARRIVES
                         │
                         ▼
                    VALIDATION LAYER
                    /       \
                   /         \
              VALID?         INVALID
              /               \
             ▼                 ▼
        PROCESS             ERROR
        FURTHER             └─ Return 400 Bad Request
             │                  {
             ▼                    errors: {...}
        SERVICE LAYER           }
        /         \
       /           \
    SUCCESS       ERROR
    /             \
   ▼               ▼
RETURN 201      ERROR TYPE?
DATA            /   |   \
                /    |    \
          NOT FOUND  |    SERVER ERROR
              │      │        │
              ▼      ▼        ▼
           404    400/422    500
```

## Validation Flow

```
INPUT DATA
    │
    ▼
VALIDATION LAYER
    │
    ├─ Check required fields present
    │  └─ sampleCode, sampleItemCode
    │
    ├─ Check string fields are strings
    │  └─ color, customerName, etc.
    │
    ├─ Check number fields are valid numbers
    │  └─ loomNo, warpingNo, weavingPPI, etc.
    │
    ├─ Check date fields are valid dates
    │  └─ sampleIssueDate, finishingDate
    │
    └─ Compile errors
        │
        ├─ IF errors exist
        │  └─ Return { isValid: false, errors: {...} }
        │
        └─ IF no errors
           └─ Return { isValid: true, errors: {} }
```

## Performance Considerations

```
OPTIMIZATION TECHNIQUES

┌──────────────────────────────────────┐
│ 1. PAGINATION                        │
│    - Limit results per request       │
│    - Reduces memory usage            │
│    - Faster response times           │
│    Default: page=1, limit=10         │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ 2. FILTERING                         │
│    - Reduce documents scanned        │
│    - Only return needed data         │
│    - Supports multiple filters       │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ 3. INDEXING                          │
│    - sampleCode (unique)             │
│    - createdAt, customerName (if     │
│      frequently queried)             │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ 4. VALIDATION                        │
│    - Fail fast on invalid input      │
│    - Prevent database writes         │
│    - Reduce server load              │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ 5. ERROR HANDLING                    │
│    - Graceful error messages         │
│    - Proper HTTP status codes        │
│    - Prevent server crashes          │
└──────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────┐
│         PRODUCTION ENVIRONMENT              │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │   Next.js Server (Port 3000)         │   │
│  │   - Runs API routes                  │   │
│  │   - Handles HTTP requests            │   │
│  └──────────────────────────────────────┘   │
│                 │                           │
│                 ▼                           │
│  ┌──────────────────────────────────────┐   │
│  │   Node.js Runtime                    │   │
│  │   - Executes JavaScript/TypeScript   │   │
│  │   - Manages connections              │   │
│  └──────────────────────────────────────┘   │
│                 │                           │
│                 ▼                           │
│  ┌──────────────────────────────────────┐   │
│  │   Mongoose/MongoDB Driver            │   │
│  │   - Manages DB connections           │   │
│  │   - Connection pooling               │   │
│  └──────────────────────────────────────┘   │
│                 │                           │
│                 ▼                           │
│  ┌──────────────────────────────────────┐   │
│  │   MongoDB Database                   │   │
│  │   - Stores RegularSample documents   │   │
│  │   - Indexes for fast queries         │   │
│  └──────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

