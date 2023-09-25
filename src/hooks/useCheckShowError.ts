import { useEffect, useState } from "react";

export const useCheckShowError = (
  value: string,
  submitedButtonClicked: boolean,
  errorMessage?: string
) => {
  const [wasInitialized, setWasInitialized] = useState(false);
  useEffect(() => {
    if (value || submitedButtonClicked) {
      setWasInitialized(true);
    }
  }, [value, submitedButtonClicked, setWasInitialized]);
  const showError = !!wasInitialized && !!errorMessage;
  return { showError };
};
