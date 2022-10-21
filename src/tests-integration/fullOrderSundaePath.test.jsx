import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { ORDER_NUMBER } from "../constants/api";

describe("fullOrderSundaePath", () => {
  describe("happy path", () => {
    test("sundae order full path", async () => {
      render(<App />);
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
      const createOrderBtn = screen.getByRole("link", {
        name: /Order Sundae!/i,
      });

      //create sunday order
      await userEvent.clear(chocolateScoopAmountInput);
      await userEvent.type(chocolateScoopAmountInput, "1");
      await userEvent.clear(vanillaScoopAmountInput);
      await userEvent.type(vanillaScoopAmountInput, "2");
      await userEvent.click(cherriesToppingCheckbox);
      await userEvent.click(hotFudgeToppingCheckbox);
      await userEvent.click(createOrderBtn);

      //check order summary
      const scoopsTotal = await screen.findByRole("heading", {
        name: /Scoops: \$/,
      });
      const toppingsTotal = await screen.findByRole("heading", {
        name: /Toppings: \$/,
      });
      const scoopsAndToppingsListItems = await screen.findAllByRole("listitem");
      const scoopsAndToppingsListItemsText = scoopsAndToppingsListItems.map(
        (item) => item.textContent
      );
      expect(scoopsTotal).toHaveTextContent("6.00");
      expect(toppingsTotal).toHaveTextContent("3.00");
      expect(scoopsAndToppingsListItems).toHaveLength(4);
      expect(scoopsAndToppingsListItemsText).toEqual([
        "1 Chocolate",
        "2 Vanilla",
        "Cherries",
        "Hot fudge",
      ]);

      //confirm order
      const agreeCheckbox = screen.getByRole("checkbox", {
        name: /I agree to Terms and Conditions/i,
      });
      const confirmOrderBtn = screen.getByRole("link", {
        name: /Confirm order/i,
      });
      await userEvent.click(agreeCheckbox);
      await userEvent.click(confirmOrderBtn);

      //check confirmed page
      const orderNumber = await screen.findByText(/Your order number is/i);
      await waitFor(() => {
        expect(orderNumber).toHaveTextContent(ORDER_NUMBER);
      });

      //create new order
      const createNewOrderLink = screen.getByRole("link", {
        name: /Create new order/i,
      });
      await userEvent.click(createNewOrderLink);

      //check order new order page
      const grandTotal = await screen.findByRole("heading", {
        name: /Grand total: \$/,
      });
      expect(grandTotal).toHaveTextContent("0.00");
    });
  });
});
