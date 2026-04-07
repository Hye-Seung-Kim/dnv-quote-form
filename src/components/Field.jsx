export default function Field({ label, required, labelAction, children }) {
  return (
    <div className="field">
      {label && (
        <div className="field-label-row">
          <label>
            {label}
            {required && <span className="req">*</span>}
          </label>

          {labelAction ? (
            <div className="field-label-action">
              {labelAction}
            </div>
          ) : null}
        </div>
      )}

      {children}
    </div>
  );
}