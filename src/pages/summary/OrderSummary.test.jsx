import { render, screen, within } from "../../test-utils/testing-library-utils";
import { useOrderDetails } from "../../contexts/OrderDetails";
import OrderSummary from "./OrderSummary";

jest.mock("../../contexts/OrderDetails", () => ({
  ...jest.requireActual("../../contexts/OrderDetails"),
  useOrderDetails: jest.fn(),
}));

describe("OrderSummary", () => {
  afterEach(() => {
    useOrderDetails.mockClear();
  });

  test("checking rendering if we have one scoop and don`t have toppings", () => {
    useOrderDetails.mockReturnValue([
      {
        scoops: new Map([["Vanilla", 1]]),
        toppings: new Map(),
        totals: {
          scoops: "$2.00",
          toppings: "$0.00",
          grandTotal: "$2.00",
        },
      },
    ]);
    render(<OrderSummary />);

    const scoopsSummary = screen.getByRole("heading", { name: /scoops: \$/i });
    const toppingsSummary = screen.queryByRole("heading", {
      name: /toppings: \$/i,
    });
    const scoopsItemsList = screen.getAllByRole("listitem");

    expect(scoopsSummary).toHaveTextContent("2.00");
    expect(toppingsSummary).not.toBeInTheDocument();
    expect(scoopsItemsList.map((item) => item.textContent)).toEqual([
      "1 Vanilla",
    ]);
  });

  test("checking rendering if we have several scoops and several toppings", () => {
    useOrderDetails.mockReturnValue([
      {
        scoops: new Map([
          ["Mint chip", 1],
          ["Vanilla", 2],
          ["Chocolate", 0],
        ]),
        toppings: new Map([
          ["Hot fudge", 1],
          ["Cherries", 1],
        ]),
        totals: {
          scoops: "$6.00",
          toppings: "$3.00",
          grandTotal: "$9.00",
        },
      },
    ]);
    render(<OrderSummary />);
    const scoopsSummary = screen.getByRole("heading", { name: /scoops: \$/i });
    const toppingsSummary = screen.getByRole("heading", {
      name: /toppings: \$/i,
    });
    const [scoopsList, toppingsList] = screen.getAllByRole("list");
    const scoopsItemsList = within(scoopsList).getAllByRole("listitem");
    const topppingsItemsList = within(toppingsList).getAllByRole("listitem");

    expect(scoopsSummary).toHaveTextContent("6.00");
    expect(toppingsSummary).toHaveTextContent("3.00");
    expect(scoopsItemsList.map((item) => item.textContent)).toEqual([
      "1 Mint chip",
      "2 Vanilla",
    ]);
    expect(topppingsItemsList.map((item) => item.textContent)).toEqual([
      "Hot fudge",
      "Cherries",
    ]);
  });
});
