import { render, screen } from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ScoopOption from "./ScoopOption";

describe("ScoopOption", () => {
  const mockUpdateItemCount = jest.fn();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("checking default render if default value 0", () => {
    render(
      <ScoopOption
        name="Vanila"
        defaultValue={0}
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

  test("checking default render if default value 2", () => {
    render(
      <ScoopOption
        name="Vanila"
        defaultValue={2}
        imagePath="vanila.jpg"
        updateItemCount={mockUpdateItemCount}
      />
    );
    const scoopImg = screen.getByRole("img", { name: /Vanila scoop/i });
    const scoopInput = screen.getByRole("spinbutton", { name: /Vanila/i });

    expect(scoopImg).toBeInTheDocument();
    expect(scoopInput).toBeInTheDocument();
    expect(scoopInput).toHaveValue(2);
  });

  test("checking the operation of the component when we clear soop input", async () => {
    render(
      <ScoopOption
        name="Vanila"
        defaultValue={0}
        imagePath="vanila.jpg"
        updateItemCount={mockUpdateItemCount}
      />
    );
    const scoopInput = screen.getByRole("spinbutton", { name: /Vanila/i });

    await userEvent.clear(scoopInput);

    expect(scoopInput).toHaveValue(null);
    expect(mockUpdateItemCount).toHaveBeenCalledWith("Vanila", "0");
    expect(scoopInput).not.toHaveClass("is-invalid");
  });

  test("checking the operation of the component when we type correct scoop amount on scoop input", async () => {
    render(
      <ScoopOption
        name="Vanila"
        defaultValue={0}
        imagePath="vanila.jpg"
        updateItemCount={mockUpdateItemCount}
      />
    );
    const scoopInput = screen.getByRole("spinbutton", { name: /Vanila/i });

    await userEvent.clear(scoopInput);
    await userEvent.type(scoopInput, "2");

    expect(scoopInput).toHaveValue(2);
    expect(mockUpdateItemCount).toHaveBeenCalledWith("Vanila", "2");
    expect(scoopInput).not.toHaveClass("is-invalid");
  });

  test("checking the operation of the component when we type uncorrect scoop amount on scoop input", async () => {
    render(
      <ScoopOption
        name="Vanila"
        defaultValue={0}
        imagePath="vanila.jpg"
        updateItemCount={mockUpdateItemCount}
      />
    );
    const scoopInput = screen.getByRole("spinbutton", { name: /Vanila/i });

    await userEvent.clear(scoopInput);
    await userEvent.type(scoopInput, "-2");

    expect(scoopInput).toHaveValue(-2);
    expect(mockUpdateItemCount).toHaveBeenCalledWith("Vanila", "-2");
    expect(scoopInput).toHaveClass("is-invalid");

    await userEvent.clear(scoopInput);
    await userEvent.type(scoopInput, "2.5");

    expect(scoopInput).toHaveValue(2.5);
    expect(mockUpdateItemCount).toHaveBeenCalledWith("Vanila", "2.5");
    expect(scoopInput).toHaveClass("is-invalid");

    await userEvent.clear(scoopInput);
    await userEvent.type(scoopInput, "11");

    expect(scoopInput).toHaveValue(11);
    expect(mockUpdateItemCount).toHaveBeenCalledWith("Vanila", "11");
    expect(scoopInput).toHaveClass("is-invalid");
  });

  test("checking the operation of the component when we type uncorrect and correct scoop amount on scoop input", async () => {
    render(
      <ScoopOption
        name="Vanila"
        defaultValue={0}
        imagePath="vanila.jpg"
        updateItemCount={mockUpdateItemCount}
      />
    );
    const scoopInput = screen.getByRole("spinbutton", { name: /Vanila/i });

    await userEvent.clear(scoopInput);
    await userEvent.type(scoopInput, "2");

    expect(scoopInput).toHaveValue(2);
    expect(mockUpdateItemCount).toHaveBeenCalledWith("Vanila", "2");
    expect(scoopInput).not.toHaveClass("is-invalid");

    await userEvent.clear(scoopInput);
    await userEvent.type(scoopInput, "-2");

    expect(scoopInput).toHaveValue(-2);
    expect(mockUpdateItemCount).toHaveBeenCalledWith("Vanila", "-2");
    expect(scoopInput).toHaveClass("is-invalid");

    await userEvent.clear(scoopInput);
    await userEvent.type(scoopInput, "2");

    expect(scoopInput).toHaveValue(2);
    expect(mockUpdateItemCount).toHaveBeenCalledWith("Vanila", "2");
    expect(scoopInput).not.toHaveClass("is-invalid");
  });
});
