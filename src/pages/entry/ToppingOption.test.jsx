import { render, screen } from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ToppingOption from "./ToppingOption";

describe("ToppingOption", () => {
  const mockUpdateItemCount = jest.fn();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("checking default render if default value 0", () => {
    render(
      <ToppingOption
        name="Cherries"
        defaultValue={0}
        imagePath="cherries.jpg"
        updateItemCount={mockUpdateItemCount}
      />
    );
    const toppingImg = screen.getByRole("img", { name: /Cherries topping/i });
    const toppingInput = screen.getByRole("checkbox", { name: /Cherries/i });

    expect(toppingImg).toBeInTheDocument();
    expect(toppingInput).toBeInTheDocument();
    expect(toppingInput).not.toBeChecked();
  });

  test("checking default render if default value 1", () => {
    render(
      <ToppingOption
        name="Cherries"
        defaultValue={1}
        imagePath="cherries.jpg"
        updateItemCount={mockUpdateItemCount}
      />
    );
    const toppingImg = screen.getByRole("img", { name: /Cherries topping/i });
    const toppingInput = screen.getByRole("checkbox", { name: /Cherries/i });

    expect(toppingImg).toBeInTheDocument();
    expect(toppingInput).toBeInTheDocument();
    expect(toppingInput).toBeChecked();
  });

  test("checking the operation of the component when we select and unselect checkbox", async () => {
    render(
      <ToppingOption
        name="Cherries"
        defaultValue={0}
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
