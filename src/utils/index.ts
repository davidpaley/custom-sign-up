import { SignUpData } from "../models";

export const validateForm = (formData: SignUpData) => {
  const validationErrors: Partial<SignUpData> = {};

  // Validate required fields
  for (const key in formData) {
    if (formData.hasOwnProperty(key)) {
      if (!formData[key as keyof SignUpData]) {
        validationErrors[key as keyof SignUpData] = `This field is required`;
      }
    }
  }

  // Validate email format
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailPattern.test(formData.email)) {
    validationErrors.email = "Invalid email format";
  }
  return validationErrors;
};
