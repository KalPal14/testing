import { render, screen } from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ScoopOption from "./ScoopOption";

describe("ScoopOption", () => {
  const mockUpdateItemCount = jest.fn();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("checking default render", () => {
    render(
      <ScoopOption
        name="Vanila"
        imagePath="vanila.jpg"
        updateItemCount={mockUpdateItemCount}
      />
    );
    const scoopImg = screen.getByRole("img", { name: /Vanila scoop/i });
    const scoopInput = screen.getByRole("spinbutton", { name: /Vanila/i });

    expect(scoopImg).toBeInTheDocument();
    expect(scoopInput).toBeInTheDocument();
    expect(scoopInput).toHaveValue(0);
  });

  test("checking the operation of the component when we clear soop input", async () => {
    render(
      <ScoopOption
        name="Vanila"
        imagePath="vanila.jpg"
        updateItemCount={mockUpdateItemCount}
      />
    );
    const scoopInput = screen.getByRole("spinbutton", { name: /Vanila/i });

    await userEvent.clear(scoopInput);

    expect(scoopInput).toHaveValue(null);
    expect(mockUpdateItemCount).toHaveBeenCalledWith("Vanila", "0");
  });

  test("checking the operation of the component when we type correct scoop amount on scoop input", async () => {
    render(
      <ScoopOption
        name="Vanila"
        imagePath="vanila.jpg"
        updateItemCount={mockUpdateItemCount}
      />
    );
    const scoopInput = screen.getByRole("spinbutton", { name: /Vanila/i });

    await userEvent.clear(scoopInput);
    await userEvent.type(scoopInput, "2");

    expect(scoopInput).toHaveValue(2);
    expect(mockUpdateItemCount).toHaveBeenCalledWith("Vanila", "2");
  });

  test("checking the operation of the component when we type uncorrect scoop amount on scoop input", async () => {
    render(
      <ScoopOption
        name="Vanila"
        imagePath="vanila.jpg"
        updateItemCount={mockUpdateItemCount}
      />
    );
    const scoopInput = screen.getByRole("spinbutton", { name: /Vanila/i });

    await userEvent.clear(scoopInput);
    await userEvent.type(scoopInput, "-2");

    expect(scoopInput).toHaveValue(-2);
    expect(mockUpdateItemCount).toHaveBeenCalledWith("Vanila", "-2");

    await userEvent.clear(scoopInput);
    await userEvent.type(scoopInput, "2.5");

    expect(scoopInput).toHaveValue(2.5);
    expect(mockUpdateItemCount).toHaveBeenCalledWith("Vanila", "2.5");
  });
});