# Admin Panel Setup & Features

## Overview
The admin panel is a secure interface for managing users and sample data. Only admin users can access this panel.

## Features

### 1. User Management
- **View Users**: See all registered users with pagination
- **User Statistics**: 
  - Total Users
  - Verified Users
  - Unverified Users
- **Control User Status**:
  - Mark users as authorized/unauthorized
  - Mark users as verified/unverified
  - Promote users to admin
- **Delete Users**: Remove user accounts from the system

### 2. Sample Data Management
- **View Samples**: See all regular samples with pagination
- **CRUD Operations**:
  - **Create**: Add single or multiple samples
  - **Read**: View sample details
  - **Update**: Edit sample fields
  - **Delete**: Remove samples
- **Bulk Upload**: Upload multiple samples at once using JSON format

## Setup Instructions

### Step 1: Set Your Admin Account
Run the following command to set your admin account (replace with your email):

```bash
node scripts/setAdminUser.js your-email@example.com
```

This command will:
- Set your account as admin (`isAdmin: true`)
- Mark your account as authorized (`authorized: true`)
- Mark your account as verified (`verified: true`)

### Step 2: Access the Admin Panel
1. Sign in with your admin account
2. Click "Admin Panel" button in the navbar (shows as "⚙️ Admin Panel")
3. Or navigate directly to `/admin`

## API Endpoints

### User Management

#### Get All Users
```
GET /api/admin/users?page=1&limit=10
```
Response includes:
- User list with pagination
- User statistics (total, verified, unverified)

#### Get Specific User
```
GET /api/admin/users/:id
```

#### Update User
```
PUT /api/admin/users/:id
```
Body:
```json
{
  "authorized": true,
  "verified": true,
  "isAdmin": false
}
```

#### Delete User
```
DELETE /api/admin/users/:id
```

### Sample Data Management

#### Get All Samples
```
GET /api/admin/samples?page=1&limit=20
```

#### Get Specific Sample
```
GET /api/admin/samples/:id
```

#### Create Single Sample
```
POST /api/admin/samples
```
Body:
```json
{
  "samples": [
    {
      "sampleCode": "S001",
      "sampleItemCode": "SIC001",
      "customerName": "ABC Corp",
      "color": "Blue",
      ...other fields
    }
  ]
}
```

#### Bulk Upload Samples
```
POST /api/admin/samples
```
Body:
```json
{
  "samples": [
    { ...sample1 },
    { ...sample2 },
    { ...sampleN }
  ]
}
```

#### Update Sample
```
PUT /api/admin/samples/:id
```
Body:
```json
{
  "customerName": "New Name",
  "color": "Red",
  ...other fields to update
}
```

#### Partial Update Sample
```
PATCH /api/admin/samples/:id
```
Body:
```json
{
  "color": "Green"
}
```

#### Delete Sample
```
DELETE /api/admin/samples/:id
```

## User Interface Guide

### Users Tab
1. **View Statistics**: Dashboard shows key user metrics
2. **User Table**: Lists all users with their details
   - Name, Email, Verification Status, Authorization Status, Admin Status
3. **Edit User**: 
   - Click "Edit" button next to a user
   - Toggle checkboxes to change status
   - Click "Update" to save changes
4. **Delete User**: Click "Delete" button to remove a user

### Samples Tab
1. **Bulk Upload**:
   - Click "Bulk Upload Samples" button
   - Paste JSON array of samples
   - Click "Upload Samples"
2. **View Samples**: Table displays all samples
3. **Edit Sample**:
   - Click "Edit" button next to a sample
   - Modify fields in the modal
   - Click "Update" to save
4. **Delete Sample**: Click "Delete" button to remove

## Sample JSON Format for Bulk Upload

```json
[
  {
    "sampleCode": "S001",
    "sampleItemCode": "SIC001",
    "processingType": "Regular Finish",
    "construction": "Plain",
    "color": "Blue",
    "customerName": "ABC Corporation",
    "customerRequiredWidth": "62~63''",
    "customerRequirementLengthPercent": "+/-(3~4)%",
    "customerRequirementWidthPercent": "+/-(3~4)%",
    "weightBW": "10.00 oz",
    "sampleIssueDate": "2024-01-15",
    "finishingDate": "2024-01-20",
    "loomNo": 5,
    "warpingNo": 123,
    "yard": "102Y"
  },
  {
    "sampleCode": "S002",
    "sampleItemCode": "SIC002",
    ...
  }
]
```

## Security Features

- **Admin-Only Access**: Only users with `isAdmin: true` can access the API endpoints
- **Token Verification**: All requests require valid JWT token
- **Admin Protection**: Admins cannot delete their own account
- **Authorization Checks**: Each endpoint verifies admin status before processing

## Common Operations

### Make a User Admin
1. Go to Admin Panel → Users Management
2. Find the user
3. Click "Edit"
4. Check the "Admin" checkbox
5. Click "Update"

### Upload Multiple Samples from CSV Format
Convert your CSV data to JSON format:
```bash
# You can use tools like csvtojson or manually convert
# Example: CSV columns become JSON object keys
```

### View User Statistics
- Navigate to Users Management tab
- Statistics are displayed at the top
- Shows total, verified, and unverified counts

## Troubleshooting

### "User is not an admin" Error
- Make sure you ran `node scripts/setAdminUser.js` with your email
- Clear browser cache and localStorage
- Sign in again

### Cannot access admin panel
- Verify your account has `isAdmin: true`
- Check browser console for authentication errors
- Ensure cookies are enabled

### Bulk upload fails
- Validate JSON format (use online JSON validator)
- Ensure all required fields are present
- Check sample field names match the data model

## Future Enhancements
- Support for other sample data types (Padding, Heat Setting, etc.)
- Export samples to CSV
- User activity logging
- Batch operations on samples
- Sample categorization and filtering
