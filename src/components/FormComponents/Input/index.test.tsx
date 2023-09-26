import { render, fireEvent } from "@testing-library/react";
import { Input } from "./index";

describe("Input component", () => {
  it("renders without errors", () => {
    const { getByText } = render(
      <Input
        label="Test Label"
        value=""
        handleChange={() => {}}
        errorMessage=""
        name="test"
        type="text"
        submitedButtonClicked={false}
      />
    );

    const inputElement = getByText("Test Label");
    expect(inputElement).toBeInTheDocument();
  });

  it("applies error styles when showError is true", () => {
    const { container } = render(
      <Input
        label="Test Label"
        value=""
        handleChange={() => {}}
        errorMessage="Test Error"
        name="test"
        type="text"
        submitedButtonClicked={true}
      />
    );

    const inputContainer = container.querySelector(".input");
    expect(inputContainer).toHaveClass("error");
  });

  it("does not apply error styles when showError is false", () => {
    const { container } = render(
      <Input
        label="Test Label"
        value=""
        handleChange={() => {}}
        errorMessage="Test Error"
        name="test"
        type="text"
        submitedButtonClicked={false} // showError will be false
      />
    );

    const inputContainer = container.querySelector(".input");
    expect(inputContainer).not.toHaveClass("error");
  });

  it("calls handleChange when input value changes", () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <Input
        label="Test Label"
        value=""
        handleChange={handleChange}
        errorMessage="Test Error"
        name="test"
        type="text"
        submitedButtonClicked={false}
      />
    );

    const inputElement = getByTestId("input");
    fireEvent.change(inputElement, { target: { value: "New Value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
