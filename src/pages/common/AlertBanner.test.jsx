import { render, screen } from "../../test-utils/testing-library-utils";
import AlertBanner from "./AlertBanner";

describe("AlertBanner", () => {
  test("testing render if we don`t have props", () => {
    render(<AlertBanner />);
    const alert = screen.getByRole("alert");

    expect(alert).toHaveTextContent(
      /An unexpected error occurred. Please try again later./i
    );
    expect(alert).toHaveClass("alert alert-danger");
  });
  test("testing render if we have props", () => {
    render(<AlertBanner message="Test alert text content" variant="primary" />);
    const alert = screen.getByRole("alert");

    expect(alert).toHaveTextContent(/Test alert text conten/i);
    expect(alert).toHaveClass("alert alert-primary");
  });
});
