import { createContext, useContext, useState } from "react";

function initFormData() {
  return {
    // Step 1
    legalEntityName: "",
    dbaName: "",
    dbaSameAsLegal: false,
    firstName: "",
    lastName: "",
    title: "",
    workPhone: "",
    cellPhone: "",
    email: "",
    emailVerified: false,
    // Step 2
    facilityType: "",
    // Step 3
    ceo: { sameAsPrimary: false, firstName: "", lastName: "", phone: "", email: "" },
    directorOfQuality: { sameAsPrimary: false, firstName: "", lastName: "", phone: "", email: "" },
    invoicing: {
      sameAsPrimary: false,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
    },
    // Step 4
    siteType: "",
    uploadedFiles: [],
    // Step 5
    selectedServices: [],
    otherService: "",
    showOtherService: false,
    standards: [],
    expirationDate: "",
    applicationDate: "",
    thrombolyticDates: [],
    thrombectomyDates: [],
    // Step 6
    certified: false,
  };
}

export const FormContext = createContext();

export function FormProvider({ children }) {
  const [form, setForm] = useState(initFormData());
  return (
    <FormContext.Provider value={{ form, setForm }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  return useContext(FormContext);
}