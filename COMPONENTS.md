# 🎨 YOGOTEX FABRICS - Component Preview & Customization

## Component Overview

### 1. Navbar Component

**File**: `components/Navbar.jsx`

**Visual Layout**:
```
┌─────────────────────────────────────────────────────────┐
│ [YF LOGO] YOGOTEX FABRICS    [Sign In] [Sign Up]      │
│           CO.LTD                                         │
└─────────────────────────────────────────────────────────┘
```

**Features**:
- Logo box with gradient (blue-600 to blue-800)
- Company name and subtitle
- Right-aligned action buttons
- Mobile hamburger menu (hidden on desktop)

**Customization**:
```jsx
// Change logo text (currently "YF")
<div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 ...">
  YF  {/* Change this */}
</div>

// Change company name
<h1 className="text-xl font-bold text-gray-900">
  YOGOTEX FABRICS  {/* Change this */}
</h1>

// Change subtitle
<p className="text-xs text-gray-500">CO.LTD</p>  {/* Change this */}
```

---

### 2. Sidebar Component

**File**: `components/Sidebar.jsx`

**Visual Layout**:
```
┌──────────────────────┐
│ ► Home              │  ← Active (blue highlight)
│   Fabrics Mgmt      │
│   Operation         │
│   Machine Tools     │
│   About Us          │
│   Settings          │
│   Account           │
│                     │
│   [Logout Button]   │
└──────────────────────┘
```

**Features**:
- Vertical menu list
- Active page highlighting
- Icon support (can be added)
- Logout button at bottom
- Dark background (gray-900)
- Slide-out on mobile

**Customization**:

```jsx
// Add new menu items in Sidebar.jsx
const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Fabrics Management', href: '/fabrics' },
  // Add here:
  { name: 'New Section', href: '/new-section' },
];

// Change colors
// Current: bg-gray-900 (dark), text-white
// Use Tailwind classes to customize

// Add icons (example):
const icons = {
  'Home': '🏠',
  'Fabrics Management': '📦',
};
```

---

### 3. Dashboard Layout

**File**: `components/DashboardLayout.jsx`

**Visual Layout**:
```
┌──────────────────────────────────────┐
│         NAVBAR                        │
├──────────┬──────────────────────────┤
│          │                          │
│ SIDEBAR  │    MAIN CONTENT         │
│          │      (Page Content)     │
│          │                          │
│ (Dark)   │    (Light Gray Bg)      │
│          │                          │
└──────────┴──────────────────────────┘
```

**Features**:
- Sticky navbar at top
- Sidebar on left
- Main content area on right
- Responsive toggle for mobile
- Proper spacing and padding

**Usage**:
```jsx
<DashboardLayout>
  <div className="space-y-6">
    <h1>Page Title</h1>
    {/* Your content */}
  </div>
</DashboardLayout>
```

---

### 4. Sign In Page

**File**: `components/SignIn.jsx`

**Visual Layout**:
```
┌────────────────────────────────────────┐
│                                        │
│      ┌──────────────────────┐         │
│      │   [YF Logo Box]      │         │
│      │   Welcome Back       │         │
│      │ Sign in to account   │         │
│      │                      │         │
│      │ Email: [______]      │         │
│      │ Password: [______]   │         │
│      │                      │         │
│      │ ☐ Remember me  Forgot? │       │
│      │                      │         │
│      │  [Sign In Button]    │         │
│      │                      │         │
│      │ ─── or ───           │         │
│      │ [Google Button]      │         │
│      │                      │         │
│      │ Sign Up →            │         │
│      └──────────────────────┘         │
│                                        │
└────────────────────────────────────────┘
```

**Form Fields**:
- Email address (required)
- Password (required)
- Remember me (checkbox)
- Forgot password (link)

**Validation**:
- Email format checking
- Required field validation
- Password length recommendation
- Error message display
- Success redirect

**Customization**:
```jsx
// Change form fields
// Change validation rules
// Change API endpoint
// Change error messages
// Change redirect destination
```

---

### 5. Sign Up Page

**File**: `components/SignUp.jsx`

**Visual Layout**:
```
┌────────────────────────────────────────┐
│                                        │
│      ┌──────────────────────┐         │
│      │   [YF Logo Box]      │         │
│      │   Create Account     │         │
│      │ Join YOGOTEX today   │         │
│      │                      │         │
│      │ Full Name: [______]  │         │
│      │ Email: [______]      │         │
│      │ Company: [______]    │         │
│      │ Password: [______]   │         │
│      │ Confirm: [______]    │         │
│      │                      │         │
│      │ ☐ I agree to T&C     │         │
│      │                      │         │
│      │ [Create Account]     │         │
│      │                      │         │
│      │ Have account? Sign in│         │
│      └──────────────────────┘         │
│                                        │
└────────────────────────────────────────┘
```

**Form Fields**:
- Full Name (required)
- Email (required)
- Company (optional)
- Password (required)
- Confirm Password (required)
- Terms & Conditions (required)

**Validation**:
- All required fields checked
- Email format validation
- Password confirmation match
- Terms agreement required
- Error message display
- Success message with redirect

---

## 📐 Responsive Design

### Mobile View (< 768px)
```
┌─────────────┐
│    Navbar   │
├─────────────┤
│[☰] Content │  ← Hamburger for sidebar
│             │
│ Full Width  │
│  Content    │
│             │
└─────────────┘
```

### Tablet View (768px - 1024px)
```
┌──────────────────────┐
│     Navbar           │
├──────────┬───────────┤
│ Sidebar  │ Content   │
│ (fixed)  │ (scroll)  │
└──────────┴───────────┘
```

### Desktop View (> 1024px)
```
┌────────────────────────────────┐
│         Navbar (sticky)         │
├──────────────┬────────────────┤
│  Sidebar     │   Main Content │
│  (fixed)     │   (scrollable) │
│              │                │
│  Dark Gray   │  Light Gray Bg │
│  BG          │                │
└──────────────┴────────────────┘
```

---

## 🎨 Color Scheme

### Primary Colors
```
Blue:        #0066FF (rgb(0, 102, 255))
Dark Blue:   #003399 (darker shade)
Light Blue:  #F0F8FF (for backgrounds)
```

### Secondary Colors
```
Dark Gray:   #1F2937 (sidebar background)
Light Gray:  #F3F4F6 (page background)
Border Gray: #E5E7EB
Text Gray:   #4B5563
```

### Status Colors
```
Success:     #10B981 (Green)
Error:       #EF4444 (Red)
Warning:     #F59E0B (Amber)
Info:        #3B82F6 (Blue)
```

---

## 🔤 Typography

### Headings
```
H1: text-4xl font-bold       (Main title)
H2: text-3xl font-bold       (Page title)
H3: text-lg font-semibold    (Section title)
```

### Body Text
```
Regular:  text-base         (Default)
Small:    text-sm           (Labels, hints)
Tiny:     text-xs           (Metadata)
```

### Buttons
```
Large:    px-6 py-3         (Primary action)
Normal:   px-4 py-2         (Secondary action)
Small:    px-3 py-1         (Tertiary action)
```

---

## 🎯 Component Props & Customization

### Navbar Props
Currently no props - uses hard-coded values.
**To make it flexible**, add:
```jsx
function Navbar({ companyName, logoText, showMobileMenu = true }) {
  // Use props instead of hard-coded values
}
```

### Sidebar Props
```jsx
<Sidebar 
  isOpen={sidebarOpen}          // Boolean for mobile
  onClose={() => setSidebarOpen(false)}  // Callback
  menuItems={customMenuItems}   // Can pass custom items
/>
```

### DashboardLayout Props
```jsx
<DashboardLayout>
  {children}  // Your page content
</DashboardLayout>
```

---

## 🛠️ Common Customizations

### Change Logo Color
```jsx
// In Navbar.jsx
<div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 ...">
  {/* Gradient changed to red */}
</div>
```

### Change Sidebar Background
```jsx
// In Sidebar.jsx
<aside className="... bg-indigo-900 ...">  {/* Changed from bg-gray-900 */}
```

### Add Icons to Menu Items
```jsx
// In Sidebar.jsx
const menuItems = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'Fabrics Management', href: '/fabrics', icon: '📦' },
];

// Then render:
<span>{item.icon} {item.name}</span>
```

### Change Button Styles
```jsx
// Replace in SignIn/SignUp components:
// From: className="bg-blue-600 text-white"
// To:   className="bg-purple-600 text-white"
```

---

## 📋 Accessibility Features

✅ Semantic HTML tags
✅ Proper heading hierarchy (h1 → h2 → h3)
✅ Form labels with htmlFor attributes
✅ Input validation messages
✅ Focus states on interactive elements
✅ Sufficient color contrast
✅ Mobile-friendly touch targets (min 48px)

---

## 🚀 Performance Tips

1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Pages split automatically
3. **CSS**: Tailwind purges unused styles
4. **Caching**: Sidebar state managed with useState
5. **Lazy Loading**: Routes loaded on demand

---

**Last Updated**: January 15, 2026
**Version**: 1.0.0
