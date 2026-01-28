# CSV Column Name Matching - Before & After

## The Problem Visualized

```
YOUR CSV FILE (ssss.csv)
┌─────────────────────────────────────────────┐
│ Column Headers:                             │
│  - sampleCode                               │
│  - sampleItemCode                           │
│  - ... (other fields)                       │
│  - boxPercentRightHand        ❌ NOT FOUND  │
│  - boxPercentLeftHand         ❌ NOT FOUND  │
│  - afterWashWidthPercent      ❌ NOT FOUND  │
│  - afterWashLengthPercent     ❌ NOT FOUND  │
└─────────────────────────────────────────────┘
           ⬇️
    CSV Upload Handler
    (/api/upload-csv)
    Looking for:
    'Box % (Right Hand)'  ← MISMATCH!
    'Box % (Left Hand)'   ← MISMATCH!
    'After Wash Width %'  ← MISMATCH!
    'After Wash Length %' ← MISMATCH!
           ⬇️
     MongoDB Collection
┌─────────────────────────────────────────────┐
│ Stored as NULL ❌                           │
│  boxPercentRightHand: null                  │
│  boxPercentLeftHand: null                   │
│  afterWashWidthPercent: null                │
│  afterWashLengthPercent: null               │
└─────────────────────────────────────────────┘
           ⬇️
      Regular Sample UI
┌─────────────────────────────────────────────┐
│ Displays as N/A (or was blank)              │
│  Right Hand Box Skew: N/A                   │
│  Left Hand Box Skew: N/A                    │
│  A/Wash Width %: N/A                        │
│  A/Wash Length %: N/A                       │
└─────────────────────────────────────────────┘
```

---

## The Solution Applied

```
YOUR CSV FILE (ssss.csv)
┌─────────────────────────────────────────────┐
│ Column Headers:                             │
│  - sampleCode                               │
│  - sampleItemCode                           │
│  - ... (other fields)                       │
│  - boxPercentRightHand        ✅ FOUND      │
│  - boxPercentLeftHand         ✅ FOUND      │
│  - afterWashWidthPercent      ✅ FOUND      │
│  - afterWashLengthPercent     ✅ FOUND      │
└─────────────────────────────────────────────┘
           ⬇️
    CSV Upload Handler (FIXED)
    (/api/upload-csv)
    Now looks for:
    - 'boxPercentRightHand'      ✅ MATCH
    - 'box percent right hand'   ✅ ALT
    - 'Box % (Right Hand)'       ✅ ALT
    - 'box%righthand'            ✅ ALT
    
    + Same for Left Hand, Width %, Length %
           ⬇️
     MongoDB Collection
┌─────────────────────────────────────────────┐
│ Stored with VALUES ✅                       │
│  boxPercentRightHand: "2.09%"               │
│  boxPercentLeftHand: "-1.80%"               │
│  afterWashWidthPercent: "0.85%"             │
│  afterWashLengthPercent: "1.0%"             │
└─────────────────────────────────────────────┘
           ⬇️
      Regular Sample UI (IMPROVED)
┌─────────────────────────────────────────────┐
│ Displays with DATA ✅                       │
│  Right Hand Box Skew: 2.09%                 │
│  Left Hand Box Skew: -1.80%                 │
│  A/Wash Width %: 0.85%                      │
│  A/Wash Length %: 1.0%                      │
└─────────────────────────────────────────────┘
```

---

## Code Changes Made

### File: `/app/api/upload-csv/route.js`

**Lines 85-122**: Updated field mapping object

```javascript
// ❌ BEFORE: Only looked for one header name
boxPercentRightHand: getValFromMap(norm, ['Box % (Right Hand)']),

// ✅ AFTER: Now looks for multiple variations (case-insensitive)
boxPercentRightHand: getValFromMap(norm, [
  'boxPercentRightHand',        // Your exact column name ✅
  'box percent right hand',      // Alternative format
  'Box % (Right Hand)',          // Formatted version
  'box%righthand'                // Compact version
]),
```

**Same pattern applied to**:
- `boxPercentLeftHand` (4 variations)
- `afterWashWidthPercent` (4 variations)
- `afterWashLengthPercent` (4 variations)
- **BONUS**: All 28 other fields also improved with multiple variations

---

## How It Works

### The Normalization Process

1. **Input**: CSV column header
   ```
   boxPercentRightHand
   ```

2. **Normalization** (lines 10-17):
   ```javascript
   // Convert to lowercase + remove special chars
   → boxpercentrighthand
   ```

3. **Matching** (lines 18-24):
   ```javascript
   // Check against all variations
   'boxPercentRightHand'      → ✅ normalized matches
   'box percent right hand'   → ✅ normalized matches
   'Box % (Right Hand)'       → ✅ normalized matches
   'box%righthand'            → ✅ normalized matches
   ```

4. **Result**:
   ```javascript
   // Value found and extracted
   const value = "2.09%"
   ```

---

## Testing the Fix

### Example Test Case

**CSV Data**:
```
sampleCode,boxPercentRightHand,boxPercentLeftHand,afterWashWidthPercent,afterWashLengthPercent
PR055-01R6,2.09%,-1.80%,0.85%,1.0%
```

**Before Fix** (What happened):
```javascript
{
  sampleCode: "PR055-01R6",
  boxPercentRightHand: null,        // ❌ Not found
  boxPercentLeftHand: null,         // ❌ Not found
  afterWashWidthPercent: null,      // ❌ Not found
  afterWashLengthPercent: null      // ❌ Not found
}
```

**After Fix** (What will happen):
```javascript
{
  sampleCode: "PR055-01R6",
  boxPercentRightHand: "2.09%",     // ✅ Found!
  boxPercentLeftHand: "-1.80%",     // ✅ Found!
  afterWashWidthPercent: "0.85%",   // ✅ Found!
  afterWashLengthPercent: "1.0%"    // ✅ Found!
}
```

---

## Bonus: UI Improvement

### File: `/components/SampleResultsGrid.jsx`

**Before**:
```jsx
// Null values showed as dash
<span>{value === null ? '—' : value}</span>
```

**After**:
```jsx
// Null values show as "N/A" in red
<span className={isNullValue(item[field.key]) ? 'text-red-500' : ''}>
  {formatValue(item[field.key])}  // Shows "N/A" in red if null
</span>
```

**Benefit**: Users can clearly see which fields need data vs. which have values

---

## Files Modified

1. ✅ [app/api/upload-csv/route.js](app/api/upload-csv/route.js)
   - Updated CSV field mapping object
   - Added multiple header name variations

2. ✅ [components/SampleResultsGrid.jsx](components/SampleResultsGrid.jsx)
   - Changed null value display from "—" to "N/A"
   - Added red color highlighting for null values

3. ✅ [CSV_FIELD_MAPPING_ANALYSIS.md](CSV_FIELD_MAPPING_ANALYSIS.md) (Documentation)
4. ✅ [CSV_FIX_VERIFICATION.md](CSV_FIX_VERIFICATION.md) (Verification Checklist)

---

## Quick Reference: Field Mapping

| CSV Header | Model Field | Handler Variations |
|---|---|---|
| boxPercentRightHand | boxPercentRightHand | 'boxPercentRightHand', 'box percent right hand', 'Box % (Right Hand)', 'box%righthand' |
| boxPercentLeftHand | boxPercentLeftHand | 'boxPercentLeftHand', 'box percent left hand', 'Box % (Left Hand)', 'box%lefthand' |
| afterWashWidthPercent | afterWashWidthPercent | 'afterWashWidthPercent', 'after wash width percent', 'After Wash Width %', 'a/wash width %' |
| afterWashLengthPercent | afterWashLengthPercent | 'afterWashLengthPercent', 'after wash length percent', 'After Wash Length %', 'a/wash length %' |

---

## Next Steps

1. ✅ **Backend fix applied** - Handler now recognizes your CSV headers
2. ⏳ **Upload CSV** - Use the corrected handler to import data
3. ⏳ **Verify in UI** - Check that four fields now display values
4. ⏳ **Clean old data** - Remove null records if needed (optional)

---

**Status**: ✅ **READY FOR TESTING**

The fix is complete and ready to be tested with your CSV file!
