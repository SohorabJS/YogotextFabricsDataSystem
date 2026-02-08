# 🚀 How to Access Admin Panel - Step by Step Guide

## ⚠️ Profile Button Not Showing? (FIXED)
If you logged in but still see Login/Sign Up buttons instead of your profile, don't worry! I just fixed this issue. Try these steps:

1. **Clear your browser cache**:
   - Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
   - Clear "Cookies and other site data"
   - Clear "All time"

2. **Close and reopen your browser**

3. **Try logging in again** - you should now see your profile button! ✅

---

## 📌 Complete Guide to Access Admin Panel

### Step 1: Register an Account (If You Haven't)
1. Go to your application home page
2. Click **"Sign Up"** button (top right)
3. Fill in:
   - First Name
   - Last Name
   - ID Number (example: 1358, 6004, 5577, 320, 45, 359)
   - Email
   - Password (min 8 characters)
4. Click **"Create Account"**
5. You should be redirected to Sign In page

### Step 2: Sign In with Your Account
1. Click **"Sign In"** button
2. Enter your email and password
3. Click **"Sign In"**
4. ✅ You should now see your **profile button** on the right side of the navbar!

### Step 3: Make Yourself Admin (Required!)
**You can only access the admin panel if you're marked as admin.**

Open your terminal/command prompt and run this command:
```bash
cd d:\FabricDataSystemApp\data-system
node scripts/setAdminUser.js your-email@example.com
```

**Replace `your-email@example.com` with your actual email**

Example:
```bash
node scripts/setAdminUser.js john@example.com
```

**Expected output:**
```
✅ User john@example.com has been set as admin
   - isAdmin: true
   - authorized: true
   - verified: true
```

### Step 4: Refresh Your Browser
1. Press `F5` or `Ctrl + R` to refresh
2. You should see the **purple "⚙️ Admin Panel"** button in the navbar
3. The profile button should also appear

### Step 5: Click Admin Panel Button
1. Look for the **purple "⚙️ Admin Panel"** button next to your profile
2. Click it
3. 🎉 You're in the admin panel!

---

## 🎯 What You Can Do in Admin Panel

### Users Management Tab
- ✅ See how many users registered
- ✅ See how many users verified
- ✅ See user list
- ✅ Edit user status (authorize/verify/make admin)
- ✅ Delete users

### Sample Data Management Tab
- ✅ Upload multiple samples at once (bulk upload)
- ✅ Edit individual samples
- ✅ Delete samples
- ✅ View all samples

---

## 🆘 Troubleshooting

### Profile Button Still Not Showing After Login?

**Issue: Login successful but profile button not appearing**

**Solution:**
```
1. Check if you're on the correct page (should be home page)
2. Look at the top right of the navbar
3. If you see "Sign In" and "Sign Up" buttons:
   - Try refreshing the page (F5)
   - Clear browser cache (Ctrl+Shift+Delete)
   - Log out and log back in
   - Restart browser
```

### I Made Myself Admin But Can't See the Purple Admin Button?

**Issue: No "⚙️ Admin Panel" button showing**

**Solution:**
```
1. Run setup command again:
   node scripts/setAdminUser.js your-email@example.com
   
2. Verify it says "set as admin" in the output

3. Refresh browser (F5)

4. If still not showing:
   - Clear localStorage: Press F12 → Console → paste this:
     localStorage.removeItem('user');
   - Log out completely
   - Log back in
   - Refresh browser
```

### Cannot Access /admin URL

**Issue: Going to /admin shows error or redirects**

**Solution:**
1. Make sure you ran the setup script
2. Make sure you're logged in (should see profile button)
3. Try: `node scripts/setAdminUser.js your-email@example.com` again
4. Local storage might be corrupt - try clearing and logging in again

---

## 📋 Login Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ Step 1: Register Account                                    │
│ Email, Name, Password → Create User                         │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 2: Sign In                                             │
│ Email + Password → Login                                    │
│ → Stored in localStorage                                    │
│ → Profile button appears ✅                                 │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 3: Set Admin (Terminal)                                │
│ node scripts/setAdminUser.js your-email@example.com        │
│ → Sets isAdmin: true                                        │
│ → Sets authorized: true                                     │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 4: Refresh Browser (F5)                                │
│ → Reads updated user data                                   │
│ → Shows purple "⚙️ Admin Panel" button ✅                   │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 5: Click Admin Panel                                   │
│ → Enters Admin Dashboard 🎉                                 │
│ → Can manage users                                          │
│ → Can manage samples                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Verification Checklist

After following all steps, verify:

- [ ] You registered an account
- [ ] You can sign in with your email and password
- [ ] After login, you see your **profile button** on top right
- [ ] You ran the setup script (no errors)
- [ ] You refreshed the browser after running setup script
- [ ] You see the **purple "⚙️ Admin Panel"** button in navbar
- [ ] You can click the admin button and see the dashboard
- [ ] You see "Users Management" and "Sample Data Management" tabs

---

## 🔍 URL Shortcuts

After becoming admin, you can use these direct URLs:

| Action | URL |
|--------|-----|
| Home | `/` |
| Sign In | `/signin` |
| Sign Up | `/signup` |
| Admin Panel | `/admin` ← **Use this** |
| Fabrics | `/fabrics` |

---

## 💡 Tips

1. **Admin panel is private**: Only users with `isAdmin: true` can access
2. **Can't delete yourself**: You can't delete your own admin account
3. **Multiple admins possible**: You can make other users admins too
4. **Bulk upload**: Upload samples as JSON array
5. **User stats**: See real-time user statistics

---

## 📞 What to Do If Something Doesn't Work

1. **Check browser console** (F12) for error messages
2. **Verify you're not in an incognito/private window**
3. **Make sure cookies are enabled**
4. **Try a different browser** (Chrome, Firefox, Edge)
5. **Restart the development server** and try again
6. **Clear all localStorage**: 
   ```javascript
   localStorage.clear()
   ```
   Then log in again

---

## 🎬 Quick Video Summary (Steps)

1. Signup → 2. Signin → 3. Run: `node scripts/setAdminUser.js your-email@example.com` 
→ 4. Refresh → 5. Click purple Admin button → 6. Manage users/samples ✅

---

**You're all set!** 🚀 Follow the steps above and you'll be in the admin panel in less than 5 minutes!
