import { useForm } from "../../context/FormContext";
import Field from "../Field";
import { formatPhoneNumber } from "../../utils/formUtils";

export default function Step1({ errors = {} }) {
  const { form, setForm } = useForm();
  const u = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const syncEmailVerification = () => {
    u("emailVerified", true);
  };

  const resetEmailVerification = () => {
    setForm((f) => ({
      ...f,
      email: "",
      emailVerified: false,
    }));
  };

  return (
    <div className="card">
      <div className="section-title">Identify Healthcare Organization</div>
      <div style={{ height: 16 }} />

      <div className="section-sub" style={{ marginBottom: 16 }}>
        Please complete all required fields marked with * and verify your email before continuing.
      </div>

      <Field label="Legal Entity Name" required error={errors.legalEntityName}>
        <input
          type="text"
          value={form.legalEntityName}
          onChange={(e) => u("legalEntityName", e.target.value)}
        />
      </Field>

      <Field label="Doing Business As (d/b/a) Name" required error={errors.dbaName}>
        <input
          type="text"
          value={form.dbaName}
          disabled={form.dbaSameAsLegal}
          onChange={(e) => u("dbaName", e.target.value)}
        />
      </Field>

      <label className="cb-wrap">
        <input
          type="checkbox"
          checked={form.dbaSameAsLegal}
          onChange={(e) => {
            const checked = e.target.checked;
            u("dbaSameAsLegal", checked);
            if (checked) u("dbaName", form.legalEntityName);
          }}
        />
        Same as Legal Entity Name
      </label>

      <hr className="divider" />

      <div className="section-title">Primary Contact Information</div>
      <div className="section-sub">
        Primary contact receives all DNV Healthcare official communications
      </div>

      <div className="field-row">
        <Field label="First Name" required error={errors.firstName}>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => u("firstName", e.target.value)}
          />
        </Field>

        <Field label="Last Name" required error={errors.lastName}>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => u("lastName", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Title" required error={errors.title}>
        <input
          type="text"
          value={form.title}
          onChange={(e) => u("title", e.target.value)}
        />
      </Field>

      <div className="field-row">
        <Field label="Work Phone" required error={errors.workPhone}>
          <input
            type="tel"
            value={form.workPhone}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                workPhone: formatPhoneNumber(e.target.value),
              }))
            }
          />
        </Field>

        <Field label="Cell Phone" error={errors.cellPhone}>
          <input
            type="tel"
            value={form.cellPhone}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                cellPhone: formatPhoneNumber(e.target.value),
              }))
            }
          />
        </Field>
      </div>

      <Field
        label="Email"
        required
        error={errors.email || errors.emailVerified}
        labelAction={
          <button
            type="button"
            className="email-reset-btn"
            onClick={resetEmailVerification}
            aria-label="Reset verification"
            title="Reset verification"
          >
            Reset
          </button>
        }
      >
        <div className="email-block">
          <input
            type="email"
            className="email-input"
            value={form.email}
            onChange={(e) => {
              u("email", e.target.value);
              u("emailVerified", false);
            }}
          />

          <div className="email-meta-row">
            <button
              type="button"
              className="btn-verify-email"
              onClick={syncEmailVerification}
            >
              Send Verification Email
            </button>

            <span className={`verify-badge ${form.emailVerified ? "is-ok" : "is-warn"}`}>
              {form.emailVerified ? "Verified" : "Not verified"}
            </span>
          </div>

          <div className="section-sub" style={{ marginTop: 8 }}>
            You must verify your email before proceeding to the next step.
          </div>
        </div>
      </Field>
    </div>
  );
}