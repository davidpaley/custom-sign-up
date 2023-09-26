import { render, fireEvent } from "@testing-library/react";
import { Select } from "./index";

describe("Select component", () => {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  it("renders without errors", () => {
    const { getByTestId } = render(
      <Select
        label="Test Label"
        value="option1"
        handleChange={() => {}}
        errorMessage="Test Error"
        name="test"
        options={options}
        submitedButtonClicked={false}
      />
    );

    const selectElement = getByTestId("select");
    expect(selectElement).toBeInTheDocument();
  });

  it("applies error styles when showError is true", () => {
    const { container } = render(
      <Select
        label="Test Label"
        value="option1"
        handleChange={() => {}}
        errorMessage="Test Error"
        name="test"
        options={options}
        submitedButtonClicked={true} // showError will be true
      />
    );

    const selectContainer = container.querySelector(".select");
    expect(selectContainer).toHaveClass("error");
  });

  it("does not apply error styles when showError is false", () => {
    const { container } = render(
      <Select
        label="Test Label"
        value="option"
        handleChange={() => {}}
        errorMessage=""
        name="test"
        options={options}
        submitedButtonClicked={false} // showError will be false
      />
    );

    const selectContainer = container.querySelector(".select");
    expect(selectContainer).not.toHaveClass("error");
  });

  it("calls handleChange when select value changes", () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <Select
        label="Test Label"
        value="option1"
        handleChange={handleChange}
        errorMessage="Test Error"
        name="test"
        options={options}
        submitedButtonClicked={false}
      />
    );

    const selectElement = getByTestId("select");
    fireEvent.change(selectElement, { target: { value: "option2" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
