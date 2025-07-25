import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer-section'>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>Copyright &copy; {currentYear}. North America Artificial Intelligence (AI) Association</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
