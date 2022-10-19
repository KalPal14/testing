import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Link } from "react-router-dom";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation() {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    axios
      // in a real app we would get order details from context
      // and send with POST
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        setErr(true);
      });
  }, []);

  function handleClick() {
    // clear the order details
    resetOrder();
  }

  return (
    <div style={{ textAlign: "center", paddingTop: "20px" }}>
      {err ? (
        <AlertBanner message="Something went wrong. Your order has not been created" />
      ) : (
        <>
          <h1>Thank You!</h1>
          <p>Your order number is {orderNumber}</p>
          <p style={{ fontSize: "25%" }}>
            as per our terms and conditions, nothing will happen now
          </p>
        </>
      )}
      <Link to="/">
        <Button onClick={handleClick}>Create new order</Button>
      </Link>
    </div>
  );
}
