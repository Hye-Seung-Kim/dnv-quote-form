import { useState } from "react";
import { useForm } from "../../context/FormContext";

// ── 아코디언 섹션 ──
function AccordionSection({ title, open, onToggle, onEdit, children }) {
  return (
    <div className="review-section">
      <div
        className="review-section-header"
        onClick={onToggle}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ChevronIcon open={open} />
          <span>{title}</span>
        </div>
        <button
          className="btn-edit"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          Edit
        </button>
      </div>
      {open && <div className="review-section-body">{children}</div>}
    </div>
  );
}

// ── 체크론 SVG 아이콘 ──
function ChevronIcon({ open }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: "transform 0.2s",
        transform: open ? "rotate(0deg)" : "rotate(180deg)",
        flexShrink: 0,
      }}
    >
      <path
        d="M2 9L7 4L12 9"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── 리뷰 행 (하단 구분선 포함) ──
function ReviewRow({ label, value, children }) {
  return (
    <div className="review-row">
      <span className="review-label">{label}</span>
      <span className="review-value">{children ?? value ?? "—"}</span>
    </div>
  );
}

// ── 연락처 카드 ──
function ContactCard({ name, role, workPhone, cellPhone, email, emailVerified, address }) {
  return (
    <div className="contact-card">
      {name && <div className="contact-name">{name}</div>}
      {role && <div className="contact-meta">{role}</div>}
      {(workPhone || cellPhone) && (
        <div className="contact-meta">
          {workPhone && `Work: ${workPhone}`}
          {workPhone && cellPhone && " | "}
          {cellPhone && `Cell: ${cellPhone}`}
        </div>
      )}
      {email && (
        <div className="contact-meta contact-email-row">
          <span>Email: {email}</span>
          {emailVerified && (
            <span className="verify-badge is-ok">Verified</span>
          )}
        </div>
      )}
      {address && <div className="contact-meta">Address: {address}</div>}
    </div>
  );
}

export default function Step6({ goToStep }) {
  const { form, setForm } = useForm();

  const [open, setOpen] = useState({
    basic: true,
    facility: true,
    leadership: true,
    site: true,
    services: true,
  });

  const toggle = (key) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

    // Step6 컴포넌트 상단에 추가 (Step 1에서 저장한다고 가정된 필드들)
  const facilityAddress = [
    form.streetAddress,
    form.city,
    form.state,
    form.zip,
  ].filter(Boolean).join(", ");

  
  const billingAddress = [
    form.invoicing?.streetAddress,
    form.invoicing?.city,
    form.invoicing?.state,
    form.invoicing?.zip,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <div className="card">
        <div className="section-title">Hospital Information</div>
        <div style={{ height: 16 }} />

        {/* ── Basic Information ── */}
        <AccordionSection
          title="Basic Information"
          open={open.basic}
          onToggle={() => toggle("basic")}
          onEdit={() => goToStep(0)}
        >
          <ReviewRow label="Legal Entity Name" value={form.legalEntityName} />
          <ReviewRow label="d/b/a Name" value={form.dbaName} />
          <ReviewRow label="Primary Contact">
            <ContactCard
              name={`${form.firstName ?? ""} ${form.lastName ?? ""}`.trim()}
              role={form.title}
              workPhone={form.workPhone}
              cellPhone={form.cellPhone}
              email={form.email}
              emailVerified={form.emailVerified}
            />
          </ReviewRow>
        </AccordionSection>

        {/* ── Facility Details ── */}
        <AccordionSection
          title="Facility Details"
          open={open.facility}
          onToggle={() => toggle("facility")}
          onEdit={() => goToStep(1)}
        >
          <ReviewRow label="Facility Type" value={form.facilityType} />
        </AccordionSection>

        {/* ── Leadership Contacts ── */}
        <AccordionSection
          title="Leadership Contacts"
          open={open.leadership}
          onToggle={() => toggle("leadership")}
          onEdit={() => goToStep(2)}
        >
          {/* 1. CEO 부분: phone -> workPhone으로 매핑 */}
          <ReviewRow label="CEO">
            <ContactCard
              name={`${form.ceo?.firstName ?? ""} ${form.ceo?.lastName ?? ""}`.trim()}
              workPhone={form.ceo?.phone} 
              email={form.ceo?.email}
            />
          </ReviewRow>

          {/* 2. 품질 담당자: phone -> workPhone으로 매핑 */}
          <ReviewRow label="Director of Quality">
            <ContactCard
              name={`${form.directorOfQuality?.firstName ?? ""} ${form.directorOfQuality?.lastName ?? ""}`.trim()}
              workPhone={form.directorOfQuality?.phone}
              email={form.directorOfQuality?.email}
            />
          </ReviewRow>

          {/* 3. 송장 담당자: billingAddress 변수를 address prop으로 전달 */}
          <ReviewRow label="Invoicing Contact">
            <ContactCard
              name={`${form.invoicing?.firstName ?? ""} ${form.invoicing?.lastName ?? ""}`.trim()}
              role={form.invoicing?.title} // Step3에 title 입력이 있다면 표시됨
              workPhone={form.invoicing?.phone}
              email={form.invoicing?.email}
              address={billingAddress} // 상단에서 정의한 billingAddress 변수 전달
            />
          </ReviewRow>
        </AccordionSection>

        {/* ── Site Information ── */}
        <AccordionSection
          title="Site Information"
          open={open.site}
          onToggle={() => toggle("site")}
          onEdit={() => goToStep(3)}
        >
          <ReviewRow
            label="Site Configuration"
            value={form.siteType === "multiple" ? `Multiple Locations (${form.sites?.length || 0} sites)` : "Single Location"}
          />
          
          {/* Input Method와 카드 리스트를 하나의 ReviewRow에서 처리하거나 구조를 분리합니다 */}
          <ReviewRow label="Input Method">
            <div className="site-review-content">
              <div className="input-method-value">File Upload</div>
              
              <div className="site-location-list-container">
                {form.siteType === "multiple" && form.sites?.length > 0 ? (
                  form.sites.map((site, idx) => (
                    <div key={idx} className="site-location-card-styled">
                      <div className="site-card-header">{site.siteName || `Practice Location ${idx + 1}`}</div>
                      <div className="site-card-address">{site.address}</div>
                      <div className="site-card-details">
                        FTEs: {site.ftes} | Shifts: {site.shifts} | Miles to Main: {site.milesToMain}
                      </div>
                      <div className="site-card-days">
                        Days Open: {site.daysOpen}
                      </div>
                    </div>
                  ))
                ) : null}
              </div>
            </div>
          </ReviewRow>
        </AccordionSection>

        {/* ── Services & Certifications ── */}
        <AccordionSection
          title="Services & Certifications"
          open={open.services}
          onToggle={() => toggle("services")}
          onEdit={() => goToStep(4)}
        >
          <ReviewRow label="Services Provided">
            <div className="review-tag-list">
              {(form.selectedServices || []).length ? (
                form.selectedServices.map((item) => (
                  <span key={item} className="review-tag-outline">{item}</span>
                ))
              ) : (
                <span>—</span>
              )}
            </div>
          </ReviewRow>

          <ReviewRow label="Standards to Apply">
            <div className="review-tag-list">
              {(form.standards || []).length ? (
                form.standards.map((item) => (
                  <span key={item} className="review-tag-outline">{item}</span>
                ))
              ) : (
                <span>—</span>
              )}
            </div>
          </ReviewRow>

          <ReviewRow label="Date of Application" value={form.applicationDate || "—"} />

          <ReviewRow
            label="Expiration Date of Current Stroke Certification"
            value={form.expirationDate || "—"}
          />

          <ReviewRow label="Dates of last twenty-five thrombolytic administrations">
            <div className="review-date-links">
              {(form.thrombolyticDates || []).length
                ? form.thrombolyticDates.join(", ")
                : "—"}
            </div>
          </ReviewRow>

          <ReviewRow label="Dates of last fifteen thrombectomies">
            <div className="review-date-links">
              {(form.thrombectomyDates || []).length
                ? form.thrombectomyDates.join(", ")
                : "—"}
            </div>
          </ReviewRow>
        </AccordionSection>
      </div>

      {/* ── Ready to Submit ── */}
      <div className="ready-box">
        <div className="ready-title">Ready to Submit?</div>
        <label className="cb-wrap">
          <input
            type="checkbox"
            checked={form.certified}
            onChange={(e) =>
              setForm((f) => ({ ...f, certified: e.target.checked }))
            }
          />
          I certify that all information provided is accurate and complete to
          the best of my knowledge
        </label>
        <p className="ready-note">
          By submitting this form, you agree to our terms and conditions. DNV
          will review your application and contact you within 2-3 business days.
        </p>
        <div className="ready-actions">
          <button className="btn-outline">Download as PDF</button>
          <button className="btn-outline">Export to CSV</button>
        </div>
      </div>
    </>
  );
}
