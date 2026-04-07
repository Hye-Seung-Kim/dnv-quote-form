export function formatPhoneNumber(value = "") {
    const digits = value.replace(/\D/g, "").slice(0, 10);
  
    const area = digits.slice(0, 3);
    const middle = digits.slice(3, 6);
    const last = digits.slice(6, 10);
  
    if (digits.length <= 3) return area;
    if (digits.length <= 6) return `(${area}) ${middle}`;
    return `(${area}) ${middle} - ${last}`;
  }
  
  export function getPhoneDigits(value = "") {
    return value.replace(/\D/g, "");
  }
  
  export function isValidPhone(value = "") {
    return getPhoneDigits(value).length === 10;
  }
  
  export function isValidEmail(value = "") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
  }
  
  export function isNonEmpty(value) {
    return String(value ?? "").trim() !== "";
  }
  
  export function isValidZip(value = "") {
    return /^\d{5}(-\d{4})?$/.test(String(value).trim());
  }