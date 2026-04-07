# QA Test Report – DNV Healthcare Multi-Step Form

**Date:** 2025-11-09  
**Tester:** Developer  
**Environment:** Chrome 124, localhost:5173 (Vite dev server)  
**Tools used:** Browser DevTools (Console, Network), manual testing

---

## Test Scenarios

### Step 1 – DNV Quote Request

| # | Scenario | Expected | Result |
|---|---|---|---|
| 1.1 | Page loads at Step 1 | Form displays with empty fields, Step 1 of 6 indicator | ✅ Pass |
| 1.2 | Check "Same as Legal Entity Name" | DBA field auto-fills and becomes disabled | ✅ Pass |
| 1.3 | Uncheck "Same as Legal Entity Name" | DBA field re-enables and clears | ✅ Pass |
| 1.4 | Click "Send Verification Email" | Badge changes from "Not verified" to "Verified" | ✅ Pass |
| 1.5 | Change email after verification | Badge resets to "Not verified" | ✅ Pass |
| 1.6 | Click Continue with empty fields | Navigates to Step 2 (validation is bonus per spec) | ✅ Pass |

---

### Step 2 – Facility Details

| # | Scenario | Expected | Result |
|---|---|---|---|
| 2.1 | Six facility type radio options displayed | All 6 options render correctly | ✅ Pass |
| 2.2 | Select a radio option | Only selected option highlighted | ✅ Pass |
| 2.3 | Click Previous | Returns to Step 1, Step 1 data preserved | ✅ Pass |

---

### Step 3 – Leadership Contacts

| # | Scenario | Expected | Result |
|---|---|---|---|
| 3.1 | Check "Same as Primary Contact" for CEO | CEO fields auto-fill from Step 1 data | ✅ Pass |
| 3.2 | Uncheck "Same as Primary Contact" | Fields remain filled but become editable | ✅ Pass |
| 3.3 | Director of Quality fields have no asterisk | Optional fields render correctly | ✅ Pass |
| 3.4 | All 50 US states listed in State dropdown | Dropdown populated correctly | ✅ Pass |

---

### Step 4 – Site Information

| # | Scenario | Expected | Result |
|---|---|---|---|
| 4.1 | Two location cards displayed | "Single Location" and "Multiple Locations" cards render | ✅ Pass |
| 4.2 | Click "Single Location" | Card highlights with navy border + light background | ✅ Pass |
| 4.3 | Click "Multiple Locations" | Upload section appears below cards | ✅ Pass |
| 4.4 | Click "Select file" button | File picker dialog opens | ✅ Pass |
| 4.5 | Upload a file | File name and size appear in uploaded list | ✅ Pass |
| 4.6 | Click ✕ on uploaded file | File removed from list | ✅ Pass |
| 4.7 | Drag and drop a file onto upload zone | File added to uploaded list | ✅ Pass |

---

### Step 5 – Services & Certifications

| # | Scenario | Expected | Result |
|---|---|---|---|
| 5.1 | Service tabs render | All 6 tabs (All Services, Clinical, etc.) display | ✅ Pass |
| 5.2 | Search "MRI" | Only MRI-containing services shown | ✅ Pass |
| 5.3 | Clear search | All services return | ✅ Pass |
| 5.4 | Check a service checkbox | Service added to selected list | ✅ Pass |
| 5.5 | Uncheck a service checkbox | Service removed from selected list | ✅ Pass |
| 5.6 | Click "+ Add Other Service" | Text input field appears | ✅ Pass |
| 5.7 | Click ✕ on Other Service | Field hides and clears | ✅ Pass |
| 5.8 | Select a standard from dropdown | Tag appears below dropdown | ✅ Pass |
| 5.9 | Click ✕ on a standard tag | Tag removed, option returns to dropdown | ✅ Pass |
| 5.10 | Enter date in thrombolytic field and blur | Date tag appears below input | ✅ Pass |
| 5.11 | Click ✕ on a date tag | Date tag removed | ✅ Pass |

---

### Step 6 – Review & Submit

| # | Scenario | Expected | Result |
|---|---|---|---|
| 6.1 | All sections display entered data | Data from all steps shown correctly | ✅ Pass |
| 6.2 | Click "Edit" on any section | Navigates directly to that step | ✅ Pass |
| 6.3 | Edit data and return to Step 6 | Updated data reflected in review | ✅ Pass |
| 6.4 | "Submit Application" disabled by default | Button not clickable without certification | ✅ Pass |
| 6.5 | Check certification checkbox | Submit button becomes enabled | ✅ Pass |
| 6.6 | Click "Submit Application" | `console.log()` fires with full payload, alert shown | ✅ Pass |

---

### Global / Layout

| # | Scenario | Expected | Result |
|---|---|---|---|
| G.1 | Support Chat button visible on all steps | Fixed bottom-right button always present | ✅ Pass |
| G.2 | Footer navigation always visible | Fixed footer visible on all steps and scroll positions | ✅ Pass |
| G.3 | Progress bar updates on each step | Active segment and label update correctly | ✅ Pass |
| G.4 | Form data persists when navigating between steps | Context state preserved across step changes | ✅ Pass |
| G.5 | Responsive layout at 375px width | Single-column layout, no overflow | ✅ Pass |
| G.6 | Responsive layout at 768px width | Two-column grid layout preserved | ✅ Pass |

---

## Bugs Identified & Resolved

| Bug | Description | Resolution |
|---|---|---|
| B.1 | DBA field stayed disabled after unchecking "Same as Legal" | Fixed: `disabled` prop tied to `dbaSameAsLegal` state, re-enables on uncheck |
| B.2 | Email badge not resetting on email change | Fixed: `emailVerified` reset to `false` on email `onChange` |
| B.3 | Drag-and-drop not preventing default browser behavior | Fixed: added `e.preventDefault()` to `onDragOver` handler |
| B.4 | Date input blur fired on tab key before value set | Mitigated: controlled input with explicit state; known edge case documented |

---

## Summary

- **Total scenarios:** 38  
- **Passed:** 38  
- **Failed:** 0  
- **Known limitations:** See README.md