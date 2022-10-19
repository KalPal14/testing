import {
  render,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "../../mocks/server";
import OrderConfirmation from "./OrderConfirmation";
import { ORDER_NUMBER } from "../../constants/api";

describe("OrderConfirmation", () => {
  test("checking render when we have normal server response", async () => {
    render(<OrderConfirmation />);
    await waitFor(async () => {
      const orderNumber = await screen.findByText(/Your order number is/i);

      expect(orderNumber).toHaveTextContent(ORDER_NUMBER);
    });
  });

  test("checking render when we have error server response", async () => {
    server.resetHandlers(
      rest.post("http://localhost:3030/order", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(<OrderConfirmation />);
    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent(
      /Something went wrong. Your order has not been created/i
    );
  });
});
