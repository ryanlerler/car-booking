import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Col,
  Row,
  Container,
  Form,
  Button,
  Navbar,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaCar } from "react-icons/fa";
import "../css/Home.css";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    location: "",
    startDate: "",
    endDate: "",
    carType: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/cars`
        );
        setCars(data);
      } catch (err) {
        setError("Failed to fetch cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Search params:", searchParams);
  };

  return (
    <div className="home-page">
      <Container>
        <br />
        <h2 className="text-center mb-4">Find Your Perfect Ride</h2>
        <Form onSubmit={handleSearch} className="search-form mb-5">
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>
                  <FaMapMarkerAlt /> Location
                </Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={searchParams.location}
                  onChange={handleSearchChange}
                  placeholder="Enter pickup location"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>
                  <FaCalendarAlt /> Start Date
                </Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={searchParams.startDate}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>
                  <FaCalendarAlt /> End Date
                </Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={searchParams.endDate}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>
                  <FaCar /> Car Type
                </Form.Label>
                <Form.Select
                  name="carType"
                  value={searchParams.carType}
                  onChange={handleSearchChange}
                >
                  <option value="">Any</option>
                  <option value="economy">MPV</option>
                  <option value="luxury">Hatchback</option>
                  <option value="luxury">Sedan</option>
                  <option value="suv">SUV</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="mt-3">
            <FaSearch /> Search Cars
          </Button>
        </Form>

        {loading && <p className="text-center">Loading cars...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {!loading && !error && (
          <Row xs={1} md={3} lg={4} className="g-4">
            {cars && cars.length > 0 ? (
              cars.map((car) => (
                <Col key={car.id}>
                  <Card className="car-card h-100">
                    <div className="car-image-container">
                      <Card.Img
                        variant="top"
                        src={car.imageUrl}
                        alt={`${car.make} ${car.model}`}
                        className="car-image"
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className="car-title">
                        {car.make} {car.model}
                      </Card.Title>
                      <Card.Text>
                        <FaCar /> {car.type}
                      </Card.Text>
                      <Card.Text>
                        <strong>${car.pricePerDay}</strong> / day
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        {car.seatCount} seats
                      </small>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="float-end"
                      >
                        Book Now
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">No cars available at the moment.</p>
            )}
          </Row>
        )}
      </Container>

      <footer className="mt-5 py-3 bg-light">
        <Container>
          <Row>
            <Col md={4}>
              <h5>About Us</h5>
              <p>We provide top-quality car rentals for all your needs.</p>
            </Col>
            <Col md={4}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
              </ul>
            </Col>
            <Col md={4}>
              <h5>Contact Us</h5>
              <p>Email: sales@carboo.com</p>
              <a
                href={`https://wa.me/${+6512345678}?text=Hello%20there,%20I'm%20interested%20in%20your%20car%20`}
                target="_blank"
                rel="noopener noreferrer"
              >
                +65 1234 5678
              </a>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
