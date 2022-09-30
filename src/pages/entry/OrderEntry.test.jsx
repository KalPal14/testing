import {
  render,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../mocks/server";
import OrderEntry from "./OrderEntry";

describe("OrderEntry", () => {
  test("show alert err message if server responce is wrong", async () => {
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(<OrderEntry />);

    await waitFor(async () => {
      const alerts = await screen.findAllByText(
        /An unexpected error occurred. Please try again later./i
      );

      expect(alerts).toHaveLength(2);
    });
  });

  describe("Grand total", () => {
    test("$00.00 by default", () => {
      render(<OrderEntry />);
      const grandTotal = screen.getByText(/Grand total: \$/i);

      expect(grandTotal).toHaveTextContent("0.00");
    });

    test("on Scoops adding", async () => {
      render(<OrderEntry />);
      const grandTotal = screen.getByText(/Grand total: \$/i);
      const chocolateScoopAmountInput = await screen.findByRole("spinbutton", {
        name: /Chocolate/i,
      });
      const vanillaScoopAmountInput = await screen.findByRole("spinbutton", {
        name: /Vanilla/i,
      });

      await userEvent.clear(chocolateScoopAmountInput);
      await userEvent.type(chocolateScoopAmountInput, "1");

      expect(grandTotal).toHaveTextContent("2.00");

      await userEvent.clear(vanillaScoopAmountInput);
      await userEvent.type(vanillaScoopAmountInput, "2");

      expect(grandTotal).toHaveTextContent("6.00");

      await userEvent.clear(vanillaScoopAmountInput);
      await userEvent.type(vanillaScoopAmountInput, "1");

      expect(grandTotal).toHaveTextContent("4.00");
    });

    test("on Toppings adding", async () => {
      render(<OrderEntry />);
      const grandTotal = screen.getByText(/Grand total: \$/i);
      const cherriesToppingCheckbox = await screen.findByRole("checkbox", {
        name: /Cherries/i,
      });
      const hotFudgeToppingCheckbox = await screen.findByRole("checkbox", {
        name: /Hot fudge/i,
      });

      await userEvent.click(cherriesToppingCheckbox);

      expect(grandTotal).toHaveTextContent("1.50");

      await userEvent.click(hotFudgeToppingCheckbox);

      expect(grandTotal).toHaveTextContent("3.00");

      await userEvent.click(cherriesToppingCheckbox);

      expect(grandTotal).toHaveTextContent("1.50");
    });

    test("on Scoops and Toppings adding", async () => {
      render(<OrderEntry />);
      const grandTotal = screen.getByText(/Grand total: \$/i);
      const chocolateScoopAmountInput = await screen.findByRole("spinbutton", {
        name: /Chocolate/i,
      });
      const vanillaScoopAmountInput = await screen.findByRole("spinbutton", {
        name: /Vanilla/i,
      });
      const cherriesToppingCheckbox = await screen.findByRole("checkbox", {
        name: /Cherries/i,
      });
      const hotFudgeToppingCheckbox = await screen.findByRole("checkbox", {
        name: /Hot fudge/i,
      });

      await userEvent.clear(chocolateScoopAmountInput);
      await userEvent.type(chocolateScoopAmountInput, "2");
      await userEvent.click(cherriesToppingCheckbox);

      expect(grandTotal).toHaveTextContent("5.50");

      await userEvent.clear(vanillaScoopAmountInput);
      await userEvent.type(vanillaScoopAmountInput, "1");
      await userEvent.click(hotFudgeToppingCheckbox);

      expect(grandTotal).toHaveTextContent("9.00");

      await userEvent.clear(chocolateScoopAmountInput);
      await userEvent.click(cherriesToppingCheckbox);

      expect(grandTotal).toHaveTextContent("3.50");
    });
  });
});
