import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { Form, Button, Col, Row } from "react-bootstrap";
import { savePaymentMethod } from "../slices/cartSlice.js";
import { toast } from "react-toastify";
import {
  useGetOrderDetailsQuery,
  useUploadOrderImageMutation,
} from "../slices/ordersApiSlice.js";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const { id: orderId } = useParams();
  const [image, setImage] = useState("");

  const { data: order } = useGetOrderDetailsQuery(orderId);

  const [uploadOrderImage] = useUploadOrderImageMutation();

  useEffect(() => {
    if (order) {
      setImage(order.image);
    }
  }, [order]);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      toast.error("Please select a payment method before continuing.");
      return;
    }

    if (!image) {
      toast.error("Please upload the receipt image before continuing.");
      return;
    }

    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadOrderImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Commercial Bank of Ethiopia "
              className="my-2"
              id="CBE"
              name="paymentMethod"
              value="CBE"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            />
            <h6>
              Pay with this number and send us the receipt image before you
              placeorder
            </h6>
            <Row>
              <Col md={3}>Account Name:</Col>
              <Col md={3}>Tokuma Sime Tola</Col>
            </Row>
            <Row>
              <Col md={3}>Account Number:</Col>
              <Col md={3}>1000300768408</Col>
            </Row>
            <Form.Group controlId="image" className="my-2">
              <Form.Label>Put the picture of receipt</Form.Label>
              <Form.Control
                type="file"
                label="choose file"
                onChange={uploadFileHandler}
                required={true}
              ></Form.Control>
            </Form.Group>
          </Col>
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
