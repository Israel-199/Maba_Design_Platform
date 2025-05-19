import { Col, Container, Row } from "react-bootstrap";
import { FaLinkedin, FaPhone, FaTelegram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container fluid>
        <Row className="text-center py-3 color mt-4 ">
          <h5 className="text-color mb-4 text-center position">
            Follow And Contact us!
          </h5>

          <Col md={3}>
            <a
              href="https://lnkd.in/e_Jbn9Yn"
              className="text-color d-flex justify-content-center align-items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin /> Maba_Design
            </a>
          </Col>
          <Col md={3}>
            <a
              href="https://www.youtube.com/@mabadesign?sub_confirmation=1"
              className="text-color d-flex justify-content-center align-items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube /> Maba Design
            </a>
          </Col>
          <Col md={3}>
            <a
              href="tel:+251934154175"
              className="text-color d-flex justify-content-center align-items-center gap-1"
            >
              <FaPhone /> +251934154175
            </a>
          </Col>
          <Col md={3}>
            <a
              href="https://t.me/mabadesigns"
              className="text-color d-flex justify-content-center align-items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram /> Maba Design
            </a>
          </Col>

          <Col className="text-center text-color mt-4">
            {/* Use <span> or <a> instead of <Link> */}
            <span className="text-color">
              @Maba_Design &copy; {currentYear}
            </span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
