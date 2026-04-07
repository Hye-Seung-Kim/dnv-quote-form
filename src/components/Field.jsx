export default function Field({
  label,
  required = false,
  error,
  labelAction,
  children,
}) {
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <div className="field-label-row">
        <label className="field-label">
          {label} {required && <span className="req">*</span>}
        </label>
        {labelAction}
      </div>

      {children}

      {error && <div className="field-error">This field is required.</div>}
    </div>
  );
}