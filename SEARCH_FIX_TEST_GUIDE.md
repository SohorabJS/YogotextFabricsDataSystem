# Quick Test Guide

## Testing the Fixed Search Feature

### Test 1: Search by Sample Code
**Steps:**
1. Navigate to `Fabrics > Regular`
2. Select "Sample Code" from dropdown
3. Enter a sample code (e.g., "SC001")
4. Click "Search"

**Expected Results:**
- ✅ Should show all samples with that code
- ✅ Result count should display (e.g., "Results (3)")
- ✅ No "Failed to fetch" error
- ✅ Each result shows in table (desktop) or card (mobile)

---

### Test 2: Search by Item Code
**Steps:**
1. Navigate to `Fabrics > Regular`
2. Select "Item Code" from dropdown
3. Enter an item code (e.g., "SIC001")
4. Click "Search"

**Expected Results:**
- ✅ Should show all samples with that item code
- ✅ All matching items appear
- ✅ Fields visible: Code, Item Code, Processing Type, Color, Customer

---

### Test 3: Search by Customer Name
**Steps:**
1. Navigate to `Fabrics > Regular`
2. Select "Customer Name" from dropdown
3. Enter a customer name (e.g., "Acme Corp")
4. Click "Search"

**Expected Results:**
- ✅ Should show all samples for that customer
- ✅ Case-insensitive (partial match works)
- ✅ All customer's samples appear

---

### Test 4: Multiple Results
**Steps:**
1. Search for a sample code that appears multiple times
2. Note the result count

**Expected Results:**
- ✅ ALL matching samples display (not just first one)
- ✅ Each sample is individually selectable
- ✅ Different samples with same code all visible

---

### Test 5: Checkboxes Work
**Steps:**
1. Search for results
2. Click checkbox next to first result
3. First result should highlight
4. Click "Select All" checkbox
5. All results should be selected

**Expected Results:**
- ✅ Individual checkboxes work
- ✅ Selected items highlight in blue
- ✅ "Select All" selects/deselects all
- ✅ Count of selected updates

---

### Test 6: Desktop Details View
**Steps:**
1. Search for results
2. On desktop, click "Details" button
3. Scroll down in expanded view

**Expected Results:**
- ✅ Should show 8 sections of data:
  - Basic Information
  - Customer Requirements
  - Sample Dates
  - Weaving Details
  - After Dryer
  - After Shrinkage
  - After Washing
  - Fabrics Process Flow

---

### Test 7: Mobile Card View
**Steps:**
1. Search for results
2. On mobile/tablet, view results as cards
3. Click "+" button to expand a card
4. See all details

**Expected Results:**
- ✅ Shows as cards (not table)
- ✅ Quick info visible by default
- ✅ All fields available when expanded
- ✅ Touch-friendly layout

---

### Test 8: No Results
**Steps:**
1. Search for a sample code that doesn't exist
2. Example: "NONEXISTENT123"

**Expected Results:**
- ✅ Error message: "No results found"
- ✅ No table/cards displayed
- ✅ Clear message about what went wrong

---

### Test 9: Empty Search
**Steps:**
1. Leave search field empty
2. Click "Search"

**Expected Results:**
- ✅ Error message: "Please enter a search query"
- ✅ No API call made
- ✅ Results cleared

---

### Test 10: Error Handling
**Steps:**
1. Disconnect from internet/database
2. Try to search
3. Reconnect
4. Search again

**Expected Results:**
- ✅ Should show appropriate error message
- ✅ Works again when connection restored
- ✅ No "Failed to fetch" generic errors

---

## Desktop (Large Screen - `lg:`) Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Search Form                                                  │
│ [Sample Code ▼] [Search query input...] [Search]            │
└─────────────────────────────────────────────────────────────┘

Results (3)                              [☐ Select All]

┌──┬─────────┬──────────┬────────────┬────────────────────────┐
│☑ │ Code    │ Item Cd  │ Type       │ Details                │
├──┼─────────┼──────────┼────────────┼────────────────────────┤
│☐ │ SC001   │ SIC001   │ Type A     │ [Details] [Hide]       │
├──┼─────────┼──────────┼────────────┼────────────────────────┤
│☐ │ SC001   │ SIC002   │ Type B     │ [Details]              │
├──┼─────────┼──────────┼────────────┼────────────────────────┤
│☐ │ SC001   │ SIC003   │ Type A     │ [Details]              │
└──┴─────────┴──────────┴────────────┴────────────────────────┘

[When [Details] clicked, show full details below]
┌──────────────────────────────────────────────────────────────┐
│ Full Details: SC001 - SIC001                                 │
├──────────────────────────────────────────────────────────────┤
│ BASIC INFORMATION                                            │
│ Sample Code: SC001          Processing Type: Type A          │
│ Item Code: SIC001           Construction: Cotton             │
│ Color: Blue                 Customer: Acme Corp              │
│                                                              │
│ CUSTOMER REQUIREMENTS                                        │
│ Width: 150cm                Length Tolerance: 5%            │
│ Width Tolerance: 3%         Weight Tolerance: 200g          │
│ [... more sections ...]                                     │
└──────────────────────────────────────────────────────────────┘
```

---

## Mobile (Small Screen - hidden on `lg:`) Layout

```
Search Form:
┌──────────────────────────────────────────┐
│ [Sample Code ▼] [Search query...]        │
│              [Search]                    │
└──────────────────────────────────────────┘

Results (3)                    [☐ Select All]

┌──────────────────────────────────┐
│ ☐ SC001                        + │  ← Quick info card
│ SIC001                           │
├──────────────────────────────────┤
│ Type: Type A                     │
│ Color: Blue                      │
│ Customer: Acme Corp              │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ ☐ SC001                        − │  ← Expanded card
│ SIC002                           │
├──────────────────────────────────┤
│ Type: Type B                     │
│ Color: Blue                      │
│ Customer: Acme Corp              │
├──────────────────────────────────┤
│ BASIC INFORMATION                │
│ Code: SC001                      │
│ Item: SIC002                     │
│ Type: Type B                     │
│ ... [all sections] ...           │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ ☐ SC001                        + │
│ SIC003                           │
├──────────────────────────────────┤
│ Type: Type A                     │
│ Color: Blue                      │
│ Customer: Acme Corp              │
└──────────────────────────────────┘
```

---

## Common Issues & Solutions

### "Failed to fetch" still appears?
**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Stop and restart dev server: `npm run dev`
3. Check browser console for detailed error (F12)
4. Verify MongoDB is connected

### Results not showing all samples with same code?
**Solution:**
1. Check backend updated searchBySampleCode() to use `find()` not `findOne()`
2. Verify regularSample.service.js has the updated code
3. Restart dev server

### Search dropdown doesn't have "Item Code"?
**Solution:**
1. Clear browser cache
2. Restart dev server
3. Verify SampleSearch.jsx has all 3 options

### Mobile view not responsive?
**Solution:**
1. Clear cache and hard refresh (Ctrl+Shift+R)
2. Check SampleResultsGrid.jsx has Tailwind responsive classes
3. Verify you're actually on mobile viewport (F12 → Toggle device toolbar)

### Dates showing wrong format?
**Solution:**
1. Check formatDate() function in SampleResultsGrid.jsx
2. Verify dates are stored as ISO strings in MongoDB
3. Convert if needed: `new Date(date).toLocaleDateString()`

---

## API Endpoints Reference

### Search by Sample Code
```
GET /api/SamplesData/regular?sampleCode=SC001
Response: { success: true, data: [...], count: 3, message: "..." }
```

### Search by Item Code
```
GET /api/SamplesData/regular?sampleItemCode=SIC001
Response: { success: true, data: [...], count: 2, message: "..." }
```

### Search by Customer
```
GET /api/SamplesData/regular?customerName=Acme
Response: { success: true, data: [...], count: 5, message: "..." }
```

### Get All Samples
```
GET /api/SamplesData/regular?page=1&limit=10
Response: { success: true, data: [...], pagination: {...}, message: "..." }
```

---

## Browser DevTools Debugging

### Check API Response
1. Open Browser DevTools (F12)
2. Go to Network tab
3. Perform a search
4. Find request to `/api/SamplesData/regular?...`
5. Click on it, view Response tab
6. Verify response format matches expected structure

### Check Console Errors
1. Open Console tab (F12)
2. Look for red errors
3. Common issues:
   - Missing SampleResultsGrid import
   - MongoDB connection errors
   - Invalid JSON response

### Check Variables
1. Open DevTools → Sources
2. In SampleSearch.jsx, set breakpoint in handleSearch
3. Step through and check:
   - params.toString() has correct format
   - data.success is true
   - data.data is array

---

## Success Indicators ✅

Your fix is working when you see:

1. ✅ Multiple samples with same code all appear
2. ✅ No "Failed to fetch" errors
3. ✅ Correct parameter names in network requests
4. ✅ Result count displays (Results (3))
5. ✅ Checkboxes functional
6. ✅ All 30+ fields visible when expanded
7. ✅ Responsive on mobile and desktop
8. ✅ Clear error messages
9. ✅ Proper date formatting
10. ✅ Empty values show as "—"
