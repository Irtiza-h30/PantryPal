import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

const AllTheProviders = ({ children }) => {
  return <MockedProvider mocks={[]}>{children}</MockedProvider>;
};

const customRender = (ui, options) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  render(ui, { wrapper: AllTheProviders, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };