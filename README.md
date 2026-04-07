# DNV Healthcare – Multi-Step Quote Request Form

A fully functional multi-step form built with React (JavaScript) + pure CSS, implementing the Medlaunch Concepts Frontend Developer Assessment challenge.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 (via Vite) |
| Styling | Pure CSS (custom properties, no frameworks) |
| State Management | React Context API + useState |
| Form Handling | Controlled components via useState |
| Build Tool | Vite |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

App will be available at `http://localhost:5173`

---

## Project Structure

```
src/
├── components/
│   ├── steps/
│   │   ├── Step1.jsx   # DNV Quote Request (org info + primary contact)
│   │   ├── Step2.jsx   # Facility Details (radio group)
│   │   ├── Step3.jsx   # Leadership Contacts (CEO, Director, Invoicing)
│   │   ├── Step4.jsx   # Site Information (single/multiple + file upload)
│   │   ├── Step5.jsx   # Services & Certifications
│   │   └── Step6.jsx   # Review & Submit
│   ├── ContactBlock.jsx  # Reusable contact sub-form
│   ├── Field.jsx         # Reusable labeled field wrapper
│   └── ProgressBar.jsx   # Step progress indicator
├── context/
│   └── FormContext.jsx   # Global form state via Context API
├── styles/
│   └── global.css        # All styles using CSS custom properties
├── App.jsx               # Root: navigation logic, footer, layout
└── main.jsx              # Entry point
```

---

## Development Approach

1. **State management**: All form data lives in a single `FormContext` object initialized with empty defaults. Each step reads and writes to the shared context via the `useForm()` hook.

2. **Navigation**: Step index is managed in `App.jsx`. The `Continue` / `Previous` buttons increment/decrement the index. The Review step's `Edit` buttons allow direct navigation to any step.

3. **Component reuse**: `Field`, `ContactBlock`, and `ProgressBar` are extracted as reusable components to reduce repetition across steps.

4. **Submission**: On submit, the full form payload is logged to the browser console via `console.log()` and a confirmation alert is shown.

5. **CSS design**: All colors are defined as CSS custom properties (`--navy`, `--border`, etc.) for consistency and easy theming.

---

## Assumptions

- Email "Send Verification Email" is simulated (sets `emailVerified: true` locally; no real email sent).
- File upload stores metadata (name, size) only — no actual server upload.
- "Download as PDF" / "Export to CSV" buttons are UI placeholders (no implementation required per spec).
- Step numbers shown in Figma (some labeled "Step 4 of 6" for different screens) were normalized to a linear 1–6 flow.
- Director of Quality fields are optional (not marked required in Figma).

---

## Known Issues / Limitations

- No server-side validation or persistence; data resets on page refresh.
- Email verification is simulated client-side only.
- Service tab filtering (Clinical, Surgical, etc.) maps all services to "All Services" — tab-specific filtering would require a category-to-tab mapping not specified in the Figma.
- Date inputs for thrombolytic/thrombectomy trigger on `blur`; consider adding an explicit "Add" button for better UX.