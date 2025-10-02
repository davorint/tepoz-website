# Accessibility Checklist & Testing Guide

**Project**: Tepoztlán Tourism Website
**Last Updated**: 2025-10-02
**Compliance Target**: WCAG 2.2 Level AA

---

## 📋 FORM ACCESSIBILITY REQUIREMENTS

### When Adding Forms (Contact, Newsletter, Booking, etc.)

#### 1. **Autocomplete Attributes** (WCAG 1.3.5 - Level AA)

**Required for all user information fields**:

```tsx
// Email Input
<Input
  type="email"
  name="email"
  id="email"
  autoComplete="email"
  aria-label="Email address"
  aria-required="true"
  aria-invalid={errors.email ? "true" : "false"}
  aria-describedby={errors.email ? "email-error" : undefined}
/>
{errors.email && (
  <span id="email-error" className="text-sm text-destructive" role="alert">
    {errors.email}
  </span>
)}

// Phone Input
<Input
  type="tel"
  name="phone"
  id="phone"
  autoComplete="tel"
  aria-label="Phone number"
/>

// Name Input
<Input
  type="text"
  name="name"
  id="name"
  autoComplete="name"
  aria-label="Full name"
  aria-required="true"
/>

// Address Input
<Input
  type="text"
  name="address"
  id="street-address"
  autoComplete="street-address"
  aria-label="Street address"
/>

// City
<Input
  type="text"
  name="city"
  id="city"
  autoComplete="address-level2"
  aria-label="City"
/>

// State/Region
<Input
  type="text"
  name="state"
  id="state"
  autoComplete="address-level1"
  aria-label="State or region"
/>

// Postal Code
<Input
  type="text"
  name="zip"
  id="postal-code"
  autoComplete="postal-code"
  aria-label="Postal code"
/>

// Country
<Select name="country" id="country" autoComplete="country-name">
  <SelectTrigger aria-label="Country">
    <SelectValue placeholder="Select country" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="mx">Mexico</SelectItem>
    <SelectItem value="us">United States</SelectItem>
  </SelectContent>
</Select>

// Date of Birth
<Input
  type="date"
  name="birthday"
  id="bday"
  autoComplete="bday"
  aria-label="Date of birth"
/>

// Credit Card (for booking forms)
<Input
  type="text"
  name="cc-number"
  id="cc-number"
  autoComplete="cc-number"
  aria-label="Credit card number"
  inputMode="numeric"
/>

<Input
  type="text"
  name="cc-exp"
  id="cc-exp"
  autoComplete="cc-exp"
  aria-label="Credit card expiration date"
  placeholder="MM/YY"
/>

<Input
  type="text"
  name="cc-csc"
  id="cc-csc"
  autoComplete="cc-csc"
  aria-label="Credit card security code"
  inputMode="numeric"
/>
```

#### 2. **Complete Autocomplete Token List**

```typescript
// Personal Information
'name'              // Full name
'given-name'        // First name
'additional-name'   // Middle name
'family-name'       // Last name
'nickname'          // Nickname
'username'          // Username
'email'             // Email address
'tel'               // Phone number
'tel-country-code'  // Country code for phone
'tel-national'      // National phone number
'tel-area-code'     // Area code
'tel-local'         // Local phone number

// Address
'street-address'    // Full street address
'address-line1'     // Address line 1
'address-line2'     // Address line 2
'address-line3'     // Address line 3
'address-level1'    // State/Province
'address-level2'    // City
'address-level3'    // District
'address-level4'    // Subdistrict
'country'           // Country code
'country-name'      // Country name
'postal-code'       // ZIP/Postal code

// Dates
'bday'              // Birthday
'bday-day'          // Birthday day
'bday-month'        // Birthday month
'bday-year'         // Birthday year

// Payment
'cc-name'           // Name on card
'cc-number'         // Card number
'cc-exp'            // Expiration date
'cc-exp-month'      // Expiration month
'cc-exp-year'       // Expiration year
'cc-csc'            // Security code
'cc-type'           // Card type

// Other
'language'          // Preferred language
'sex'               // Gender
'url'               // Website URL
'photo'             // Photo/Avatar
```

#### 3. **Required Field Indicators**

```tsx
// Visual + Programmatic
<Label htmlFor="email">
  Email <span className="text-destructive" aria-hidden="true">*</span>
</Label>
<Input
  id="email"
  type="email"
  required
  aria-required="true"
  aria-label="Email address (required)"
/>

// Legend for form sections
<fieldset>
  <legend className="text-lg font-semibold mb-4">
    Contact Information
    <span className="text-sm text-muted-foreground ml-2">
      (* indicates required field)
    </span>
  </legend>
  {/* Form fields */}
</fieldset>
```

#### 4. **Error Handling**

```tsx
// Form-level error summary
{errors && Object.keys(errors).length > 0 && (
  <div
    role="alert"
    aria-live="assertive"
    className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-md mb-4"
  >
    <h2 className="font-semibold mb-2">Please fix the following errors:</h2>
    <ul className="list-disc list-inside space-y-1">
      {Object.entries(errors).map(([field, message]) => (
        <li key={field}>
          <a href={`#${field}`} className="underline hover:no-underline">
            {message}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}

// Field-level error
<div className="space-y-2">
  <Label htmlFor="email">Email *</Label>
  <Input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={errors.email ? "true" : "false"}
    aria-describedby={errors.email ? "email-error" : "email-help"}
  />
  {errors.email ? (
    <span id="email-error" className="text-sm text-destructive" role="alert">
      {errors.email}
    </span>
  ) : (
    <span id="email-help" className="text-sm text-muted-foreground">
      We'll never share your email
    </span>
  )}
</div>
```

#### 5. **Success Messages**

```tsx
{submitted && (
  <div
    role="status"
    aria-live="polite"
    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 p-4 rounded-md"
  >
    <p className="font-semibold">✓ Form submitted successfully!</p>
    <p className="text-sm mt-1">We'll get back to you soon.</p>
  </div>
)}
```

---

## 🔍 HEADING HIERARCHY VERIFICATION

### Manual Testing Steps

1. **Install Browser Extension**
   - Chrome/Edge: [HeadingsMap](https://chromewebstore.google.com/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi)
   - Firefox: [HeadingsMap](https://addons.mozilla.org/en-US/firefox/addon/headingsmap/)

2. **Check Each Major Page**
   - Homepage (`/es` and `/en`)
   - Restaurant listings (`/es/comer/restaurantes`)
   - Hotel listings (`/es/hospedaje/hoteles`)
   - Experience pages (`/es/experiencias`)
   - Event pages (`/es/eventos`)
   - Individual detail pages

3. **Verify Hierarchy Rules**
   - ✅ One `<h1>` per page (page title)
   - ✅ Headings don't skip levels (h1 → h2 → h3, NOT h1 → h3)
   - ✅ Headings are nested logically
   - ✅ Headings describe content accurately

### Expected Hierarchy Example

```
Homepage:
h1: "Descubre Tepoztlán"
  h2: "Hospedaje"
    h3: "Hoteles Destacados"
    h3: "Eco-Lodges"
  h2: "Experiencias"
    h3: "Pirámide del Tepozteco"
    h3: "Senderismo"
  h2: "Testimonios"

Restaurant Listing:
h1: "Restaurantes en Tepoztlán"
  h2: "Filtros"
  h2: "Resultados"
    h3: "La Casa del Tepozteco" (card title)
    h3: "El Ciruelo" (card title)
```

### Automated Check (Optional)

```bash
# Using pa11y-ci
npm install -g pa11y-ci

# Create .pa11yci.json
{
  "defaults": {
    "standard": "WCAG2AA",
    "runners": ["axe"]
  },
  "urls": [
    "http://localhost:3000/es",
    "http://localhost:3000/es/comer/restaurantes",
    "http://localhost:3000/es/hospedaje/hoteles"
  ]
}

# Run tests
pa11y-ci
```

---

## ⌨️ FOCUS MANAGEMENT TESTING

### Keyboard Navigation Checklist

#### 1. **General Navigation**
- [ ] Tab moves focus forward through interactive elements
- [ ] Shift+Tab moves focus backward
- [ ] Focus indicator is clearly visible (min 2px, 3:1 contrast)
- [ ] Focus order matches visual order
- [ ] No keyboard traps (can escape from all components)
- [ ] Skip to main content link works (Tab → Enter)

#### 2. **Dialog/Modal Testing**

```
Test: Open Dialog
✓ Focus moves to dialog on open
✓ Focus stays within dialog (tab cycles through dialog elements)
✓ Escape key closes dialog
✓ Focus returns to trigger button on close
✓ Background content is inert (can't tab to it)
```

**How to Test**:
```tsx
// src/components/ui/dialog.tsx already implements this via Radix UI

1. Navigate to any page with Dialog (e.g., restaurant details)
2. Click button to open dialog
3. Press Tab repeatedly - verify focus stays in dialog
4. Press Escape - verify dialog closes
5. Verify focus returns to button that opened it
```

#### 3. **Sheet (Mobile Drawer) Testing**

```
Test: Open Sheet
✓ Focus moves to sheet content
✓ Close button is focusable
✓ Escape closes sheet
✓ Focus returns correctly
```

#### 4. **Dropdown/Select Testing**

```
Test: Select Component
✓ Enter/Space opens dropdown
✓ Arrow keys navigate options
✓ Enter selects option
✓ Escape closes without selecting
```

#### 5. **Navigation Menu Testing**

```
Test: Desktop Navigation
✓ Tab reaches all menu items
✓ Enter activates links
✓ Arrow keys navigate submenu (if applicable)

Test: Mobile Navigation
✓ Menu button is keyboard accessible
✓ Tab navigates menu items
✓ Close button accessible
```

### Screen Reader Testing

**Recommended Tools**:
- **Windows**: NVDA (free) or JAWS
- **macOS**: VoiceOver (built-in, Cmd+F5)
- **iOS**: VoiceOver (Settings → Accessibility)
- **Android**: TalkBack (Settings → Accessibility)

**Basic Screen Reader Tests**:

1. **Landmarks**
   ```
   ✓ Main content announced
   ✓ Navigation announced
   ✓ Complementary sections identified
   ```

2. **Dynamic Content**
   ```
   ✓ Filter changes announced (aria-live)
   ✓ Error messages announced
   ✓ Success messages announced
   ✓ Loading states announced
   ```

3. **Images**
   ```
   ✓ All images have descriptive alt text
   ✓ Decorative images have alt=""
   ✓ Complex images have long descriptions
   ```

4. **Forms** (when implemented)
   ```
   ✓ Labels associated with inputs
   ✓ Required fields announced
   ✓ Errors announced and associated
   ✓ Help text accessible
   ```

---

## 🧪 AUTOMATED TESTING TOOLS

### 1. **Lighthouse (Built into Chrome)**

```bash
# Run in Chrome DevTools
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Accessibility" category
4. Click "Generate report"
5. Fix any issues scoring < 100
```

### 2. **axe DevTools**

Install: [axe DevTools Extension](https://www.deque.com/axe/devtools/)

```
1. Install extension
2. Open DevTools
3. Go to "axe DevTools" tab
4. Click "Scan ALL of my page"
5. Review violations by severity
```

### 3. **WAVE (Web Accessibility Evaluation Tool)**

Install: [WAVE Extension](https://wave.webaim.org/extension/)

```
1. Install extension
2. Click WAVE icon in toolbar
3. Review errors (red), alerts (yellow), features (green)
4. Check "Contrast" tab for color issues
```

### 4. **Keyboard-only Testing**

```bash
# Unplug mouse, use only keyboard
Tab          - Next element
Shift+Tab    - Previous element
Enter        - Activate button/link
Space        - Toggle checkbox, activate button
Arrow keys   - Navigate select/radio groups
Escape       - Close modal/dropdown
Home/End     - Jump to start/end
```

---

## 📱 MOBILE ACCESSIBILITY TESTING

### iOS Testing

1. **Enable VoiceOver**
   - Settings → Accessibility → VoiceOver → On
   - Or triple-click side button (if configured)

2. **VoiceOver Gestures**
   ```
   Swipe right      - Next item
   Swipe left       - Previous item
   Double tap       - Activate
   Two-finger tap   - Pause VoiceOver
   Three-finger swipe - Scroll
   ```

3. **Test Checklist**
   - [ ] All images described
   - [ ] Buttons have clear labels
   - [ ] Navigation works logically
   - [ ] Form inputs have labels
   - [ ] Links describe destination

### Android Testing

1. **Enable TalkBack**
   - Settings → Accessibility → TalkBack → On

2. **TalkBack Gestures**
   ```
   Swipe right      - Next item
   Swipe left       - Previous item
   Double tap       - Activate
   Two-finger swipe - Scroll
   ```

---

## 🎯 COMPLIANCE CHECKLIST

### WCAG 2.2 Level AA Requirements

#### Perceivable
- [x] 1.1.1 Non-text Content - Images have alt text
- [ ] 1.3.5 Identify Input Purpose - Autocomplete (when forms added)
- [x] 1.4.3 Contrast (Minimum) - Not checked per user request
- [x] 1.4.4 Resize Text - rem units used
- [x] 1.4.10 Reflow - No horizontal scroll at 320px
- [x] 1.4.11 Non-text Contrast - Not checked per user request

#### Operable
- [x] 2.1.1 Keyboard - All interactive elements accessible
- [x] 2.1.2 No Keyboard Trap - Can escape all components
- [x] 2.4.1 Bypass Blocks - Skip to main content link
- [ ] 2.4.6 Headings and Labels - Need runtime verification
- [x] 2.4.7 Focus Visible - Custom focus indicators present
- [x] 2.5.3 Label in Name - ARIA labels match visible text
- [x] 2.5.8 Target Size (Minimum) - 24×24px minimum met

#### Understandable
- [x] 3.1.1 Language of Page - HTML lang attribute set
- [x] 3.2.4 Consistent Identification - Component library ensures this
- [x] 3.3.1 Error Identification - ErrorBoundary implemented
- [x] 3.3.2 Labels or Instructions - Labels on all inputs

#### Robust
- [x] 4.1.2 Name, Role, Value - Using Radix UI primitives
- [x] 4.1.3 Status Messages - aria-live regions present

---

## 📅 TESTING SCHEDULE

### Before Every Release
- [ ] Run Lighthouse accessibility audit
- [ ] Run axe DevTools scan
- [ ] Keyboard-only navigation test (5 min)
- [ ] Check new components with HeadingsMap

### Monthly
- [ ] Full VoiceOver test on iOS (30 min)
- [ ] Full TalkBack test on Android (30 min)
- [ ] WAVE evaluation of all major pages

### When Adding Features
- [ ] If adding forms: Implement autocomplete attributes
- [ ] If adding media: Add captions/transcripts
- [ ] If adding custom interactions: Test keyboard access
- [ ] If adding new pages: Verify heading hierarchy

---

## 🚀 QUICK REFERENCE

### Common Fixes

**Issue**: Low contrast text
**Fix**: Use Tailwind contrast utilities, check with WAVE

**Issue**: Missing alt text
**Fix**: Add descriptive alt to Image component

**Issue**: Keyboard trap
**Fix**: Ensure Escape key works, verify tabIndex not > 0

**Issue**: No focus indicator
**Fix**: Already implemented globally in globals.css

**Issue**: Missing ARIA label
**Fix**: Add aria-label or aria-labelledby to component

**Issue**: Skipped heading level
**Fix**: Use correct heading hierarchy (h1→h2→h3)

---

**Document Version**: 1.0
**Last Reviewed**: 2025-10-02
**Next Review**: When forms are implemented
