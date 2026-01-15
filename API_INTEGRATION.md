# 🔌 API Integration Guide

## Overview

The application is ready for backend integration. The Sign In and Sign Up components are pre-configured to communicate with your backend APIs.

## API Endpoints

### 1. Sign In Endpoint

**Endpoint**: `POST /api/login`

**Request**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Expected Response** (Success - 200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id_here",
    "name": "John Doe",
    "email": "user@example.com",
    "company": "Company Name"
  }
}
```

**Expected Response** (Error - 401):
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**Backend Implementation** (Example - Node.js/Express):
```javascript
// routes/auth.js
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
```

---

### 2. Sign Up Endpoint

**Endpoint**: `POST /api/register`

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "company": "Company Name"
}
```

**Expected Response** (Success - 201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "new_user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Company Name"
  }
}
```

**Expected Response** (Error - 400):
```json
{
  "success": false,
  "message": "Email already exists"
}
```

**Backend Implementation** (Example - Node.js/Express):
```javascript
// routes/auth.js
app.post('/api/register', async (req, res) => {
  const { name, email, password, company } = req.body;
  
  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      company,
      createdAt: new Date()
    });
    
    await newUser.save();
    
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        company: newUser.company
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
```

---

## Frontend Integration

### Current Implementation

The SignIn and SignUp components already have API integration:

**SignIn.jsx** (Relevant Code):
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      setError(data.message || 'Login failed');
      return;
    }
    
    // Store token
    localStorage.setItem('authToken', data.token);
    
    // Redirect
    router.push('/');
  } catch (err) {
    setError('An error occurred. Please try again.');
  }
};
```

**SignUp.jsx** (Relevant Code):
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validation
  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    return;
  }
  
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        company: formData.company,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      setError(data.message || 'Registration failed');
      return;
    }
    
    setSuccess('Account created! Redirecting...');
    setTimeout(() => router.push('/signin'), 2000);
  } catch (err) {
    setError('An error occurred. Please try again.');
  }
};
```

---

## Authentication Flow

### Sign In Flow
```
1. User enters email and password
2. Frontend sends POST /api/login
3. Backend verifies credentials
4. Backend returns JWT token
5. Frontend stores token in localStorage
6. Frontend redirects to home page
7. Subsequent requests include token in headers
```

### Sign Up Flow
```
1. User fills registration form
2. Frontend validates form
3. Frontend sends POST /api/register
4. Backend creates user in database
5. Backend returns success message
6. Frontend shows success message
7. Frontend redirects to sign in page
```

---

## Using the Authentication Token

### Store Token
```javascript
// After successful login
localStorage.setItem('authToken', token);
```

### Retrieve Token
```javascript
const token = localStorage.getItem('authToken');
```

### Use in API Requests
```javascript
const response = await fetch('/api/fabrics', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### Clear Token (Logout)
```javascript
localStorage.removeItem('authToken');
router.push('/signin');
```

---

## Environment Variables

Create `.env.local` in root directory:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
API_SECRET=your_secret_key_here
JWT_SECRET=your_jwt_secret_here

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database
POSTGRES_URL=postgresql://user:password@host:5432/database

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password

# Frontend
NEXT_PUBLIC_APP_NAME=YOGOTEX FABRICS
NEXT_PUBLIC_COMPANY_NAME=YOGOTEX FABRICS CO.LTD
```

---

## Security Considerations

### ⚠️ IMPORTANT

1. **Never store sensitive data in localStorage for production**
   - Use httpOnly cookies instead
   - Implement CSRF protection

2. **Always validate inputs server-side**
   - Frontend validation is for UX only
   - Backend must also validate

3. **Use HTTPS in production**
   - Encrypt all data in transit
   - Never send tokens over HTTP

4. **Hash passwords with bcrypt**
   - Use salt rounds ≥ 10
   - Example: `await bcrypt.hash(password, 10)`

5. **Implement rate limiting**
   - Prevent brute force attacks
   - Example: 5 attempts per minute per IP

6. **Use JWT with expiration**
   - Set reasonable expiration time
   - Example: 7 days for refresh tokens

---

## Example: Complete Backend Setup

### Using Node.js + Express + MongoDB

**Installation**:
```bash
npm install express mongoose bcryptjs jsonwebtoken cors dotenv
```

**Complete Auth Routes** (`routes/auth.js`):
```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Sign Up
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, company } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      company: company || '',
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign In
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
```

**Middleware for Protected Routes** (`middleware/auth.js`):
```javascript
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
```

---

## Testing APIs

### Using cURL

**Sign Up**:
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "company": "Company"
  }'
```

**Sign In**:
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Using Postman

1. Create new POST request
2. URL: `http://localhost:3000/api/login`
3. Body (raw JSON):
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
4. Click Send

---

## Troubleshooting

### Token Not Working
- Check token expiration
- Verify JWT_SECRET matches
- Ensure token format: `Bearer <token>`

### CORS Issues
- Add CORS middleware to backend
- Allow frontend domain in CORS settings

### API Not Found
- Verify route exists in backend
- Check API path in frontend code
- Ensure backend server is running

### Password Hashing Issues
- Use bcryptjs (not bcrypt)
- Ensure salt rounds ≥ 10
- Never store plain passwords

---

## Next Steps

1. ✅ Implement backend authentication endpoints
2. ✅ Test APIs with Postman
3. ✅ Connect frontend to backend
4. ✅ Implement token refresh logic
5. ✅ Add logout functionality
6. ✅ Implement password reset
7. ✅ Add email verification
8. ✅ Set up 2FA (optional)

---

**Created**: January 15, 2026
**Updated**: January 15, 2026
**Version**: 1.0.0
