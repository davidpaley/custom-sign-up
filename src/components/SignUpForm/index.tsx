import React, { useCallback, useEffect, useState } from "react";
import { SignUpData } from "../../models";
import styles from "./index.module.css";
import { validateForm } from "../../utils";
import { useGetStates } from "../../hooks/useGetStates";
import { useGetCities } from "../../hooks/useGetCities";
import { FormUI } from "./FormUI";
import { sendData } from "../../services";

const ERRORS_INITIALIZATION = {
  firstName: "",
  lastName: "",
  state: "",
  city: "",
  email: "",
  password: "",
};

export const SingUpForm: React.FC<{ authToken: string }> = ({
  authToken,
}: {
  authToken: string;
}) => {
  const [formData, setFormData] = useState<SignUpData>({
    firstName: "",
    lastName: "",
    state: "",
    city: "",
    email: "",
    password: "",
  });
  const { isLoading: isStatesLoading, states } = useGetStates(authToken);
  const { cities, isLoading: isCitiesLoading } = useGetCities(
    authToken,
    formData.state
  );

  const [errors, setErrors] = useState<Partial<SignUpData>>(
    ERRORS_INITIALIZATION
  );
  const [submitedButtonClicked, setSubmitedButtonClicked] = useState(false);

  const formDataStringified = JSON.stringify(formData);

  const handleValidateForm = useCallback(() => {
    const formData: SignUpData = JSON.parse(formDataStringified);
    const validationErrors = validateForm(formData);
    const amountOfErrors = Object.keys(validationErrors).length > 0;
    setErrors(amountOfErrors ? validationErrors : ERRORS_INITIALIZATION);

    return !!amountOfErrors;
  }, [formDataStringified]);

  useEffect(() => {
    handleValidateForm();
  }, [formDataStringified, handleValidateForm]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      state: value,
      city: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitedButtonClicked) setSubmitedButtonClicked(true);
    const isThereErrors = handleValidateForm();

    if (!isThereErrors) {
      sendData(formData);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <FormUI
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        submitedButtonClicked={submitedButtonClicked}
        errors={errors}
        isStatesLoading={isStatesLoading}
        states={states}
        isCitiesLoading={isCitiesLoading}
        cities={cities}
        handleStateChange={handleStateChange}
      />
    </div>
  );
};
