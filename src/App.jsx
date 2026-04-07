import { useState } from "react";
import { FormProvider } from "./context/FormContext";
import { useForm } from "./context/FormContext";
import ProgressBar from "./components/ProgressBar";
import Step1 from "./components/steps/Step1";
import Step2 from "./components/steps/Step2";
import Step3 from "./components/steps/Step3";
import Step4 from "./components/steps/Step4";
import Step5 from "./components/steps/Step5";
import Step6 from "./components/steps/Step6";
import "./styles/global.css";

const STEP_TITLES = [
  "New DNV Quote Request",
  "Facility Details",
  "Leadership Contacts",
  "Site Information",
  "Services & Certifications",
  "Review & Submit",
];

function FormApp() {
  const [step, setStep] = useState(0);
  const { form } = useForm();

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const goToStep = (s) => setStep(s);

  const handleSubmit = () => {
    console.log("DNV Form Payload:", JSON.stringify(form, null, 2));
    alert("Application submitted! Check the console for the payload.");
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <span className="navbar-brand">DNV Healthcare</span>
        <div className="navbar-user">
          <div className="avatar">KM</div>
          <span>Katherine Martinez</span>
        </div>
      </nav>

      {/* Main content */}
      <main className="main">
        <div className="step-header">
          <h1 className="step-title">{STEP_TITLES[step]}</h1>
          <span className="step-count">Step {step + 1} of {STEP_TITLES.length}</span>
        </div>
        <ProgressBar currentStep={step} />

        {step === 0 && <Step1 />}
        {step === 1 && <Step2 />}
        {step === 2 && <Step3 />}
        {step === 3 && <Step4 />}
        {step === 4 && <Step5 />}
        {step === 5 && <Step6 goToStep={goToStep} />}

        {/* Footer nav inside main */}
        <div className="footer">
          <div>
            {step === 0 ? (
              <button className="btn-outline">Exit</button>
            ) : (
              <button className="btn-outline" onClick={prev}>Previous</button>
            )}
          </div>
          <div className="footer-right">
          {/* 마지막 단계(Step 6, 인덱스 5)가 아닐 때만 Save 버튼 노출 */}
          {step < 5 && <button className="btn-primary">Save</button>}

          {step < 5 ? (
            <button className="btn-primary" onClick={next}>Continue</button>
          ) : (
            /* Step 6일 때는 아래 버튼만 렌더링됨 */
            <button className="btn-primary" onClick={handleSubmit} disabled={!form.certified}>
              Submit Application
            </button>
          )}
        </div>
        </div>
      </main>

      {/* Support Chat — always visible, fixed */}
      <button type="button" className="support-chat">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M15.5 18.5H8.5C6 18.5 4 16.5 4 14V10C4 7.5 6 5.5 8.5 5.5H12.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 5.5V4.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M8.5 19.5V18.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M4 10H3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M4 14H3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M18.5 9.5L19 10.7L20.2 11.2L19 11.7L18.5 12.9L18 11.7L16.8 11.2L18 10.7L18.5 9.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.5 8.5C15.6046 8.5 16.5 7.60457 16.5 6.5C16.5 5.39543 15.6046 4.5 14.5 4.5C13.3954 4.5 12.5 5.39543 12.5 6.5C12.5 7.60457 13.3954 8.5 14.5 8.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M11.5 14.5C11.5 12.8431 12.8431 11.5 14.5 11.5C16.1569 11.5 17.5 12.8431 17.5 14.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>

        <span>Support Chat</span>
      </button>
    </div>
  );
}

export default function App() {
  return (
    <FormProvider>
      <FormApp />
    </FormProvider>
  );
}