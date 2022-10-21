import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";

import { OrderDetailsProvider } from "./contexts/OrderDetails";

export default function App() {
  return (
    <OrderDetailsProvider>
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<OrderEntry />} />
            <Route path="/summary" element={<OrderSummary />} />
            <Route path="/confirmed" element={<OrderConfirmation />} />
          </Routes>
        </Router>
      </Container>
    </OrderDetailsProvider>
  );
}
