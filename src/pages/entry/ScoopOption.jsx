import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function ScoopOption({
  name,
  defaultValue,
  imagePath,
  updateItemCount,
}) {
  const [isInvalid, setIsInvalid] = useState(false);

  const validityCheck = (value) => {
    const n = Number(value);
    if (n >= 0 && n <= 10 && Math.floor(n) === n) return true;
    return false;
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    const isValid = validityCheck(newValue);

    setIsInvalid(!isValid);
    updateItemCount(name, newValue || "0");
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            isInvalid={isInvalid}
            type="number"
            defaultValue={defaultValue}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
