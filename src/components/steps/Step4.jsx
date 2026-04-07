import { useRef } from "react";
import { useForm } from "../../context/FormContext";
import Papa from "papaparse";

export default function Step4() {
  const { form, setForm } = useForm();
  const fileRef = useRef();
  const uploadTimers = useRef({});

// Step4.jsx 내부

const handleFiles = (files) => {
  const fileArray = Array.from(files);

  fileArray.forEach((file) => {
    const id = `${file.name}-${Date.now()}`;
    
    // 1. UI 업로드 상태 표시용 데이터 추가
    const newFile = {
      id,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(1) + "MB",
      status: "uploading",
      progress: 0,
    };

    setForm((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, newFile],
    }));

    // 2. CSV 파싱 로직 (PapaParse 사용)
    // 참고: PapaParse는 가급적 컴포넌트 밖에서 import Papa from "papaparse" 되어있어야 합니다.
    Papa.parse(file, {
      header: true,         // CSV의 첫 줄을 키(Key)로 사용
      skipEmptyLines: true, // 빈 줄 무시
      complete: (results) => {
        console.log("Parsed Data:", results.data); // 데이터 확인용

        // 3. progress를 100으로 만들고, 데이터를 form.sites에 저장
        setForm((prev) => ({
          ...prev,
          // 파일 업로드 상태 업데이트
          uploadedFiles: prev.uploadedFiles.map((f) =>
            f.id === id ? { ...f, status: "done", progress: 100 } : f
          ),
          // 파싱된 실제 데이터 저장 (기존 데이터에 추가)
          sites: [...(prev.sites || []), ...results.data],
        }));
      },
      error: (err) => {
        console.error("Parsing Error:", err);
      }
    });
  });
};

  const removeFile = (id) => {
    if (uploadTimers.current[id]) {
      clearInterval(uploadTimers.current[id]);
      delete uploadTimers.current[id];
    }

    setForm((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((f) => f.id !== id),
    }));
  };

  return (
    <div className="card">
      <div className="section-title">Do you have multiple sites or locations?</div>
      <div style={{ height: 14 }} />

      <div className="site-cards">
        {[
          { key: "single", title: "Single Location", sub: "We operate from one facility only" },
          { key: "multiple", title: "Multiple Locations", sub: "We have multiple facilities or practice locations" },
        ].map((opt) => (
          <div
            key={opt.key}
            className={`site-card ${form.siteType === opt.key ? "selected" : ""}`}
            onClick={() => setForm((f) => ({ ...f, siteType: opt.key }))}
          >
            <div className="site-card-title">{opt.title}</div>
            <div className="site-card-sub">{opt.sub}</div>
          </div>
        ))}
      </div>

      {form.siteType === "multiple" && (
        <div style={{ marginTop: 24 }}>
          <div className="section-title" style={{ fontSize: 15, marginBottom: 12 }}>
            How would you like to add your site information?
          </div>

          <div className="site-card selected" style={{ marginBottom: 16 }}>
            <div className="site-card-title">Upload CSV / Excel</div>
            <div className="site-card-sub">Upload a spreadsheet with all site information</div>
          </div>

          <div className="upload-panel">
            <div
              className="upload-zone"
              onClick={() => fileRef.current.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFiles(e.dataTransfer.files);
              }}
            >
              <div className="upload-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22 46C14.8 46 9 40.2 9 33C9 26.6 13.6 21.2 19.8 20.2C22 12.4 29 7 37.2 7C47.2 7 55.4 15 56 24.8C61 26.2 64.8 30.8 64.8 36.2C64.8 42.8 59.4 48 52.8 48H43.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M32 50V25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path
                    d="M23 34L32 25L41 34"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="upload-title">Upload Site Information</div>
              <div className="upload-sub">
                Drag and drop your CSV or Excel file here, or click to select
              </div>

              <div className="upload-actions">
                <button
                  type="button"
                  className="btn-select-file"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileRef.current.click();
                  }}
                >
                  Select file
                </button>

                <button
                  type="button"
                  className="btn-download-template"
                  onClick={(e) => e.stopPropagation()}
                >
                  Download CSV Template
                </button>
              </div>
            </div>

            <input
              type="file"
              ref={fileRef}
              accept=".csv,.xlsx,.xls"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
            />

            {form.uploadedFiles.length > 0 && (
              <div className="uploaded-list">
                <div className="uploaded-heading">Uploaded</div>

                {form.uploadedFiles.map((f) =>
                  f.status === "done" ? (
                    <div key={f.id} className="uploaded-file-card uploaded-file-card--done">
                      <div className="uploaded-file-left">
                        <div className="file-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M8 3H14L19 8V20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20V4C5 3.4 5.4 3 6 3H8Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14 3V8H19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
                            <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M8 16H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>

                        <div className="uploaded-file-info">
                          <div className="uploaded-file-meta">
                            <span className="uploaded-file-name">{f.name}</span>
                            <span className="uploaded-file-dot">•</span>
                            <button type="button" className="uploaded-preview-btn">
                              Preview
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="uploaded-file-size">{f.size}</div>
                    </div>
                  ) : (
                    <div key={f.id} className="uploaded-file-card uploaded-file-card--uploading">
                      <button
                        type="button"
                        className="uploaded-remove-floating"
                        onClick={() => removeFile(f.id)}
                        aria-label={`Remove ${f.name}`}
                      >
                        ✕
                      </button>

                      <div className="uploaded-file-left uploaded-file-left--top">
                        <div className="file-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M8 3H14L19 8V20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20V4C5 3.4 5.4 3 6 3H8Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14 3V8H19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
                            <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M8 16H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>

                        <div className="uploaded-file-info uploaded-file-info--stack">
                          <div className="uploaded-file-row">
                            <span className="uploaded-file-name muted">{f.name}</span>
                            <span className="uploaded-file-size">{f.size}</span>
                          </div>

                          <div className="upload-progress">
                            <div
                              className="upload-progress-bar"
                              style={{ width: `${f.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}