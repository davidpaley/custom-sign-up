import { render, screen, waitFor } from "@testing-library/react";
import { AxiosResponse } from "axios";
import App from "./App";
import * as services from "./services"; // Import the services module

test("Show loading component", () => {
  render(<App />);
  const loadingElement = screen.getByText(/Loading data/i);
  expect(loadingElement).toBeInTheDocument();
});

test("Show the Sign up and stop showing the loading text.", async () => {
  const mockAuthToken = "mockAuthToken";
  jest
    .spyOn(services, "getAuthToken")
    .mockResolvedValueOnce({ data: { auth_token: mockAuthToken } } as
      | AxiosResponse<{ auth_token: string }, any>
      | Promise<AxiosResponse<{ auth_token: string }, any>>);
  render(<App />);
  const loadingElement = screen.getByText(/Loading data/i);
  expect(loadingElement).toBeInTheDocument();

  await waitFor(() => {
    expect(loadingElement).not.toBeInTheDocument();
    const headerElement = screen.getByText(/Sign Up/i);
    expect(headerElement).toBeInTheDocument();
  });
});
