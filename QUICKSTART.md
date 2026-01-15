# 🚀 YOGOTEX FABRICS - Quick Start Guide

## Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📍 Page Routes

### Public Pages (without sidebar)
- **Home (Sign In)**: `http://localhost:3000/signin`
- **Home (Sign Up)**: `http://localhost:3000/signup`

### Dashboard Pages (with sidebar)
- **Home/Dashboard**: `http://localhost:3000/`
- **Fabrics Management**: `http://localhost:3000/fabrics`
- **Operations**: `http://localhost:3000/operations`
- **Machine Tools & Equipment**: `http://localhost:3000/equipment`
- **About Us**: `http://localhost:3000/about`
- **Settings**: `http://localhost:3000/settings`
- **Account**: `http://localhost:3000/account`

## 🎨 UI Components Breakdown

### Navbar Component (`components/Navbar.jsx`)
**Location**: Top of all pages (Sign In/Sign Up only)
**Features**:
- Logo with gradient background (YF initials)
- Company name: YOGOTEX FABRICS CO.LTD
- Sign In button (outline style)
- Sign Up button (filled blue)
- Mobile hamburger menu

**Usage**:
```jsx
<Navbar />
```

### Sidebar Component (`components/Sidebar.jsx`)
**Location**: Left side of dashboard pages
**Features**:
- Navigation menu with 7 items
- Active page highlighting
- Mobile slide-out panel
- Logout button at bottom
- Dark gray background (#1F2937)

**Menu Items**:
1. Home
2. Fabrics Management
3. Operation
4. Machine Tools & Equipment
5. About Us
6. Settings
7. Account

### DashboardLayout Component (`components/DashboardLayout.jsx`)
**Location**: Wraps all dashboard pages
**Features**:
- Combines Navbar + Sidebar
- Main content area with proper spacing
- Mobile-responsive
- Manages sidebar state

**Usage**:
```jsx
<DashboardLayout>
  {/* Your content here */}
</DashboardLayout>
```

## 🔐 Authentication

### Sign In Page Features
- Email input with validation
- Password input
- "Remember me" checkbox
- "Forgot password?" link
- Sign up link
- Error message display
- Loading state during submission

**API Endpoint**: `POST /api/login`
**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "token": "jwt_token_here",
  "user": { ... }
}
```

### Sign Up Page Features
- Full name input
- Email input with validation
- Company name (optional)
- Password input
- Confirm password input
- Terms & conditions checkbox
- Password confirmation validation
- Success message with redirect

**API Endpoint**: `POST /api/register`
**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "company": "Company Name"
}
```

## 🎨 Customization Guide

### Changing Colors
Edit `app/globals.css` and component files:
- Primary Blue: `#0066FF` or `bg-blue-600`
- Dark Gray: `#1F2937` or `bg-gray-900`
- Light Gray: `#F3F4F6` or `bg-gray-50`

### Adding New Menu Items
Edit `components/Sidebar.jsx`:
```jsx
const menuItems = [
  { name: 'Item Name', href: '/path' },
  // Add your new items here
];
```

### Modifying Company Information
1. Update company name in `components/Navbar.jsx`
2. Update logo colors and text
3. Update metadata in `app/layout.jsx`

### Adding Content to Pages
Open any page file like `app/fabrics/page.jsx`:
```jsx
<DashboardLayout>
  <div className="space-y-6">
    {/* Add your content here */}
  </div>
</DashboardLayout>
```

## 🔗 API Integration

### Environment Variables
Create `.env.local` in the root directory:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Making API Calls
The Sign In and Sign Up components already have examples:
```javascript
const response = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (md)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are mobile-first and responsive.

## 🗂️ Project Structure

```
components/
├── Navbar.jsx          (Top navigation)
├── Sidebar.jsx         (Left menu)
├── DashboardLayout.jsx (Layout wrapper)
├── SignIn.jsx          (Sign in form)
└── SignUp.jsx          (Sign up form)

app/
├── page.jsx            (Home/Dashboard)
├── layout.jsx          (Root layout)
├── globals.css         (Global styles)
├── signin/page.jsx     (Sign in page)
├── signup/page.jsx     (Sign up page)
├── fabrics/page.jsx    (Fabrics section)
├── operations/page.jsx (Operations section)
├── equipment/page.jsx  (Equipment section)
├── about/page.jsx      (About section)
├── settings/page.jsx   (Settings section)
├── account/page.jsx    (Account section)
└── api/                (Backend routes)
```

## ✨ Key Features

✅ **Modern UI**: Clean and professional design
✅ **Responsive**: Works on all devices
✅ **Modular**: Easy to maintain and extend
✅ **Authentication Ready**: Sign In/Sign Up pages
✅ **Organized Navigation**: Clear menu structure
✅ **Tailwind CSS**: Beautiful styling with utility classes
✅ **Next.js**: Server-side rendering and optimizations

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### Changes not reflecting?
1. Save the file
2. Clear browser cache (Ctrl+Shift+Delete)
3. Restart dev server

### API calls failing?
1. Check backend server is running
2. Verify API endpoint URLs
3. Check browser console for errors

## 📚 Documentation

See [STRUCTURE.md](./STRUCTURE.md) for detailed architecture documentation.

## 🚀 Next Steps

1. Connect actual backend APIs
2. Implement user authentication
3. Add database integration
4. Create content for each section
5. Add more features based on requirements

---

**Happy Coding! 🎉**
