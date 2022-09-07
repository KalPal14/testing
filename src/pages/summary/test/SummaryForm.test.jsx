import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SummaryForm from "../SummaryForm";

describe("SummaryForm", () => {
  test("When we click on uncheked checkbox checkbox become checked and confirm order button become enabled", async () => {
    render(<SummaryForm />);
    const agreeCheckbox = screen.getByRole("checkbox", {
      name: /I agree to terms and conditions/i,
    });
    const confirmOrderBtn = screen.getByRole("button", {
      name: /Confirm order/i,
    });

    await userEvent.click(agreeCheckbox);

    expect(agreeCheckbox).toBeChecked();
    expect(confirmOrderBtn).toBeEnabled();
  });

  test("When we click on cheked checkbox checkbox become unchecked and confirm order button become disabled", async () => {
    render(<SummaryForm />);
    const agreeCheckbox = screen.getByLabelText(
      /I agree to terms and conditions/i
    );
    const confirmOrderBtn = screen.getByRole("button", {
      name: /Confirm order/i,
    });
    await userEvent.click(agreeCheckbox);

    await userEvent.click(agreeCheckbox);

    expect(agreeCheckbox).not.toBeChecked();
    expect(confirmOrderBtn).toBeDisabled();
  });
});
