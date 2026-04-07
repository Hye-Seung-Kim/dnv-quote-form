import { useForm } from "../../context/FormContext";
import Field from "../Field";
import { formatPhoneNumber } from "../../utils/formUtils";

export default function Step1() {
  const { form, setForm } = useForm();
  const u = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const syncEmailVerification = () => {
    u("emailVerified", true);
  };

  // Step1.jsx 내부 수정
const resetEmailVerification = () => {
  setForm((f) => ({
    ...f,
    email: "",          // 이메일 입력칸 비우기
    emailVerified: false // 인증 상태 초기화
  }));
};

  return (
    <div className="card">
      <div className="section-title">Identify Healthcare Organization</div>
      <div style={{ height: 16 }} />

      <Field label="Legal Entity Name" required>
        <input
          type="text"
          value={form.legalEntityName}
          onChange={(e) => u("legalEntityName", e.target.value)}
        />
      </Field>

      <Field label="Doing Business As (d/b/a) Name" required>
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
            if (checked) {
              u("dbaName", form.legalEntityName);
            }
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
        <Field label="First Name" required>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => u("firstName", e.target.value)}
          />
        </Field>

        <Field label="Last Name" required>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => u("lastName", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Title" required>
        <input
          type="text"
          value={form.title}
          onChange={(e) => u("title", e.target.value)}
        />
      </Field>

      <div className="field-row">
        <Field label="Work Phone" required>
        <input
          type="tel"
          value={form.workPhone}
          onChange={(e) =>
            setForm((f) => ({ ...f, workPhone: formatPhoneNumber(e.target.value) }))
          }
        />
        </Field>
          
        <Field label="Cell Phone">
        <input
          type="tel"
          value={form.cellPhone}
          onChange={(e) =>
            setForm((f) => ({ ...f, cellPhone: formatPhoneNumber(e.target.value) }))
          }
        />
        </Field>
      </div>

      <Field
            label="Email"
            required
            labelAction={
                <button
                type="button"
                className="email-reset-btn"
                onClick={resetEmailVerification}
                aria-label="Reset verification"
                title="Reset verification"
                >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                    d="M20 6V10H16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                    <path
                    d="M4 18V14H8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                    <path
                    d="M7.5 9C8.2 7.3 9.9 6 12 6C13.7 6 15.2 6.8 16.1 8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                    <path
                    d="M16.5 15C15.8 16.7 14.1 18 12 18C10.3 18 8.8 17.2 7.9 16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                </svg>
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
            </div>
        </Field>
    </div>
  );
}