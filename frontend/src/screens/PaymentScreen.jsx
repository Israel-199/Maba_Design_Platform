import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { Form, Button, Col } from "react-bootstrap";
import { savePaymentMethod } from "../slices/cartSlice.js";
import { FaPhone } from "react-icons/fa";
import { toast } from "react-toastify";
const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      toast.error("Please select a payment method before continuing.");
      return;
    }
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <h5>
            Please Make sure you pay with the selected method before you place
            order!
          </h5>
          <Col>
            <Form.Check
              type="radio"
              label="Bank of Ethiopian Commercial"
              className="my-2"
              id="CBE"
              name="paymentMethod"
              value="CBE"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            />

            <p>1000223454322</p>
          </Col>
          <h4>OR</h4>
          <div className="mb-2">Order Us</div>
          <a href="tel:+251934154175" className=" text-center gap-1 black">
            <FaPhone /> +251934154175
          </a>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          onClick={submitHandler}
          className="mt-3"
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
