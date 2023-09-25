export interface SignUpData {
  firstName: string;
  lastName: string;
  state: string;
  city: string;
  email: string;
  password: string;
}

export interface InputProps {
  value: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  label: string;
  type?: string;
  errorMessage?: string;
  name: string;
  submitedButtonClicked: boolean;
}

export interface SelectProps extends Omit<InputProps, "handleChange"> {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

export interface State {
  state_name: string;
}

export interface City {
  city_name: string;
}

export interface ObjectForSelect {
  label: string;
  value: string;
}
