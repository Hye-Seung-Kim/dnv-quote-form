import { useForm } from "../../context/FormContext";
import Field from "../Field";
import ContactBlock from "../ContactBlock";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

export default function Step3() {
  const { form, setForm } = useForm();
  const up = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const upInvoicing = (val) => setForm((f) => ({ ...f, invoicing: { ...f.invoicing, ...val } }));

  return (
    <div className="card">
      <div className="section-title">Contact Information</div>
      <div style={{ height: 16 }} />

      <ContactBlock title="Chief Executive Officer (CEO)" data={form.ceo} onChange={(v) => up("ceo", v)} primaryData={form} />
      <ContactBlock title="Director of Quality" data={form.directorOfQuality} onChange={(v) => up("directorOfQuality", v)} primaryData={form} required={false} />

      <div className="sub-card">
        <div className="sub-card-title">Invoicing Contact</div>
        <label className="cb-wrap">
          <input
            type="checkbox"
            checked={form.invoicing.sameAsPrimary}
            onChange={(e) => {
              const c = e.target.checked;
              upInvoicing({ sameAsPrimary: c, ...(c ? { firstName: form.firstName, lastName: form.lastName, phone: form.workPhone, email: form.email } : {}) });
            }}
          />
          Same as Primary Contact entered in Step 1
        </label>

        <div className="field-row">
          <Field label="First Name" required><input type="text" value={form.invoicing.firstName} onChange={(e) => upInvoicing({ firstName: e.target.value })} /></Field>
          <Field label="Last Name" required><input type="text" value={form.invoicing.lastName} onChange={(e) => upInvoicing({ lastName: e.target.value })} /></Field>
        </div>
        <Field label="Phone" required><input type="tel" value={form.invoicing.phone} onChange={(e) => upInvoicing({ phone: e.target.value })} /></Field>
        <Field label="Email" required><input type="email" value={form.invoicing.email} onChange={(e) => upInvoicing({ email: e.target.value })} /></Field>

        <div className="section-title" style={{ fontSize: 14, marginBottom: 10 }}>Billing Address</div>
        <Field label="Street Address" required><input type="text" value={form.invoicing.streetAddress} onChange={(e) => upInvoicing({ streetAddress: e.target.value })} /></Field>
        <div className="field-row-3">
          <Field label="City" required><input type="text" value={form.invoicing.city} onChange={(e) => upInvoicing({ city: e.target.value })} /></Field>
          <Field label="State" required>
            <select value={form.invoicing.state} onChange={(e) => upInvoicing({ state: e.target.value })}>
              <option value="">Select State</option>
              {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="ZIP Code" required><input type="text" value={form.invoicing.zip} onChange={(e) => upInvoicing({ zip: e.target.value })} /></Field>
        </div>
      </div>
    </div>
  );
}