import { render, screen } from "../../test-utils/testing-library-utils";
import Options from "./Options";

describe("Options", () => {
  test("Checking Scoops render elements", async () => {
    render(<Options optionType="scoops" />);
    const scoopsItemsList = await screen.findAllByRole("img", {
      name: /scoop$/i,
    });
    const scoopsAltTextList = scoopsItemsList.map((item) => item.alt);

    expect(scoopsItemsList).toHaveLength(2);
    expect(scoopsAltTextList).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });

  test("Checking Toppings render elements", async () => {
    render(<Options optionType="toppings" />);
    const toppingsItemsList = await screen.findAllByRole("img", {
      name: /topping$/i,
    });
    const toppingsAltTextList = toppingsItemsList.map((item) => item.alt);

    expect(toppingsItemsList).toHaveLength(3);
    expect(toppingsAltTextList).toEqual([
      "Cherries topping",
      "M&Ms topping",
      "Hot fudge topping",
    ]);
  });
});
