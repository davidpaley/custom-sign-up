import { useCheckShowError } from "../../../hooks/useCheckShowError";
import { SelectProps } from "../../../models";
import { ErrorMessage } from "../ErrorMessage";
import styles from "./index.module.css";

export const Select = ({
  value,
  label,
  handleChange,
  errorMessage,
  name,
  options,
  submitedButtonClicked,
}: SelectProps) => {
  const { showError } = useCheckShowError(
    value,
    submitedButtonClicked,
    errorMessage
  );
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <select
        className={`${styles.select} ${!!showError && styles.error}`}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map(({ label, value }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
      <ErrorMessage showError={showError} errorMessage={errorMessage} />
    </div>
  );
};
