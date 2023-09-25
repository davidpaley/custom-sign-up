import styles from "./index.module.css";

export const ErrorMessage = ({
  errorMessage,
  showError,
}: {
  errorMessage?: string;
  showError: boolean;
}) => {
  if (!showError) return null;
  return <div className={styles.errorMessage}>{errorMessage}</div>;
};
