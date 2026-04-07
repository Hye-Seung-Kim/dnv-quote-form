import Field from "./Field";
import { formatPhoneNumber } from "../utils/formUtils";

export default function ContactBlock({
  title,
  data = {},
  onChange,
  primaryData,
  required = true,
  errors = {},
  errorPrefix = "",
}) {
  const handleSameAsPrimary = (e) => {
    const checked = e.target.checked;

    onChange({
      ...data,
      sameAsPrimary: checked,
      ...(checked
        ? {
            firstName: primaryData.firstName || "",
            lastName: primaryData.lastName || "",
            phone: primaryData.workPhone || "",
            email: primaryData.email || "",
          }
        : {}),
    });
  };

  return (
    <div className="sub-card">
      <div className="sub-card-title">{title}</div>

      <label className="cb-wrap">
        <input
          type="checkbox"
          checked={!!data.sameAsPrimary}
          onChange={handleSameAsPrimary}
        />
        Same as Primary Contact entered in Step 1
      </label>

      <div className="field-row">
        <Field
          label="First Name"
          required={required}
          error={errors?.[`${errorPrefix}FirstName`]}
        >
          <input
            type="text"
            value={data.firstName || ""}
            onChange={(e) =>
              onChange({ ...data, firstName: e.target.value })
            }
          />
        </Field>

        <Field
          label="Last Name"
          required={required}
          error={errors?.[`${errorPrefix}LastName`]}
        >
          <input
            type="text"
            value={data.lastName || ""}
            onChange={(e) =>
              onChange({ ...data, lastName: e.target.value })
            }
          />
        </Field>
      </div>

      <Field
        label="Phone"
        required={required}
        error={errors?.[`${errorPrefix}Phone`]}
      >
        <input
          type="tel"
          value={data.phone || ""}
          onChange={(e) =>
            onChange({
              ...data,
              phone: formatPhoneNumber(e.target.value),
            })
          }
        />
      </Field>

      <Field
        label="Email"
        required={required}
        error={errors?.[`${errorPrefix}Email`]}
      >
        <input
          type="email"
          value={data.email || ""}
          onChange={(e) =>
            onChange({ ...data, email: e.target.value })
          }
        />
      </Field>
    </div>
  );
}