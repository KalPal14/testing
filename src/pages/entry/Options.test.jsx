import { render, screen } from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
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

  test("Scoops total when chouse scoops", async () => {
    render(<Options optionType="scoops" />);
    const scoopsTotal = screen.getByText(/Scoops total:/i);
    const chocolateScoopAmountInput = await screen.findByRole("spinbutton", {
      name: /Chocolate/i,
    });
    const vanillaScoopAmountInput = await screen.findByRole("spinbutton", {
      name: /Vanilla/i,
    });

    //Scoops total is 0.00 by default
    expect(scoopsTotal).toHaveTextContent("0.00");

    await userEvent.clear(chocolateScoopAmountInput);
    await userEvent.type(chocolateScoopAmountInput, "1");

    expect(scoopsTotal).toHaveTextContent("2.00");

    await userEvent.clear(vanillaScoopAmountInput);
    await userEvent.type(vanillaScoopAmountInput, "2");

    expect(scoopsTotal).toHaveTextContent("6.00");

    await userEvent.clear(vanillaScoopAmountInput);
    await userEvent.clear(chocolateScoopAmountInput);
    await userEvent.type(vanillaScoopAmountInput, "1");

    expect(scoopsTotal).toHaveTextContent("2.00");
  });

  test("Toppings total when chouse toppings", async () => {
    render(<Options optionType="toppings" />);
    const toppingsTotal = screen.getByText(/Toppings total:/i);
    const cherriesToppingCheckbox = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });
    const hotFudgeToppingCheckbox = await screen.findByRole("checkbox", {
      name: /Hot fudge/i,
    });

    //Toppings total is 0.00 by default"
    expect(toppingsTotal).toHaveTextContent("0.00");

    await userEvent.click(cherriesToppingCheckbox);

    expect(toppingsTotal).toHaveTextContent("1.50");

    await userEvent.click(hotFudgeToppingCheckbox);

    expect(toppingsTotal).toHaveTextContent("3.00");

    await userEvent.click(cherriesToppingCheckbox);

    expect(toppingsTotal).toHaveTextContent("1.50");
  });

  test("Scoops total don`t update if type wrong scoop input value", async () => {
    render(<Options optionType="scoops" />);
    const scoopsTotal = await screen.findByText(/Scoops total: \$/);
    const vanillaScoopAmountInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    const chocolateScoopAmountInput = await screen.findByRole("spinbutton", {
      name: /Chocolate/i,
    });

    await userEvent.clear(vanillaScoopAmountInput);
    await userEvent.type(vanillaScoopAmountInput, "-2");

    expect(scoopsTotal).toHaveTextContent("0.00");

    await userEvent.clear(vanillaScoopAmountInput);
    await userEvent.type(vanillaScoopAmountInput, "2");
    await userEvent.clear(chocolateScoopAmountInput);
    await userEvent.type(chocolateScoopAmountInput, "-2");

    expect(scoopsTotal).toHaveTextContent("4.00");
  });
});
