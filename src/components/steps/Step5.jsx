import { useMemo, useState } from "react";
import { useForm } from "../../context/FormContext";
import Field from "../Field";

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="6.5" cy="6.5" r="5.5" stroke="#9CA3AF" strokeWidth="1.5" />
      <path
        d="M10.5 10.5L14 14"
        stroke="#9CA3AF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SERVICE_CATEGORIES = [
  {
    name: "Emergency & Critical Care",
    services: [
      "Emergency Department",
      "Neonatal Intensive Care Services",
      "Pediatric Intensive Care Services",
      "Pediatric Intensive Care Services (PICU)",
    ],
  },
  {
    name: "Cardiac Services",
    services: ["Cardiac Catheterization Laboratory", "Open Heart"],
  },
  {
    name: "Diagnostic Services",
    services: [
      "Magnetic Resonance Imaging (MRI)",
      "Diagnostic Radioisotope Facility",
      "Lithotripsy",
    ],
  },
  {
    name: "Rehabilitation Services",
    services: [
      "Physical Rehabilitation Services",
      "Physical Therapy",
      "Occupational Therapy",
      "Speech/Language Therapy",
      "Audiology",
    ],
  },
];

// 메인 화면에 보이는 3개 카테고리
const MAIN_CATEGORIES = SERVICE_CATEGORIES.slice(0, 3);

// Standards 옵션
const STANDARDS_OPTIONS = ["Action1", "Action2", "Action3", "Action4", "Action5"];

const SERVICE_TABS = [
  "All Services",
  "Clinical",
  "Surgical",
  "Diagnostic",
  "Rehabilitation",
  "Specialty",
];

function formatDateLabel(value) {
  if (!value) return "";
  const [y, m, d] = value.split("-");
  if (!y || !m || !d) return value;
  return `${m}/${d}/${y}`;
}

// 날짜 선택 즉시 태그 추가 (Add 버튼 없음)
function MultiDateField({ label, values, onAdd, onRemove }) {
  return (
    <Field label={label}>
      <div className="multi-date-field">
        <div className="multi-date-input-wrap">
          <input
            type="date"
            onChange={(e) => {
              if (e.target.value) {
                onAdd(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
        <div className="date-tags">
          {values.map((d, i) => (
            <span key={`${d}-${i}`} className="date-tag">
              {formatDateLabel(d)}
              <button
                type="button"
                className="tag-x"
                onClick={() => onRemove(i)}
                aria-label={`Remove ${formatDateLabel(d)}`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>
    </Field>
  );
}

export default function Step5() {
  const { form, setForm } = useForm();

  // view: "main" | "addOther"
  const [view, setView] = useState("main");
  const [activeTab, setActiveTab] = useState("All Services");
  const [search, setSearch] = useState("");
  const [otherSearch, setOtherSearch] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);

  const toggleSvc = (svc) =>
    setForm((f) => ({
      ...f,
      selectedServices: f.selectedServices.includes(svc)
        ? f.selectedServices.filter((s) => s !== svc)
        : [...f.selectedServices, svc],
    }));

  const toggleStd = (std) =>
    setForm((f) => ({
      ...f,
      standards: f.standards.includes(std)
        ? f.standards.filter((s) => s !== std)
        : [...f.standards, std],
    }));

  const addDateItem = (field, value) => {
    if (!value) return;
    setForm((f) => {
      if (f[field].includes(value)) return f;
      return { ...f, [field]: [...f[field], value] };
    });
  };

  const removeDateItem = (field, idx) =>
    setForm((f) => ({
      ...f,
      [field]: f[field].filter((_, i) => i !== idx),
    }));

  // 메인 화면 검색 필터 (3개 카테고리)
  const filteredMain = useMemo(() => {
    return MAIN_CATEGORIES.map((cat) => ({
      ...cat,
      services: cat.services.filter((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      ),
    })).filter((cat) => cat.services.length > 0);
  }, [search]);

  // Add Other Service 화면 검색 필터 (4개 카테고리)
  const filteredAll = useMemo(() => {
    return SERVICE_CATEGORIES.map((cat) => ({
      ...cat,
      services: cat.services.filter((s) =>
        s.toLowerCase().includes(otherSearch.toLowerCase())
      ),
    })).filter((cat) => cat.services.length > 0);
  }, [otherSearch]);

  // ── Add Other Service 화면 ──
  if (view === "addOther") {
    return (
      <div className="card">
        <div className="section-title">Primary Contact Information</div>
        <div className="section-sub">Primary contact receives all DNV Healthcare official communications</div>

        {/* 탭 */}
        <div className="services-tabs">
          {SERVICE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`svc-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 검색 */}
        <div className="search-wrap">
          <input
            className="svc-search"
            placeholder="Search services..."
            value={otherSearch}
            onChange={(e) => setOtherSearch(e.target.value)}
            autoFocus
          />
          <span className="search-icon"><SearchIcon /></span>
        </div>

        {/* 4개 카테고리 전부 표시 (Rehabilitation 포함) */}
        <div className="svc-grid">
          {filteredAll.map((cat) => (
            <div key={cat.name} className="svc-category">
              <div className="svc-cat-title">{cat.name}</div>
              {cat.services.map((svc) => (
                <label key={svc} className="svc-cb">
                  <input
                    type="checkbox"
                    checked={form.selectedServices.includes(svc)}
                    onChange={() => toggleSvc(svc)}
                  />
                  <span>{svc}</span>
                </label>
              ))}
            </div>
          ))}
        </div>

        {/* 커스텀 Other Service 텍스트 입력 */}
        <button
          type="button"
          className="btn-add-other"
          onClick={() => setShowOtherInput(true)}
        >
          + Add Other Service
        </button>

        {showOtherInput && (
          <div className="sub-card" style={{ marginBottom: 20 }}>
            <div className="sub-card-title">Other Service</div>
            <div className="other-svc-row">
              <input
                type="text"
                placeholder="Specify other service"
                value={form.otherService}
                onChange={(e) =>
                  setForm((f) => ({ ...f, otherService: e.target.value }))
                }
              />
              <button
                type="button"
                className="btn-x-red"
                onClick={() => {
                  setShowOtherInput(false);
                  setForm((f) => ({ ...f, otherService: "" }));
                }}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* 메인 화면으로 돌아가기 */}
        <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 24 }}>
          <button
            type="button"
            className="btn-outline"
            onClick={() => {
              setOtherSearch("");
              setShowOtherInput(false);
              setView("main");
            }}
          >
            ← Back to Service Offering
          </button>
        </div>
      </div>
    );
  }

  // ── 메인 화면 (3개 카테고리 + Standards + 날짜) ──
  return (
    <div className="card">
      <div className="section-title">Service Offering</div>
      <div className="section-sub">Primary Site Service offering</div>

      {/* 탭 */}
      <div className="services-tabs">
        {SERVICE_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`svc-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 검색 */}
      <div className="search-wrap">
        <input
          className="svc-search"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="search-icon"><SearchIcon /></span>
      </div>

      {/* 3개 카테고리만 표시 */}
      <div className="svc-grid">
        {filteredMain.map((cat) => (
          <div key={cat.name} className="svc-category">
            <div className="svc-cat-title">{cat.name}</div>
            {cat.services.map((svc) => (
              <label key={svc} className="svc-cb">
                <input
                  type="checkbox"
                  checked={form.selectedServices.includes(svc)}
                  onChange={() => toggleSvc(svc)}
                />
                <span>{svc}</span>
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* Add Other Service → addOther 화면으로 이동 */}
      <button
        type="button"
        className="btn-add-other"
        onClick={() => {
          setSearch("");
          setShowOtherInput(true);
          setView("addOther");
        }}
      >
        + Add Other Service
      </button>

      <hr className="divider" />

      {/* Standards to Apply (Action1~5) */}
      <div className="section-title" style={{ marginBottom: 12 }}>
        Standards to Apply
      </div>

      <Field label="">
        <select
          onChange={(e) => {
            if (e.target.value) {
              toggleStd(e.target.value);
              e.target.value = "";
            }
          }}
          defaultValue=""
        >
          <option value="">Select Standard(s)</option>
          {STANDARDS_OPTIONS.filter((s) => !form.standards.includes(s)).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="tags">
          {form.standards.map((s) => (
            <span key={s} className="action-tag">
              {s}
              <button
                type="button"
                className="tag-x"
                onClick={() => toggleStd(s)}
                aria-label={`Remove ${s}`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </Field>

      {/* 날짜 필드 */}
      <div className="field-row">
        <Field label="Expiration Date of Current Stroke Certification">
          <input
            type="date"
            value={form.expirationDate}
            onChange={(e) =>
              setForm((f) => ({ ...f, expirationDate: e.target.value }))
            }
          />
        </Field>

        <Field label="Date of Application">
          <input
            type="date"
            value={form.applicationDate}
            onChange={(e) =>
              setForm((f) => ({ ...f, applicationDate: e.target.value }))
            }
          />
        </Field>
      </div>

      {/* MultiDate 필드 — 날짜 선택 즉시 자동 추가, Add 버튼 없음 */}
      <MultiDateField
        label="Dates of last twenty-five thrombolytic administrations"
        values={form.thrombolyticDates}
        onAdd={(value) => addDateItem("thrombolyticDates", value)}
        onRemove={(idx) => removeDateItem("thrombolyticDates", idx)}
      />

      <MultiDateField
        label="Dates of last fifteen thrombectomies"
        values={form.thrombectomyDates}
        onAdd={(value) => addDateItem("thrombectomyDates", value)}
        onRemove={(idx) => removeDateItem("thrombectomyDates", idx)}
      />
    </div>
  );
}
