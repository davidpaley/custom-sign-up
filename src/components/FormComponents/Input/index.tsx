import { useCheckShowError } from "../../../hooks/useCheckShowError";
import { InputProps } from "../../../models";
import { ErrorMessage } from "../ErrorMessage";
import styles from "./index.module.css";

export const Input = ({
  value,
  label,
  handleChange,
  errorMessage,
  name,
  type,
  submitedButtonClicked,
}: InputProps) => {
  const { showError } = useCheckShowError(
    value,
    submitedButtonClicked,
    errorMessage
  );

  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input
        type={type}
        data-testid="input"
        className={`${styles.input} ${showError && styles.error}`}
        name={name}
        value={value}
        onChange={handleChange}
      />
      <ErrorMessage showError={showError} errorMessage={errorMessage} />
    </div>
  );
};
