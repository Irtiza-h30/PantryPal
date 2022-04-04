import React from "react";
import { fireEvent, waitFor, screen, render } from "tests/setup";

import App from "..";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
  });

  test("Clicking the 'Explore' link changes route to the explore page", async () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("link", {
        name: /explore/i,
      })
    );

    await waitFor(() => {
      expect(window.location.pathname).toEqual("/explore");
    });
  });

  test("Clicking the 'Pantry' link changes route to the pantry page", async () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("link", {
        name: /pantry/i,
      })
    );

    await waitFor(() => {
      expect(window.location.pathname).toEqual("/pantry");
    });
  });

  test("Clicking the 'Cookbook' link changes route to the cookbook page", async () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("link", {
        name: /cookbook/i,
      })
    );

    await waitFor(() => {
      expect(window.location.pathname).toEqual("/cookbook");
    });
  });

  test("Clicking the 'Logo' changes route to the explore page", async () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("link", {
        name: /logo/i,
      })
    );

    await waitFor(() => {
      expect(window.location.pathname).toEqual("/explore");
    });
  });

  test("Clicking the 'Login' link changes route to the login page", async () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("link", {
        name: /login/i,
      })
    );

    await waitFor(() => {
      expect(window.location.pathname).toEqual("/login");
    });
  });
});