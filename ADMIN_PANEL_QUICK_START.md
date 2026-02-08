# Admin Panel Quick Start

## 🚀 Get Started in 2 Minutes

### Step 1: Create Your Admin Account
First, register a new account on the platform using your email address.

### Step 2: Set Admin Privileges
In your terminal, run:
```bash
node scripts/setAdminUser.js your-email@example.com
```

### Step 3: Sign In & Access Admin Panel
1. Sign in with your credentials
2. Click the "⚙️ Admin Panel" button in the top navbar
3. You're in! 🎉

---

## 📋 User Management Quick Guide

### View All Users
- Go to "Users Management" tab
- See statistics for total, verified, and unverified users
- Browse all users in the table

### Control User Access
1. Find the user in the table
2. Click "Edit"
3. Toggle options:
   - ✅ **Verified**: User has verified their email
   - ✅ **Authorized**: User is allowed to use the system
   - 👑 **Admin**: User has admin privileges
4. Click "Update"

### Remove a User
- Click "Delete" next to the user
- Confirm deletion

---

## 📦 Sample Data Management Quick Guide

### View All Samples
- Go to "Sample Data Management" tab
- See all regular samples in the table
- Use pagination to browse

### Add Single Sample
1. Click "Edit" on any sample to see the format
2. Note all the available fields
3. Use the API or bulk upload to add new samples

### Bulk Upload Multiple Samples
1. Click "Bulk Upload Samples"
2. Paste your JSON array:
```json
[
  {
    "sampleCode": "S001",
    "sampleItemCode": "SIC001",
    "customerName": "Customer Name",
    "color": "Blue",
    "construction": "Plain",
    ...other fields
  },
  ...more samples
]
```
3. Click "Upload Samples"

### Edit a Sample
1. Click "Edit" next to the sample
2. Change the fields you need
3. Click "Update"

### Delete a Sample
- Click "Delete" next to the sample
- Confirm deletion

---

## 🔐 Security Notes

- ✅ Only admin users can access the admin panel
- ✅ All operations are protected with JWT authentication
- ✅ You cannot delete your own admin account
- ✅ All actions are logged (prepare for future audit trail)

---

## 🤔 Common Questions

**Q: How do I make someone else an admin?**
A: Go to Users Management, click Edit on their profile, check Admin, and click Update.

**Q: Can I upload samples in CSV format?**
A: Convert CSV to JSON array first, then use bulk upload.

**Q: What fields can I include when uploading samples?**
A: Any fields from the sample data model. See sample details by clicking Edit on an existing sample.

**Q: How do I reset the database?**
A: Contact your database administrator. Admin panel doesn't have database reset functionality for safety.

---

## 📞 Need Help?

- Check browser console (F12) for error messages
- Review the full [ADMIN_PANEL_SETUP.md](ADMIN_PANEL_SETUP.md) documentation
- All API endpoints are RESTful and follow standard HTTP conventions
