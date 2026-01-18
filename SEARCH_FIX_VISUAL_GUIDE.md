# 🎨 Regular Sample Search - Visual UI Guide

## Desktop Layout (Large Screen - `lg:`)

### Search Form
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Search Form:                                                   │
│  [Select Type ▼]     [Enter search query...]        [Search]   │
│                                                                 │
│  Options:                                                       │
│  • Sample Code      (finds all samples with code)              │
│  • Item Code        (finds all items with code) [NEW]          │
│  • Customer Name    (finds all customer samples)               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Results Table

```
Results (3)                                    ☐ Select All

┌────┬──────────┬──────────┬────────────┬────────────┬────────────────┐
│☑   │ Code     │ Item Cd  │ Type       │ Customer   │ Details        │
├────┼──────────┼──────────┼────────────┼────────────┼────────────────┤
│☐   │ SC001    │ SIC001   │ Type A     │ Acme Corp  │ [Details ▼]   │
├────┼──────────┼──────────┼────────────┼────────────┼────────────────┤
│☐   │ SC001    │ SIC002   │ Type B     │ Acme Corp  │ [Details]     │
├────┼──────────┼──────────┼────────────┼────────────┼────────────────┤
│☐   │ SC001    │ SIC003   │ Type A     │ Acme Corp  │ [Details]     │
└────┴──────────┴──────────┴────────────┴────────────┴────────────────┘

☑ = Selected
☐ = Not selected
```

### Expanded Details View (When [Details ▼] clicked)

```
┌──────────────────────────────────────────────────────────────────┐
│ Full Details: SC001 - SIC001                            [Hide ▲] │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ BASIC INFORMATION                                               │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ Sample Code        : SC001                                 │ │
│ │ Sample Item Code   : SIC001                                │ │
│ │ Processing Type    : Type A                                │ │
│ │ Construction       : Cotton Blend                          │ │
│ │ Color              : Blue                                  │ │
│ │ Customer Name      : Acme Corp                             │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ CUSTOMER REQUIREMENTS                                           │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ Required Width              : 150 cm                        │ │
│ │ Length Tolerance (%)        : 5%                           │ │
│ │ Width Tolerance (%)         : 3%                           │ │
│ │ Weight Tolerance            : 200g                         │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ SAMPLE DATES                                                    │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ Sample Issue Date           : Jan 15, 2026                 │ │
│ │ Sample Finishing Date       : Jan 18, 2026                 │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ WEAVING DETAILS                                                 │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ Loom                        : Loom A-5                     │ │
│ │ Wrapping No                 : WRP-2026-001                 │ │
│ │ Yards                       : 50 yards                     │ │
│ │ PPI                         : 72                           │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ AFTER DRYER                                                     │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ Dryer Width (inch)          : 148.5"                       │ │
│ │ Dryer Skew (cm)             : 1.2 cm                       │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ AFTER SHRINKAGE                                                 │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ A/Shrinkage PPI             : 74                           │ │
│ │ A/Shrinkage Skew (cm)       : 0.8 cm                       │ │
│ │ A/Shrinkage Width (inch)    : 147" or 148"                │ │
│ │ PPI(+)                      : +2                           │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ AFTER WASHING                                                   │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ A/Wash Skew (cm)            : 0.5 cm                       │ │
│ │ A/Wash Width (inch)         : 146" or 147"                │ │
│ │ A/Wash PPI                  : 75                           │ │
│ │ Left Hand Box Skew (%)      : 2%                           │ │
│ │ Right Hand Box Skew (%)     : 2%                           │ │
│ │ A/Wash Width (%)            : 98%                          │ │
│ │ A/Wash Length (%)           : 97%                          │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ FABRICS PROCESS FLOW                                            │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ Processing Details:                                        │ │
│ │ 1. Pre-wash inspection      ✓                              │ │
│ │ 2. Main wash cycle          ✓                              │ │
│ │ 3. Drying process           ✓                              │ │
│ │ 4. Final inspection         ✓ (Passed)                     │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Mobile Layout (Small Screen - hidden on `lg:`)

### Search Form
```
┌────────────────────────────────────┐
│                                    │
│ [Select Type ▼]                    │
│ [Search query input...]            │
│         [Search Button]            │
│                                    │
└────────────────────────────────────┘
```

### Results as Cards

```
Results (3)          ☐ Select All


┌──────────────────────────────────┐
│ ☑ SC001                       +  │  ← Expandable card
│   SIC001                         │
├──────────────────────────────────┤  ← Quick info (always visible)
│ Type: Type A                     │
│ Color: Blue                      │
│ Customer: Acme Corp              │
└──────────────────────────────────┘


┌──────────────────────────────────┐
│ ☐ SC001                       −  │  ← Expanded card
│   SIC002                         │
├──────────────────────────────────┤
│ Type: Type B                     │
│ Color: Blue                      │
│ Customer: Acme Corp              │
├──────────────────────────────────┤  ← Full details visible
│ BASIC INFORMATION                │
│ Code: SC001                      │
│ Item: SIC002                     │
│ Type: Type B                     │
│ Construction: Cotton Blend       │
│ Color: Blue                      │
│ Customer: Acme Corp              │
├──────────────────────────────────┤
│ CUSTOMER REQUIREMENTS             │
│ Width: 150 cm                    │
│ Length Tolerance: 5%             │
│ Width Tolerance: 3%              │
│ Weight Tolerance: 200g           │
├──────────────────────────────────┤
│ SAMPLE DATES                      │
│ Issue Date: Jan 15, 2026         │
│ Finish Date: Jan 18, 2026        │
├──────────────────────────────────┤
│ [More sections below...]          │
│                                  │
└──────────────────────────────────┘


┌──────────────────────────────────┐
│ ☐ SC001                       +  │
│   SIC003                         │
├──────────────────────────────────┤
│ Type: Type A                     │
│ Color: Blue                      │
│ Customer: Acme Corp              │
└──────────────────────────────────┘
```

---

## Color Scheme & States

### States
```
DEFAULT (Not Selected)
┌─────────────────────┐
│ Border: Gray        │
│ Background: White   │
│ Text: Dark          │
└─────────────────────┘

SELECTED (Checked)
┌─────────────────────┐
│ Border: Blue (#3B82F6)
│ Background: Light Blue (#EFF6FF)
│ Text: Dark (bold)   │
└─────────────────────┘

HOVER (Desktop)
┌─────────────────────┐
│ Background: Light Gray
│ Cursor: Pointer     │
│ Slight elevation    │
└─────────────────────┘

EXPANDED
┌─────────────────────┐
│ Border: Thick Blue  │
│ Background: Blue-50 │
│ Shadow: Subtle      │
└─────────────────────┘
```

### Colors Used
```
Primary Blue        #3B82F6 (Actions, highlights)
Light Blue          #EFF6FF (Selected items bg)
Border Gray         #D1D5DB (Separator)
Text Dark           #1F2937 (Primary text)
Text Light          #6B7280 (Secondary text)
Background          #FFFFFF (Cards, table)
Background Light    #F9FAFB (Headers)
Error Red           #DC2626 (Error messages)
Success Green       #16A34A (Success messages)
```

---

## Interactive Elements

### Checkboxes
```
☐ Unchecked      ☑ Checked (selected)

Desktop Size: 16px × 16px
Mobile Size: 20px × 20px
Cursor: pointer (clickable)
State: Highlight parent row/card on select
```

### Buttons
```
[Search]          - Primary action (blue background)
[Details]         - Secondary (text link, blue)
[Select All]      - Checkbox + Label
[+]/[−]           - Expand/Collapse (mobile cards)
```

### Input Fields
```
[Search Type ▼]   - Dropdown with 3 options
[Search query]    - Text input, auto-focus

Focus state: Light blue border
Hover state: Light gray background
Placeholder: "Search by..."
```

---

## Table Structure (Desktop)

```
┌────┬─────────┬──────────┬──────────┬────────────┬────────┬─────────┬────────┬────────┬────────────┐
│    │ Code    │ Item Cd  │ Type     │ Constr.    │ Color  │Customer │ Issue  │ Finish │ Action     │
├────┼─────────┼──────────┼──────────┼────────────┼────────┼─────────┼────────┼────────┼────────────┤
│☐   │ SC001   │ SIC001   │ Type A   │ Cotton     │ Blue   │ Acme    │Jan 15  │ Jan 18 │ [Details]  │
├────┼─────────┼──────────┼──────────┼────────────┼────────┼─────────┼────────┼────────┼────────────┤
│☐   │ SC001   │ SIC002   │ Type B   │ Cotton Bl  │ Blue   │ Acme    │Jan 15  │ Jan 18 │ [Details]  │
├────┼─────────┼──────────┼──────────┼────────────┼────────┼─────────┼────────┼────────┼────────────┤
│☐   │ SC001   │ SIC003   │ Type A   │ Cotton     │ Green  │ Acme    │Jan 15  │ Jan 18 │ [Details]  │
└────┴─────────┴──────────┴──────────┴────────────┴────────┴─────────┴────────┴────────┴────────────┘

Column Widths (approximate):
Checkbox:  5%
Code:      12%
Item Cd:   12%
Type:      12%
Constr.:   13%
Color:     8%
Customer:  13%
Issue:     10%
Finish:    10%
Action:    5%
```

---

## Card Structure (Mobile)

```
COLLAPSED CARD:
┌──────────────────────────────────────────┐
│ ☑ SC001 [Sample Code in bold]         +  │  Height: 80px
│ SIC001 [Item Code in gray]               │
├──────────────────────────────────────────┤
│ Type: Type A                             │  Gray background
│ Color: Blue                              │  Smaller font
│ Customer: Acme Corp                      │  3 items max
└──────────────────────────────────────────┘

EXPANDED CARD:
┌──────────────────────────────────────────┐
│ ☑ SC001 [Sample Code]                −   │  Header
│ SIC001 [Item Code]                       │
├──────────────────────────────────────────┤
│ Type: Type A          Color: Blue        │  Quick Info (2 cols)
│ Customer: Acme Corp                      │
├──────────────────────────────────────────┤
│ BASIC INFORMATION                        │  Section Title
│ Code: SC001                              │  Content
│ Item: SIC001                             │  1 column layout
│ Type: Type A                             │
│ Construction: Cotton                     │
│ Color: Blue                              │
│ Customer: Acme Corp                      │
├──────────────────────────────────────────┤
│ CUSTOMER REQUIREMENTS                    │
│ Width: 150 cm                            │
│ Length %: 5%                             │
│ Width %: 3%                              │
│ Weight: 200g                             │
├──────────────────────────────────────────┤
│ [More sections...]                       │
└──────────────────────────────────────────┘

Width: 100% (full screen on mobile)
Max-width: Responsive (no fixed limit)
Padding: 1rem (16px)
Margin bottom: 1rem (spacing between cards)
```

---

## Responsive Breakpoints

```
Mobile (< 768px)      - Card layout, single column
Tablet (768px-1024px) - Card layout, optimized spacing
Desktop (≥ 1024px)    - Table layout, full details view

Switch point: Tailwind lg: breakpoint (1024px)
```

---

## Data Display Sections

### 1. Basic Information (Header Section)
```
┌─────────────────────────────────────────┐
│ Sample Code    : SC001                  │
│ Item Code      : SIC001                 │
│ Type           : Type A                 │
│ Construction   : Cotton Blend           │
│ Color          : Blue                   │
│ Customer       : Acme Corp              │
└─────────────────────────────────────────┘
```

### 2. Requirements
```
┌─────────────────────────────────────────┐
│ Width          : 150 cm                 │
│ Length %       : 5%                     │
│ Width %        : 3%                     │
│ Weight         : 200g                   │
└─────────────────────────────────────────┘
```

### 3-8. Other Sections
(Similar format, organized data)

---

## Empty State & Errors

### No Results
```
┌─────────────────────────────────────────┐
│                                         │
│  ❌ No results found                    │
│                                         │
│  Try searching with different keywords  │
│                                         │
└─────────────────────────────────────────┘
```

### Error Message
```
┌─────────────────────────────────────────┐
│ ❌ Error: Connection failed             │
│                                         │
│    Server error when fetching data      │
│    Please try again later               │
└─────────────────────────────────────────┘
```

### Empty Search
```
┌─────────────────────────────────────────┐
│                                         │
│  Enter a search query and click Search  │
│  to view results                        │
│                                         │
└─────────────────────────────────────────┘
```

---

## Success States

### Results Found
```
Results (3)          ☐ Select All

✅ Show count
✅ Show checkbox
✅ Display all results
✅ Ready for interaction
```

### Items Selected
```
Results (3)          ☐ Select All (Shows: 2/3 selected)

Selected items:
☑ SC001 | SIC001  ← Blue highlight
☑ SC001 | SIC002  ← Blue highlight
☐ SC001 | SIC003  ← Normal
```

---

## Animation & Transitions

```
Expand/Collapse       : 200ms ease-in-out
Checkbox checked      : 100ms fade
Hover effects         : 150ms transition
Error message fade-in : 300ms
Button press          : 50ms active state
```

---

## Accessibility Features

```
✅ Semantic HTML (table, form, buttons)
✅ ARIA labels on checkboxes
✅ Keyboard navigation (Tab, Enter)
✅ Color contrast (WCAG AA)
✅ Focus indicators (visible on all interactive elements)
✅ Touch targets ≥ 44×44px on mobile
✅ Clear error messages
✅ Logical tab order
✅ Form labels associated with inputs
```

---

This visual guide covers the complete UI design for the regular sample search feature across all screen sizes and states.
