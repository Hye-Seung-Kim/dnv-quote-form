import { useForm } from "../../context/FormContext";

const FACILITY_TYPES = [
  "Short-Term Acute Care",
  "Long-Term Acute Care",
  "Critical Access",
  "Children's",
  "Free-Standing Psychiatric",
  "Other",
];

export default function Step2() {
  const { form, setForm } = useForm();

  return (
    <div className="card">
      <div className="section-title">Facility and Organization Type</div>

      <div className="field" style={{ marginTop: 16 }}>
        <label>
          Facility Type<span className="req">*</span>
        </label>

        <div className="radio-group">
        {FACILITY_TYPES.map((t) => (
            <label key={t} className="radio-wrap">
            <input
                type="radio"
                name="facilityType"
                value={t}
                checked={form.facilityType === t}
                onChange={() => setForm((f) => ({ ...f, facilityType: t }))}
            />
            <span className="radio-text">{t}</span>
            </label>
        ))}
        </div>
      </div>
    </div>
  );
}