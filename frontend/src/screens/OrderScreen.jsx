import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Card, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import Message from "../components/Message";

import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const paidHandler = async () => {
    try {
      await payOrder(orderId);
      refetch();
      toast.success("Order Paid");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <>
      <h1>Order {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order?.user?.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order?.user?.email}`}>
                  {order?.user?.email}
                </a>
              </p>
              <p>
                <strong>Address: </strong>
                {order?.shippingAddress?.address},{" "}
                {order?.shippingAddress?.city},{" "}
                {order?.shippingAddress?.postalCode},{" "}
                {order?.shippingAddress?.country}
              </p>

              {order?.isDelivered ? (
                <Message variant="success">
                  Delivered on {order?.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order?.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems?.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={item.product || index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price.toFixed(2)} ETB ={" "}
                          {(item.qty * item.price).toFixed(2)} ETB
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{order?.itemsPrice?.toFixed(2)} ETB</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>Tax</Col>
                <Col>{order?.taxPrice?.toFixed(2)} ETB</Col>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{order?.totalPrice?.toFixed(2)} ETB</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid ? (
                <>
                  {loadingPay && <Loader />}
                  {userInfo && userInfo.isAdmin && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={paidHandler}
                      >
                        Mark As Paid
                      </Button>
                    </ListGroup.Item>
                  )}
                </>
              ) : (
                <>
                  {loadingDeliver && <Loader />}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type="button"
                          className="btn btn-block"
                          onClick={deliverHandler}
                        >
                          Mark As Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                </>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
