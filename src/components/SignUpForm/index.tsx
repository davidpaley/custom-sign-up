import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../FormComponents/Input";
import { SignUpData } from "../../models";
import styles from "./index.module.css";
import { Select } from "../FormComponents/Select";
import { Button } from "../FormComponents/Button";
import { validateForm } from "../../utils";
import { useGetStates } from "../../hooks/useGetStates";
import { useGetCities } from "../../hooks/useGetCities";

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
    if (amountOfErrors) {
      setErrors(validationErrors);
    } else {
      setErrors(ERRORS_INITIALIZATION);
    }
    return !!amountOfErrors;
  }, [formDataStringified]);

  useEffect(() => {
    handleValidateForm();
  }, [formDataStringified, handleValidateForm]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, state: value, city: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitedButtonClicked) setSubmitedButtonClicked(true);
    const isThereErrors = handleValidateForm();

    if (!isThereErrors) {
      console.log({
        ...formData,
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <Input
            name="firstName"
            value={formData.firstName}
            label={"First Name"}
            handleChange={handleChange}
            errorMessage={errors.firstName}
            submitedButtonClicked={submitedButtonClicked}
          />
          <Input
            name="lastName"
            value={formData.lastName}
            label={"Last Name"}
            handleChange={handleChange}
            errorMessage={errors.lastName}
            submitedButtonClicked={submitedButtonClicked}
          />
          <Select
            name="state"
            value={formData.state}
            label={"State"}
            handleChange={handleStateChange}
            errorMessage={errors.state}
            options={
              isStatesLoading
                ? [{ value: "", label: "Loading..." }]
                : [{ value: "", label: "Select State" }, ...states]
            }
            submitedButtonClicked={submitedButtonClicked}
          />
          <Select
            name="city"
            value={formData.city}
            label="City"
            handleChange={handleChange}
            errorMessage={errors.city}
            options={
              isCitiesLoading || isStatesLoading
                ? [{ value: "", label: "Loading..." }]
                : [{ value: "", label: "Select City" }, ...cities]
            }
            submitedButtonClicked={submitedButtonClicked}
          />
          <Input
            name="email"
            value={formData.email}
            submitedButtonClicked={submitedButtonClicked}
            label={"Email"}
            type="email"
            handleChange={handleChange}
            errorMessage={errors.email}
          />
          <Input
            name="password"
            value={formData.password}
            label={"Password"}
            type="password"
            handleChange={handleChange}
            errorMessage={errors.password}
            submitedButtonClicked={submitedButtonClicked}
          />
        </div>
        <Button />
      </form>
    </div>
  );
};
