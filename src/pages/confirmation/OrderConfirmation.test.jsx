import {
  render,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../mocks/server";
import OrderConfirmation from "./OrderConfirmation";
import * as orderDetailsContext from "../../contexts/OrderDetails";
import { ORDER_NUMBER } from "../../constants/api";

describe("OrderConfirmation", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("checking render when we have normal server response", async () => {
    render(<OrderConfirmation />);
    await waitFor(async () => {
      const orderNumber = await screen.findByText(/Your order number is/i);

      expect(orderNumber).toHaveTextContent(ORDER_NUMBER);
    });
  });

  test("checking create new order button", async () => {
    const mockUseOrderDetails = jest
      .spyOn(orderDetailsContext, "useOrderDetails")
      .mockReturnValue([null, null, jest.fn()]);
    render(<OrderConfirmation />);
    const newOrderButton = screen.getByRole("link", {
      name: /Create new order/i,
    });
    const mockResetOrder = mockUseOrderDetails()[2];
    await userEvent.click(newOrderButton);

    expect(mockResetOrder).toHaveBeenCalled();
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
