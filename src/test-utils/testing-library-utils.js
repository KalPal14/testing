import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const AllProviders = ({ children }) => {
  return (
    <OrderDetailsProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </OrderDetailsProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
