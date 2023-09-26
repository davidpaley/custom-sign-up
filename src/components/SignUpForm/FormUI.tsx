import { Input } from "../FormComponents/Input";
import styles from "./index.module.css";
import { Select } from "../FormComponents/Select";
import { Button } from "../FormComponents/Button";
import { ObjectForSelect, SignUpData } from "../../models";

interface FormUIProps {
  formData: SignUpData;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleStateChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  submitedButtonClicked: boolean;
  errors: Partial<SignUpData>;
  isStatesLoading: boolean;
  states: ObjectForSelect[];
  isCitiesLoading: boolean;
  cities: ObjectForSelect[];
}

export const FormUI = ({
  formData,
  handleSubmit,
  handleChange,
  submitedButtonClicked,
  errors,
  isStatesLoading,
  states,
  isCitiesLoading,
  cities,
  handleStateChange,
}: FormUIProps) => (
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
);
