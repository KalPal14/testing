import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderEntry() {
  const [orderDetails] = useOrderDetails();

  const isOrderBtnDisable = orderDetails.totals.scoops === "$0.00";
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button disabled={isOrderBtnDisable}>
        <Link to="summary">Order Sundae!</Link>
      </Button>
    </div>
  );
}
