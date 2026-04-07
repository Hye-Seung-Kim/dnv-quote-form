const STEPS = [
  "DNV Quote Request",
  "Facility Details",
  "Leadership Contacts",
  "Site Information",
  "Services & Certifications",
  "Review & Submit",
];

export default function ProgressBar({ currentStep }) {
  return (
    <div className="progress-bar">
      {STEPS.map((label, i) => (
        <div key={i} className="progress-seg">
          <div
            className={`progress-seg-bar ${
              i < currentStep ? "done" : i === currentStep ? "active" : ""
            }`}
          />
          <div className={`progress-seg-label ${i === currentStep ? "active" : ""}`}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}