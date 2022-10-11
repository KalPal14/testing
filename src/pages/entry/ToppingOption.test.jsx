import { render, screen } from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ToppingOption from "./ToppingOption";

describe("ToppingOption", () => {
  const mockUpdateItemCount = jest.fn();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("checking default render", () => {
    render(
      <ToppingOption
        name="Cherries"
        imagePath="cherries.jpg"
        updateItemCount={mockUpdateItemCount}
      />
    );
    const toppingImg = screen.getByRole("img", { name: /Cherries topping/i });
    const toppingInput = screen.getByRole("checkbox", { name: /Cherries/i });

    expect(toppingImg).toBeInTheDocument();
    expect(toppingInput).toBeInTheDocument();
    expect(toppingImg).not.toBeChecked();
  });

  test("checking the operation of the component when we select and unselect checkbox", async () => {
    render(
      <ToppingOption
        name="Cherries"
        imagePath="cherries.jpg"
        updateItemCount={mockUpdateItemCount}
      />
    );
    const toppingInput = screen.getByRole("checkbox", { name: /Cherries/i });

    await userEvent.click(toppingInput);

    expect(toppingInput).toBeChecked();
    expect(mockUpdateItemCount).toHaveBeenCalledWith("Cherries", 1);

    await userEvent.click(toppingInput);

    expect(toppingInput).not.toBeChecked();
    expect(mockUpdateItemCount).toHaveBeenCalledWith("Cherries", 0);
  });
});
