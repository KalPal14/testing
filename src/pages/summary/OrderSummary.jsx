import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderSummary() {
  const [orderDetails] = useOrderDetails();

  const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([key, value]) => {
    if (value) {
      return (
        <li key={key}>
          {value} {key}
        </li>
      );
    }
  });

  const toppingsArray = Array.from(orderDetails.toppings.keys());
  const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);

  const showToppings = orderDetails.totals.toppings !== "$0.00";

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {showToppings && (
        <>
          <h2>Toppings: {orderDetails.totals.toppings}</h2>
          <ul>{toppingList}</ul>
        </>
      )}
      <SummaryForm />
    </div>
  );
}
