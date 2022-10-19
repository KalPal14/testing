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

  describe("create order button", () => {
    test("is disablet if user don`t choose scoop", async () => {
      render(<OrderEntry />);
      const orderButton = screen.getByRole("button", { name: /Order Sundae!/ });
      const vanillaScoopAmountInput = await screen.findByRole("spinbutton", {
        name: /Vanilla/i,
      });
      const cherriesToppingCheckbox = await screen.findByRole("checkbox", {
        name: /Cherries/i,
      });

      expect(orderButton).toBeDisabled();

      await userEvent.click(cherriesToppingCheckbox);

      expect(orderButton).toBeDisabled();

      await userEvent.clear(vanillaScoopAmountInput);
      await userEvent.type(vanillaScoopAmountInput, "1");

      expect(orderButton).toBeEnabled();

      await userEvent.click(cherriesToppingCheckbox);

      expect(orderButton).toBeEnabled();

      await userEvent.clear(vanillaScoopAmountInput);

      expect(orderButton).toBeDisabled();
    });
  });

  describe("Grand total", () => {
    test("on Scoops adding", async () => {
      render(<OrderEntry />);
      const grandTotal = screen.getByText(/Grand total: \$/i);
      const chocolateScoopAmountInput = await screen.findByRole("spinbutton", {
        name: /Chocolate/i,
      });
      const vanillaScoopAmountInput = await screen.findByRole("spinbutton", {
        name: /Vanilla/i,
      });

      //$00.00 by default
      expect(grandTotal).toHaveTextContent("0.00");

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
