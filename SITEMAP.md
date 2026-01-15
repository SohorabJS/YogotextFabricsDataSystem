# 🗺️ YOGOTEX FABRICS - Site Map & Navigation Flow

## Application Structure Overview

```
YOGOTEX FABRICS
│
├── PUBLIC AREA (No Authentication)
│   ├── Sign In Page (/signin)
│   │   └── Sign Up Link
│   │   └── Forgot Password Link
│   │   └── [Sign In Form]
│   │       ├── Email Input
│   │       ├── Password Input
│   │       ├── Remember Me Checkbox
│   │       └── Sign In Button → Dashboard
│   │
│   └── Sign Up Page (/signup)
│       └── Sign In Link
│       └── [Sign Up Form]
│           ├── Full Name Input
│           ├── Email Input
│           ├── Company Input
│           ├── Password Input
│           ├── Confirm Password Input
│           ├── Terms & Conditions
│           └── Sign Up Button → Sign In Page
│
└── AUTHENTICATED AREA (Dashboard)
    │
    ├── [NAVBAR]
    │   ├── Logo (YF)
    │   ├── Company Name
    │   ├── Sign In Button (visible when not authenticated)
    │   └── Sign Up Button (visible when not authenticated)
    │
    ├── [SIDEBAR]
    │   ├── 🏠 Home (/) [ACTIVE]
    │   ├── 📦 Fabrics Management (/fabrics)
    │   ├── ⚙️  Operation (/operations)
    │   ├── 🔧 Machine Tools & Equipment (/equipment)
    │   ├── ℹ️  About Us (/about)
    │   ├── ⚙️  Settings (/settings)
    │   ├── 👤 Account (/account)
    │   └── [Logout Button]
    │
    ├── HOME PAGE (/) - DEFAULT
    │   ├── Welcome Section (Gradient Banner)
    │   ├── Dashboard Grid (3 Cards)
    │   │   ├── Fabrics Card
    │   │   ├── Operations Card
    │   │   └── Equipment Card
    │   └── Content Placeholder
    │
    ├── FABRICS MANAGEMENT (/fabrics)
    │   ├── Page Title
    │   ├── Subtitle
    │   └── Content Placeholder
    │
    ├── OPERATION (/operations)
    │   ├── Page Title
    │   ├── Subtitle
    │   └── Content Placeholder
    │
    ├── MACHINE TOOLS & EQUIPMENT (/equipment)
    │   ├── Page Title
    │   ├── Subtitle
    │   └── Content Placeholder
    │
    ├── ABOUT US (/about)
    │   ├── Page Title
    │   ├── Subtitle
    │   └── Content Placeholder
    │
    ├── SETTINGS (/settings)
    │   ├── Page Title
    │   ├── Subtitle
    │   └── Content Placeholder
    │
    └── ACCOUNT (/account)
        ├── Page Title
        ├── Subtitle
        └── Content Placeholder
```

---

## Navigation Flow Diagram

### User Journey - Sign Up Path
```
┌─────────────┐
│ Sign Up Pg  │
└──────┬──────┘
       │
       │ Fill Form
       │ (name, email, password, company)
       │
       ▼
┌─────────────────────┐
│ Validate Form       │
│ - Password match?   │
│ - Terms agreed?     │
└──────┬──────────────┘
       │
       ├─ ✅ Valid ──────────┐
       │                     │
       └─ ❌ Invalid ────┐   │
                        │   │
                        ▼   │
                   Show Error│
                             │
                             ▼
              ┌──────────────────────┐
              │ POST /api/register   │
              └──────┬───────────────┘
                     │
                     ├─ ✅ Success ────────┐
                     │                     │
                     └─ ❌ Error ───────┐  │
                                       │  │
                                       ▼  │
                                   Show  │
                                   Error │
                                        │
                                        ▼
                          ┌──────────────────────┐
                          │ Redirect to Sign In  │
                          │ After 2 seconds      │
                          └──────────────────────┘
```

### User Journey - Sign In Path
```
┌─────────────┐
│ Sign In Pg  │
└──────┬──────┘
       │
       │ Fill Form
       │ (email, password)
       │
       ▼
┌──────────────────────┐
│ Validate Form        │
│ - Email format?      │
│ - Password present?  │
└──────┬───────────────┘
       │
       ├─ ✅ Valid ────────────┐
       │                       │
       └─ ❌ Invalid ───────┐  │
                           │  │
                           ▼  │
                      Show Error
                               │
                               ▼
                ┌────────────────────────┐
                │ POST /api/login        │
                └────────┬───────────────┘
                         │
                         ├─ ✅ Success ─────┐
                         │                  │
                         └─ ❌ Error ──┐   │
                                      │   │
                                      ▼   │
                                  Show   │
                                  Error  │
                                        │
                                        ▼
                              ┌─────────────────┐
                              │ Store Token     │
                              │ localStorage    │
                              └────────┬────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │ Redirect to     │
                              │ Dashboard (/)   │
                              └─────────────────┘
```

### User Journey - Dashboard Navigation
```
┌──────────────┐
│ Authenticated│
│   User       │
└──────┬───────┘
       │
       │ Clicks Menu Item in Sidebar
       │
       ├─ Home (/)
       ├─ Fabrics (/fabrics)
       ├─ Operations (/operations)
       ├─ Equipment (/equipment)
       ├─ About (/about)
       ├─ Settings (/settings)
       ├─ Account (/account)
       │
       ▼
┌──────────────────┐
│ Page Load        │
│ with Sidebar &   │
│ Navbar           │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Active Menu Item │
│ Highlighted      │
│ (Blue BG)        │
└──────────────────┘
```

---

## Responsive Layout Breakpoints

### Mobile Layout (< 768px)
```
┌─────────────────┐
│   NAVBAR        │
├─────────────────┤
│ [☰] CONTENT     │ ← Hamburger menu
│                 │
│   SIDEBAR       │ ← Hidden, toggles with ☰
│   (Overlay)     │
│                 │
│ Full Width      │
└─────────────────┘
```

### Tablet Layout (768px - 1024px)
```
┌──────────────────────────┐
│      NAVBAR              │
├──────────┬───────────────┤
│          │               │
│ SIDEBAR  │   CONTENT    │
│ (Fixed)  │   (Scroll)   │
│          │               │
└──────────┴───────────────┘
```

### Desktop Layout (> 1024px)
```
┌────────────────────────────────────┐
│         NAVBAR (Sticky)             │
├─────────────┬──────────────────────┤
│             │                      │
│  SIDEBAR    │    MAIN CONTENT     │
│  (Fixed)    │    (Scrollable)     │
│             │                      │
│ Dark Gray   │   Light Gray Bg     │
│ BG          │                      │
└─────────────┴──────────────────────┘
```

---

## Component Hierarchy

```
RootLayout
│
├── (Public Routes)
│   ├── signin/page.jsx
│   │   └── SignIn Component
│   │       ├── Logo Section
│   │       ├── Form Section
│   │       │   ├── Email Input
│   │       │   ├── Password Input
│   │       │   └── Submit Button
│   │       └── Links Section
│   │
│   └── signup/page.jsx
│       └── SignUp Component
│           ├── Logo Section
│           ├── Form Section
│           │   ├── Name Input
│           │   ├── Email Input
│           │   ├── Company Input
│           │   ├── Password Input
│           │   ├── Confirm Password
│           │   └── Submit Button
│           └── Links Section
│
└── (Dashboard Routes)
    └── DashboardLayout Component
        │
        ├── Navbar Component
        │   ├── Logo Section
        │   ├── Company Name
        │   └── Auth Buttons (Conditional)
        │
        ├── Sidebar Component
        │   ├── Menu Items
        │   └── Logout Button
        │
        └── Main Content Area
            │
            ├── home (/)
            ├── fabrics (/fabrics)
            ├── operations (/operations)
            ├── equipment (/equipment)
            ├── about (/about)
            ├── settings (/settings)
            └── account (/account)
```

---

## State Management Flow

### Authentication State
```
┌──────────────────┐
│ No Auth Token    │
│ (Not Logged In)  │
└────────┬─────────┘
         │
         ├─ Can Access: /signin, /signup
         └─ Cannot Access: Dashboard pages (redirect to signin)
         
         │
         │ User Submits Login Form
         │
         ▼
┌──────────────────────────┐
│ POST /api/login          │
│ Server Returns Token     │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Store Token in           │
│ localStorage             │
│ authToken = 'jwt...'     │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Auth Token Present       │
│ (Logged In)              │
└────────┬─────────────────┘
         │
         ├─ Can Access: All pages
         ├─ Navbar shows user menu
         └─ Sidebar shows logout
         
         │
         │ User Clicks Logout
         │
         ▼
┌──────────────────────────┐
│ Clear localStorage       │
│ Remove authToken         │
└────────┬─────────────────┘
         │
         ▼ (Back to Not Logged In)
```

### Form State Management
```
┌─────────────────┐
│ Form Empty      │
│ (Initial State) │
└────────┬────────┘
         │
         │ User Types in Input
         │
         ▼
┌─────────────────┐
│ Form Dirty      │
│ (Values Changed)│
└────────┬────────┘
         │
         │ User Submits Form
         │
         ▼
┌─────────────────┐
│ Form Loading    │
│ (API Call)      │
└────────┬────────┘
         │
         ├─ ✅ Success ──┐
         │              │
         └─ ❌ Error ──┐ │
                      │ │
                      ▼ ▼
             Form with Error/Success
             Message (Reset form)
```

---

## Data Flow for Sign In

```
User Input
    │
    ├─ email: "user@example.com"
    └─ password: "password123"
    │
    ▼
Form Validation
    │
    ├─ Email format valid?
    ├─ Password non-empty?
    │
    ▼
API Request
    │
    POST /api/login
    {
      "email": "user@example.com",
      "password": "password123"
    }
    │
    ▼
Backend Processing
    │
    ├─ Find user by email
    ├─ Verify password hash
    ├─ Generate JWT token
    │
    ▼
API Response
    │
    {
      "success": true,
      "token": "eyJhbGci...",
      "user": {
        "id": "123",
        "name": "User",
        "email": "user@example.com"
      }
    }
    │
    ▼
Store Token
    │
    localStorage.setItem("authToken", token)
    │
    ▼
Redirect
    │
    router.push("/")
    │
    ▼
Dashboard Loaded
    │
    With user context
```

---

## URL Structure

```
Domain: http://localhost:3000

Public Routes:
├── /signin                 Sign In Page
└── /signup                 Sign Up Page

Dashboard Routes:
├── /                       Home/Dashboard
├── /fabrics                Fabrics Management
├── /operations             Operations
├── /equipment              Machine Tools & Equipment
├── /about                  About Us
├── /settings               Settings
└── /account                Account

API Routes:
├── /api/login              Login endpoint
├── /api/register           Registration endpoint
├── /api/logout             Logout endpoint (future)
├── /api/me                 Get current user (future)
└── /api/user/:id           Update user (future)
```

---

## Error Handling Flow

```
User Action
    │
    ▼
Form/API Call
    │
    ├─ ✅ Success ──────────┐
    │                       │
    └─ ❌ Error ────┐       │
                   │       │
                   ▼       │
            Error Message   │
            Display ❌      │
                   │       │
                   │       ▼
                   │   Success Action
                   │   (Redirect, etc)
                   │
                   ▼
            User Sees Error
            Can Retry Action
```

---

## Mobile Menu Toggle Flow

```
┌─────────────┐
│ Desktop     │
│ Sidebar     │
│ Always Shown│
└─────────────┘

┌─────────────┐
│ Tablet/     │
│ Mobile      │
│ Hamburger ☰ │
└────────┬────┘
         │
         │ Click Hamburger
         │
         ▼
┌─────────────┐
│ Sidebar     │
│ Slides In   │
│ (Overlay)   │
└────────┬────┘
         │
         │ Click Menu Item / Close Button
         │
         ▼
┌─────────────┐
│ Sidebar     │
│ Slides Out  │
└─────────────┘
```

---

## Page Transition Flow

```
Current Page
    │
    │ User Clicks Menu Item
    │
    ▼
Sidebar Updates Active State
    │ (Current item gets blue background)
    │
    ▼
Route Changes
    │
    ▼
New Page Loads
    │
    ├─ DashboardLayout renders
    ├─ Navbar renders
    ├─ Sidebar renders with updated active
    └─ Content renders
    │
    ▼
Page Fully Loaded
    │
    ▼
Sidebar Active Item Shows Blue Highlight
```

---

## Complete User Session Flow

```
START: User visits /signin
       │
       │ User enters credentials
       │
       ▼
AUTHENTICATION: POST /api/login
       │
       │ ✅ Success: Token received
       │
       ▼
TOKEN STORAGE: localStorage.setItem("authToken", token)
       │
       │ Redirect to /
       │
       ▼
DASHBOARD LOADED:
       │
       ├─ Navbar displayed
       │
       ├─ Sidebar displayed with menu items
       │   ├─ Home (Active)
       │   ├─ Fabrics Management
       │   ├─ Operations
       │   ├─ Equipment
       │   ├─ About Us
       │   ├─ Settings
       │   └─ Account
       │
       └─ Content Area displayed
       │
       ▼
USER NAVIGATION:
       │
       ├─ Click "Fabrics Management"
       │   └─ Route changes to /fabrics
       │       └─ Sidebar highlights "Fabrics Management"
       │
       ├─ Click "Settings"
       │   └─ Route changes to /settings
       │       └─ Sidebar highlights "Settings"
       │
       └─ ... Continue navigating
       │
       ▼
LOGOUT:
       │
       ├─ Click Logout button in Sidebar
       │   │
       │   ├─ Clear localStorage
       │   │
       │   └─ Redirect to /signin
       │
       ▼
END: Back at Sign In page
```

---

**Document Created**: January 15, 2026
**Version**: 1.0.0
**Project**: YOGOTEX FABRICS Fabric Data System
