import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderEntry() {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Link to="summary">
        <Button>Order Sundae!</Button>
      </Link>
    </div>
  );
}
