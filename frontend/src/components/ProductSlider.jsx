import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productApiSlice";

const ProductSlider = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return null;

  if (error) {
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );
  }

  return (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products?.map((product) => (
        <Carousel.Item key={product._id} className="color">
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption size">
              <h2 className="text-white text-right">
                {product.name} ({product.price} ETB)
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default ProductSlider;
