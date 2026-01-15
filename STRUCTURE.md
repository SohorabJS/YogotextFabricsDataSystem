# YOGOTEX FABRICS - Web Application Architecture

## 📋 Project Structure

### Components (`/components`)
- **Navbar.jsx** - Top navigation bar with logo, company name, and Sign In/Sign Up buttons
- **Sidebar.jsx** - Left sidebar menu with navigation items
- **DashboardLayout.jsx** - Wrapper component that combines Navbar and Sidebar
- **SignIn.jsx** - Sign In page component with form and backend integration
- **SignUp.jsx** - Sign Up page component with form and backend integration

### Pages (`/app`)

#### Main Pages
- **page.jsx** (Home) - Dashboard home page with welcome section
- **signin/page.jsx** - Sign In page route
- **signup/page.jsx** - Sign Up page route

#### Dashboard Pages (with Sidebar Navigation)
- **fabrics/page.jsx** - Fabrics Management
- **operations/page.jsx** - Operation management
- **equipment/page.jsx** - Machine Tools & Equipment
- **about/page.jsx** - About Us
- **settings/page.jsx** - Settings
- **account/page.jsx** - Account management

## 🎨 UI Features

### Navbar
- ✅ Logo and company name (YOGOTEX FABRICS CO.LTD) on the left
- ✅ Sign In and Sign Up buttons on the right
- ✅ Mobile-responsive hamburger menu
- ✅ Sticky positioning

### Sidebar
- ✅ Left-aligned vertical menu
- ✅ 7 menu items: Home, Fabrics Management, Operation, Machine Tools & Equipment, About Us, Settings, Account
- ✅ Active page highlighting (blue background)
- ✅ Logout button at bottom
- ✅ Mobile slide-out panel
- ✅ Responsive design

### Authentication Pages
- ✅ Sign In page with email/password form
- ✅ Sign Up page with name/email/password/company fields
- ✅ Forgot password link
- ✅ "Remember me" checkbox
- ✅ Form validation
- ✅ Error/success messages
- ✅ Links between pages
- ✅ Google login button (placeholder for future implementation)

## 🔌 Backend Integration

### Sign In API
```
POST /api/login
Body: { email, password }
Returns: { token, user }
```

### Sign Up API
```
POST /api/register
Body: { name, email, password, company }
Returns: { success: true/false }
```

### Authentication
- Tokens stored in localStorage
- Auto-redirect after successful authentication
- Error handling for failed requests

## 🎯 Styling

- **Framework**: Tailwind CSS 4.1.18
- **Color Scheme**: Blue (#0066FF) primary color
- **Responsive**: Mobile-first design
- **Components**: Cards, buttons, forms with hover effects
- **Typography**: Clear hierarchy with semibold headings

## 🚀 How to Use

### Adding Content to Pages
1. Open any page file in `/app/{section}/page.jsx`
2. Replace the placeholder content inside the `<DashboardLayout>` component
3. Keep the layout structure for consistency

### Modifying Navigation
1. Edit `components/Sidebar.jsx`
2. Update the `menuItems` array to add/remove menu items
3. Changes reflect automatically across the app

### Styling Modifications
- Edit `app/globals.css` for global styles
- Use Tailwind classes in components
- Maintain responsive breakpoints (md: for tablet, lg: for desktop)

### Backend Connection
- Update `/api/login` route for sign-in functionality
- Update `/api/register` route for sign-up functionality
- Store auth token securely (currently in localStorage)

## 📱 Responsive Design

- **Mobile**: Full-screen sidebar (slide-out), hamburger menu
- **Tablet** (md: 768px): Sidebar visible, optimized spacing
- **Desktop** (lg: 1024px): Full layout with expanded sidebar

## 🔐 Security Considerations

- Implement password hashing (bcryptjs is already installed)
- Use JWT tokens (jsonwebtoken is already installed)
- Add HTTPS in production
- Implement CSRF protection
- Validate inputs server-side
- Use secure httpOnly cookies for tokens (current implementation uses localStorage for demo)

## 📦 Dependencies Used

```json
- next: ^16.0.3
- react: ^19.2.0
- tailwindcss: ^4.1.18
- bcryptjs: ^2.4.3 (for password hashing)
- jsonwebtoken: ^9.0.3 (for JWT tokens)
```

## 🎓 Next Steps

1. **Connect actual backend APIs** - Replace placeholder API calls with real endpoints
2. **Add user profile functionality** - Display logged-in user info
3. **Implement logout** - Clear token and redirect
4. **Add more pages** - Create content for each section
5. **Database integration** - Connect to MongoDB or PostgreSQL
6. **Add more features** - Search, filters, data tables, etc.

## 📝 File Locations

```
d:\FabricDataSystemApp\data-system\
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── DashboardLayout.jsx
│   ├── SignIn.jsx
│   └── SignUp.jsx
├── app/
│   ├── page.jsx (Home)
│   ├── layout.jsx
│   ├── globals.css
│   ├── signin/page.jsx
│   ├── signup/page.jsx
│   ├── fabrics/page.jsx
│   ├── operations/page.jsx
│   ├── equipment/page.jsx
│   ├── about/page.jsx
│   ├── settings/page.jsx
│   └── account/page.jsx
```

## ✨ Features Summary

✅ Professional UI with Tailwind CSS
✅ Responsive design (mobile, tablet, desktop)
✅ Organized component structure
✅ Modular and reusable components
✅ Sign In / Sign Up pages
✅ Authentication form validation
✅ Backend API integration ready
✅ Navigation menu with active state highlighting
✅ Placeholder pages for future content
✅ Mobile-friendly navigation
✅ Production-ready code

---

**Created**: January 15, 2026
**Company**: YOGOTEX FABRICS CO.LTD
**Version**: 1.0.0
