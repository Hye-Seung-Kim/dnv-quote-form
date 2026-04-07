import {
    isNonEmpty,
    isValidEmail,
    isValidPhone,
    isValidZip,
  } from "./formUtils";
  
  export function validateStep1(form) {
    const errors = {};
  
    if (!isNonEmpty(form.legalEntityName)) errors.legalEntityName = "Legal Entity Name";
    if (!isNonEmpty(form.dbaName)) errors.dbaName = "Doing Business As (d/b/a) Name";
    if (!isNonEmpty(form.firstName)) errors.firstName = "First Name";
    if (!isNonEmpty(form.lastName)) errors.lastName = "Last Name";
    if (!isNonEmpty(form.title)) errors.title = "Title";
  
    if (!isNonEmpty(form.workPhone)) {
      errors.workPhone = "Work Phone";
    } else if (!isValidPhone(form.workPhone)) {
      errors.workPhone = "Work Phone";
    }
  
    if (isNonEmpty(form.cellPhone) && !isValidPhone(form.cellPhone)) {
      errors.cellPhone = "Cell Phone";
    }
  
    if (!isNonEmpty(form.email)) {
      errors.email = "Email";
    } else if (!isValidEmail(form.email)) {
      errors.email = "Email";
    }
  
    if (!form.emailVerified) {
      errors.emailVerified = "Email verification";
    }
  
    return errors;
  }
  
  export function validateStep2(form) {
    const errors = {};
  
    if (!isNonEmpty(form.facilityType)) {
      errors.facilityType = "Facility Type";
    }
  
    return errors;
  }
  
  export function validateStep3(form) {
    const errors = {};
  
    if (!isNonEmpty(form.ceo?.firstName)) errors.ceoFirstName = "CEO First Name";
    if (!isNonEmpty(form.ceo?.lastName)) errors.ceoLastName = "CEO Last Name";
  
    if (!isNonEmpty(form.ceo?.phone)) {
      errors.ceoPhone = "CEO Phone";
    } else if (!isValidPhone(form.ceo?.phone)) {
      errors.ceoPhone = "CEO Phone";
    }
  
    if (!isNonEmpty(form.ceo?.email)) {
      errors.ceoEmail = "CEO Email";
    } else if (!isValidEmail(form.ceo?.email)) {
      errors.ceoEmail = "CEO Email";
    }
  
    if (!isNonEmpty(form.invoicing?.firstName)) errors.invoicingFirstName = "Invoicing First Name";
    if (!isNonEmpty(form.invoicing?.lastName)) errors.invoicingLastName = "Invoicing Last Name";
  
    if (!isNonEmpty(form.invoicing?.phone)) {
      errors.invoicingPhone = "Invoicing Phone";
    } else if (!isValidPhone(form.invoicing?.phone)) {
      errors.invoicingPhone = "Invoicing Phone";
    }
  
    if (!isNonEmpty(form.invoicing?.email)) {
      errors.invoicingEmail = "Invoicing Email";
    } else if (!isValidEmail(form.invoicing?.email)) {
      errors.invoicingEmail = "Invoicing Email";
    }
  
    if (!isNonEmpty(form.invoicing?.streetAddress)) errors.invoicingStreetAddress = "Billing Street Address";
    if (!isNonEmpty(form.invoicing?.city)) errors.invoicingCity = "Billing City";
    if (!isNonEmpty(form.invoicing?.state)) errors.invoicingState = "Billing State";
  
    if (!isNonEmpty(form.invoicing?.zip)) {
      errors.invoicingZip = "Billing ZIP Code";
    } else if (!isValidZip(form.invoicing?.zip)) {
      errors.invoicingZip = "Billing ZIP Code";
    }
  
    return errors;
  }
  
  export function validateStep4(form) {
    const errors = {};
  
    if (!isNonEmpty(form.siteType)) {
      errors.siteType = "Site Configuration";
      return errors;
    }
  
    if (form.siteType === "multiple") {
      if (!form.uploadedFiles || form.uploadedFiles.length === 0) {
        errors.uploadedFiles = "Uploaded Site File";
      }
    } else {
      if (!isNonEmpty(form.siteInfo?.practiceName)) errors.practiceName = "Practice Name";
      if (!isNonEmpty(form.siteInfo?.streetAddress)) errors.siteStreetAddress = "Street Address";
      if (!isNonEmpty(form.siteInfo?.city)) errors.siteCity = "City";
      if (!isNonEmpty(form.siteInfo?.state)) errors.siteState = "State";
  
      if (!isNonEmpty(form.siteInfo?.zip)) {
        errors.siteZip = "ZIP Code";
      } else if (!isValidZip(form.siteInfo?.zip)) {
        errors.siteZip = "ZIP Code";
      }
    }
  
    return errors;
  }
  
  export function validateStep5(form) {
    const errors = {};
  
    if (!form.selectedServices?.length) errors.selectedServices = "Services Provided";
    if (!form.standards?.length) errors.standards = "Standards to Apply";
    if (!isNonEmpty(form.applicationDate)) errors.applicationDate = "Date of Application";
  
    return errors;
  }
  
  export function getStepErrors(stepIndex, form) {
    switch (stepIndex) {
      case 0:
        return validateStep1(form);
      case 1:
        return validateStep2(form);
      case 2:
        return validateStep3(form);
      case 3:
        return validateStep4(form);
      case 4:
        return validateStep5(form);
      default:
        return {};
    }
  }