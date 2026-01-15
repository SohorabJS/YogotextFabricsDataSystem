# 📐 YOGOTEX FABRICS - Visual Mockup & Design Reference

## Navbar Component Mockup

```
╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║  ┌────────────────────────────────────────────────────────┐       ║
║  │ ╔═══════╗  YOGOTEX FABRICS        [Sign In] [Sign Up]  │       ║
║  │ ║ YF   ║  CO.LTD                                       │       ║
║  │ ╚═══════╝  (blue gradient box)                         │       ║
║  └────────────────────────────────────────────────────────┘       ║
║                                                                    ║
║  Height: ~80px                                                     ║
║  Background: White (#FFFFFF)                                       ║
║  Border-bottom: 1px light gray                                     ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

### Navbar Elements Breakdown

**Logo Box**
```
╔══════════════╗
║              ║
║     YF       ║  Size: 48px × 48px
║              ║  Background: Linear gradient (blue-600 → blue-800)
║              ║  Color: White text
║              ║  Border-radius: 8px
║              ║
╚══════════════╝
```

**Buttons**
```
┌──────────────────────────┐     ┌──────────────────────────┐
│       Sign In            │     │     Sign Up              │
│   (Outline Style)        │     │   (Filled Blue)          │
│ Border: 2px blue         │     │ Background: Blue (#0066) │
│ Text: Blue               │     │ Text: White              │
│ Padding: 24px × 8px      │     │ Padding: 24px × 8px      │
│ Border-radius: 8px       │     │ Border-radius: 8px       │
│                          │     │                          │
│ On Hover:                │     │ On Hover:                │
│ Background: Light blue   │     │ Background: Dark blue    │
└──────────────────────────┘     └──────────────────────────┘
```

---

## Sidebar Component Mockup

```
╔═════════════════════════╗
║                         ║
║  HOME                   ║  ← Active (Blue background)
║  ┌───────────────────┐  ║
║  │ 🏠 Home           │  ║  Font: Bold, Blue background
║  └───────────────────┘  ║
║                         ║
║  MENU ITEMS             ║
║  ┌───────────────────┐  ║
║  │ 📦 Fabrics Mgmt   │  ║  Hover: Dark gray background
║  ├───────────────────┤  ║  Text: Light gray
║  │ ⚙️ Operation      │  ║
║  ├───────────────────┤  ║  Font-size: 14px
║  │ 🔧 Machine Tools  │  ║  Padding: 12px 16px
║  ├───────────────────┤  ║
║  │ ℹ️ About Us       │  ║  Rounded: 8px
║  ├───────────────────┤  ║
║  │ ⚙️ Settings       │  ║
║  ├───────────────────┤  ║
║  │ 👤 Account       │  ║
║  └───────────────────┘  ║
║                         ║
║ ┌─────────────────────┐ ║
║ │                     │ ║
║ │  [Logout Button]    │ ║  Red button
║ │                     │ ║  Position: Bottom
║ └─────────────────────┘ ║
║                         ║
╚═════════════════════════╝

Width: 256px (on desktop)
Background: Dark Gray (#1F2937)
Color: White text
Border-right: 1px gray
Responsive: Slides in on mobile
```

### Sidebar Active Item

```
┌─────────────────────────┐
│ 🏠 Home                 │
└─────────────────────────┘
 ↓ (When Active)
┌─────────────────────────┐
│ 🏠 Home                 │  Background: Blue (#0066FF)
└─────────────────────────┘  Text: White, Bold
                              Border-left: 4px blue
```

---

## Sign In Page Mockup

```
╔════════════════════════════════════════════════════════════════╗
║                    SIGN IN PAGE                               ║
║                                                                ║
║                                                                ║
║           ┌────────────────────────────────────┐              ║
║           │                                    │              ║
║           │     ╔════════════════════╗         │              ║
║           │     ║                    ║         │              ║
║           │     ║        YF          ║         │   Card       ║
║           │     ║                    ║         │   Background ║
║           │     ╚════════════════════╝         │   White      ║
║           │                                    │   Shadow     ║
║           │     Welcome Back                  │   Border-    ║
║           │     Sign in to account            │   radius: 8px║
║           │                                    │              ║
║           │     ┌──────────────────────────┐   │              ║
║           │     │ Email Address            │   │              ║
║           │     │ [____________________]   │   │              ║
║           │     └──────────────────────────┘   │              ║
║           │                                    │              ║
║           │     ┌──────────────────────────┐   │              ║
║           │     │ Password                 │   │              ║
║           │     │ [____________________]   │   │              ║
║           │     └──────────────────────────┘   │              ║
║           │                                    │              ║
║           │     ☐ Remember me    Forgot?      │              ║
║           │                                    │              ║
║           │     ┌──────────────────────────┐   │              ║
║           │     │   [Sign In Button]       │   │              ║
║           │     │   (Blue, Full Width)     │   │              ║
║           │     └──────────────────────────┘   │              ║
║           │                                    │              ║
║           │     ──────── or ─────────         │              ║
║           │                                    │              ║
║           │     ┌──────────────────────────┐   │              ║
║           │     │     Google Sign In       │   │              ║
║           │     └──────────────────────────┘   │              ║
║           │                                    │              ║
║           │     Don't have account?            │              ║
║           │     Sign Up →                      │              ║
║           │                                    │              ║
║           └────────────────────────────────────┘              ║
║                                                                ║
║  Background: Gradient (light blue → indigo)                   ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

### Form Input States

```
NORMAL STATE:
┌─────────────────────────────────┐
│ Email Address                   │
│ [_______________________]       │
└─────────────────────────────────┘

FOCUS STATE:
┌─────────────────────────────────┐
│ Email Address                   │
│ [_______________________]       │  Border: 2px blue
│                                 │  Box-shadow: Blue glow
└─────────────────────────────────┘

ERROR STATE:
┌─────────────────────────────────┐
│ Email Address                   │
│ [_______________________]       │  Border: 2px red
│ ❌ Invalid email format         │  Text: Red
└─────────────────────────────────┘
```

---

## Sign Up Page Mockup

```
╔════════════════════════════════════════════════════════════════╗
║                    SIGN UP PAGE                               ║
║                                                                ║
║           ┌────────────────────────────────────┐              ║
║           │                                    │              ║
║           │     ╔════════════════════╗         │              ║
║           │     ║        YF          ║         │              ║
║           │     ╚════════════════════╝         │              ║
║           │                                    │              ║
║           │     Create Account                 │              ║
║           │     Join YOGOTEX today            │              ║
║           │                                    │              ║
║           │     ┌──────────────────────────┐   │              ║
║           │     │ Full Name                │   │              ║
║           │     │ [____________________]   │   │              ║
║           │     └──────────────────────────┘   │              ║
║           │                                    │              ║
║           │     ┌──────────────────────────┐   │              ║
║           │     │ Email Address            │   │              ║
║           │     │ [____________________]   │   │              ║
║           │     └──────────────────────────┘   │              ║
║           │                                    │              ║
║           │     ┌──────────────────────────┐   │              ║
║           │     │ Company (Optional)       │   │              ║
║           │     │ [____________________]   │   │              ║
║           │     └──────────────────────────┘   │              ║
║           │                                    │              ║
║           │     ┌──────────────────────────┐   │              ║
║           │     │ Password                 │   │              ║
║           │     │ [____________________]   │   │              ║
║           │     │ At least 8 chars        │   │              ║
║           │     └──────────────────────────┘   │              ║
║           │                                    │              ║
║           │     ┌──────────────────────────┐   │              ║
║           │     │ Confirm Password         │   │              ║
║           │     │ [____________________]   │   │              ║
║           │     └──────────────────────────┘   │              ║
║           │                                    │              ║
║           │     ☐ I agree to Terms & Conditions
║           │                                    │              ║
║           │     ┌──────────────────────────┐   │              ║
║           │     │ [Create Account]         │   │              ║
║           │     └──────────────────────────┘   │              ║
║           │                                    │              ║
║           │     Already have account?          │              ║
║           │     Sign In →                      │              ║
║           │                                    │              ║
║           └────────────────────────────────────┘              ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

---

## Dashboard Layout Mockup

```
╔════════════════════════════════════════════════════════════════════╗
║                      NAVBAR (Sticky)                              ║
║  ┌─────────────────────────────────────────────────────────────┐  ║
║  │ ╔═══╗ YOGOTEX FABRICS CO.LTD    [Sign In] [Sign Up]         │  ║
║  │ ╚═══╝                                                        │  ║
║  └─────────────────────────────────────────────────────────────┘  ║
║                                                                    ║
║  ┌──────────────────────┬────────────────────────────────────┐    ║
║  │                      │                                    │    ║
║  │     SIDEBAR          │        MAIN CONTENT               │    ║
║  │                      │                                    │    ║
║  │  ┌────────────────┐  │  ╔════════════════════════════╗   │    ║
║  │  │ 🏠 Home        │  │  ║ Welcome to YOGOTEX         ║   │    ║
║  │  │ ✓ Active       │  │  ║ FABRICS                    ║   │    ║
║  │  └────────────────┘  │  ╚════════════════════════════╝   │    ║
║  │                      │                                    │    ║
║  │  ┌────────────────┐  │  ┌─────────────┐  ┌────────────┐ │    ║
║  │  │ 📦 Fabrics     │  │  │  Fabrics   │  │Operations │ │    ║
║  │  └────────────────┘  │  └─────────────┘  └────────────┘ │    ║
║  │                      │                                    │    ║
║  │  ┌────────────────┐  │  ┌────────────────────────────┐   │    ║
║  │  │ ⚙️  Operations │  │  │   Equipment Card           │   │    ║
║  │  └────────────────┘  │  └────────────────────────────┘   │    ║
║  │                      │                                    │    ║
║  │  ┌────────────────┐  │  ┌────────────────────────────┐   │    ║
║  │  │ 🔧 Machine    │  │  │   Content Placeholder      │   │    ║
║  │  │   Tools        │  │  │   🚀 Coming Soon...        │   │    ║
║  │  └────────────────┘  │  └────────────────────────────┘   │    ║
║  │                      │                                    │    ║
║  │  ┌────────────────┐  │                                    │    ║
║  │  │ ℹ️  About Us   │  │                                    │    ║
║  │  └────────────────┘  │                                    │    ║
║  │                      │                                    │    ║
║  │  ┌────────────────┐  │                                    │    ║
║  │  │ ⚙️  Settings   │  │                                    │    ║
║  │  └────────────────┘  │                                    │    ║
║  │                      │                                    │    ║
║  │  ┌────────────────┐  │                                    │    ║
║  │  │ 👤 Account    │  │                                    │    ║
║  │  └────────────────┘  │                                    │    ║
║  │                      │                                    │    ║
║  │  ┌────────────────┐  │                                    │    ║
║  │  │  [Logout]      │  │                                    │    ║
║  │  └────────────────┘  │                                    │    ║
║  │                      │                                    │    ║
║  │ Dark Gray (#1F2937)  │ Light Gray (#F3F4F6)             │    ║
║  │ Width: 256px         │ Flex: 1 (Responsive)            │    ║
║  │ Min-height: 100vh    │ Padding: 32px                   │    ║
║  └──────────────────────┴────────────────────────────────────┘    ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## Color Palette

```
PRIMARY COLORS:
┌──────────────────┐
│      Blue        │  Hex: #0066FF
│    RGB: 0,102,255
│   Usage: Buttons, Active states, Links
└──────────────────┘

SECONDARY COLORS:
┌──────────────────┐
│   Dark Gray      │  Hex: #1F2937
│   RGB: 31,41,55  │
│   Usage: Sidebar background
└──────────────────┘

┌──────────────────┐
│   Light Gray     │  Hex: #F3F4F6
│   RGB: 243,244,246│
│   Usage: Page background
└──────────────────┘

ACCENT COLORS:
┌──────────────────┐
│ Success (Green)  │  Hex: #10B981
│ Error (Red)      │  Hex: #EF4444
│ Warning (Amber)  │  Hex: #F59E0B
│ Info (Blue)      │  Hex: #3B82F6
└──────────────────┘
```

---

## Typography Scale

```
H1 (Extra Large)
font-size: 36px
font-weight: 700 (bold)
line-height: 1.2
Usage: Page titles

H2 (Large)
font-size: 28px
font-weight: 700
line-height: 1.3
Usage: Section headings

H3 (Medium)
font-size: 20px
font-weight: 600 (semibold)
line-height: 1.4
Usage: Card titles

Body (Normal)
font-size: 16px
font-weight: 400
line-height: 1.5
Usage: Regular content

Small
font-size: 14px
font-weight: 400
line-height: 1.5
Usage: Labels, secondary text

Tiny
font-size: 12px
font-weight: 400
line-height: 1.4
Usage: Helper text, metadata
```

---

## Spacing System

```
4px    = xs (tiny spacing)
8px    = sm (small spacing)
12px   = md (medium spacing)
16px   = lg (large spacing)
24px   = xl (extra large spacing)
32px   = 2xl (2x extra large)
48px   = 3xl (3x extra large)

Applied to:
- Padding (internal space)
- Margin (external space)
- Gap (space between items)
```

---

## Button Styles

```
PRIMARY BUTTON (Sign In / Create Account):
┌────────────────────────┐
│  [Sign In Button]      │  Background: Blue (#0066FF)
│                        │  Text: White, Bold
│                        │  Padding: 8px 24px
│                        │  Border-radius: 8px
│                        │  Cursor: Pointer
│                        │
│  On Hover:            │  Background: Dark Blue (#004FCC)
│  On Disabled:         │  Opacity: 50%, Cursor: not-allowed
└────────────────────────┘

SECONDARY BUTTON (Sign In):
┌────────────────────────┐
│  [Sign Up Button]      │  Border: 2px solid Blue
│                        │  Text: Blue, Bold
│                        │  Background: Transparent
│                        │  Padding: 8px 24px
│                        │
│  On Hover:            │  Background: Light Blue (#F0F8FF)
└────────────────────────┘

DANGER BUTTON (Logout):
┌────────────────────────┐
│  [Logout Button]       │  Background: Red (#EF4444)
│                        │  Text: White, Bold
│                        │  Padding: 8px 24px
│                        │  Border-radius: 8px
│                        │
│  On Hover:            │  Background: Dark Red (#DC2626)
└────────────────────────┘
```

---

## Form Input Styling

```
TEXT INPUT:
┌─────────────────────────────────────────┐
│ Label Text                              │
│ ┌──────────────────────────────────────┐│
│ │ Placeholder text...                  ││  Border: 1px gray
│ └──────────────────────────────────────┘│  Padding: 8px 12px
│                                         │  Border-radius: 6px
│ Helper text                             │  Font-size: 14px
└─────────────────────────────────────────┘

FOCUSED STATE:
┌─────────────────────────────────────────┐
│ Label Text                              │
│ ┌──────────────────────────────────────┐│  Border: 2px blue
│ │ Value entered...                     ││  Box-shadow: Blue glow
│ └──────────────────────────────────────┘│
└─────────────────────────────────────────┘

CHECKBOX:
☐ Remember me                             □ Unchecked
☑ I agree to Terms                        ☑ Checked
    (Styling applied with Tailwind)
```

---

## Responsive Breakpoints

```
MOBILE: < 768px
├─ Sidebar: Hidden (toggles with hamburger)
├─ Navbar: Full width
├─ Content: Full width with padding
└─ Typography: Slightly reduced

TABLET: 768px - 1024px
├─ Sidebar: Visible, fixed width
├─ Navbar: Full width
├─ Layout: Two column (Sidebar + Content)
└─ Typography: Standard

DESKTOP: > 1024px
├─ Sidebar: Visible, fixed width (256px)
├─ Navbar: Full width, sticky
├─ Layout: Two column (Sidebar + Content)
├─ Content: Max-width container
└─ Typography: Standard with increased spacing
```

---

## Interactive States

```
HOVER STATES:
- Links: Underline appears
- Buttons: Background darkens
- Cards: Shadow increases
- Menu items: Background changes to gray

FOCUS STATES:
- Inputs: Blue border, glow effect
- Buttons: Outline or color change
- Links: Underline appears
- Accessible for keyboard navigation

ACTIVE STATES:
- Current page menu item: Blue background
- Pressed button: Darker shade
- Form field with value: Different styling

DISABLED STATES:
- Buttons: Opacity 50%, cursor not-allowed
- Form inputs: Gray background, readonly
- Menu items: Gray text, not clickable
```

---

## Shadow & Elevation

```
NO SHADOW (Flat):
Element with no elevation

SMALL SHADOW:
box-shadow: 0 1px 2px rgba(0,0,0,0.05)
Used: Form inputs, small cards

MEDIUM SHADOW:
box-shadow: 0 4px 6px rgba(0,0,0,0.1)
Used: Cards, modals, sidebar

LARGE SHADOW:
box-shadow: 0 20px 25px rgba(0,0,0,0.15)
Used: Modals, floating elements, dropdowns
```

---

## Animation & Transitions

```
STANDARD TRANSITIONS:
Duration: 200-300ms
Timing: ease-in-out
Applied to: Colors, background, shadows, transforms

EXAMPLES:
- Button hover color change: 200ms
- Menu slide-in: 300ms
- Form error message appear: 150ms
- Page fade-in: 200ms

MOBILE MENU:
- Slide-in animation: 300ms
- Overlay fade: 300ms
- Smooth transitions on all movements
```

---

**Mockup Created**: January 15, 2026
**Design System Version**: 1.0.0
**Framework**: Tailwind CSS 4.1.18
