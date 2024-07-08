import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Col,
  Row,
  Card,
  Image,
} from "react-bootstrap";
import ConfirmationPage from "../components/ConfirmationPage";
import { UserContext } from "../App";

export default function BookingsForm() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingDates, setBookingDates] = useState({
    startDate: "",
    endDate: "",
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const value = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/cars`
      );
      setCars(data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      userId: value.loggedInUser.id,
      carId: selectedCar.id,
      startDate: bookingDates.startDate,
      endDate: bookingDates.endDate,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/bookings`,
        bookingData
      );
      setBookingDetails(response.data);
      setBookingConfirmed(true);
    } catch (error) {
      alert("Car is already booked for the selected dates!");
      console.error("Error submitting booking:", error);
    }
  };

  if (bookingConfirmed) {
    return <ConfirmationPage bookingDetails={bookingDetails} />;
  }

  return (
    <Container>
      <h1 className="mt-3">Book a Car</h1>
      <Row className="mt-3">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Select Car:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  as="select"
                  onChange={(e) =>
                    setSelectedCar(
                      cars.find((car) => car.id === parseInt(e.target.value))
                    )
                  }
                  required
                >
                  <option value="">Select a car</option>
                  {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.make} {car.model} - ${car.pricePerDay}/day
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Customer Name:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={value.loggedInUser.name}
                  readOnly
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Start Date:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="date"
                  value={bookingDates.startDate}
                  onChange={(e) =>
                    setBookingDates({
                      ...bookingDates,
                      startDate: e.target.value,
                    })
                  }
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                End Date:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="date"
                  value={bookingDates.endDate}
                  onChange={(e) =>
                    setBookingDates({
                      ...bookingDates,
                      endDate: e.target.value,
                    })
                  }
                  required
                />
              </Col>
            </Form.Group>

            <Button type="submit">Submit Booking</Button>
          </Form>
        </Col>
        {selectedCar && (
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>
                  {selectedCar.make} {selectedCar.model}
                </Card.Title>
                <Row>
                  <Col>
                    <strong>Power:</strong> {selectedCar.power}
                    <br />
                    <strong>Type:</strong> {selectedCar.type}
                    <br />
                    <strong>Price per day:</strong> ${selectedCar.pricePerDay}
                  </Col>
                  <Col>
                    <strong>Seat Count:</strong> {selectedCar.seatCount}
                    <br />
                    <strong>Make Year:</strong> {selectedCar.makeYear}
                    <br />
                    <strong>Vehicle No:</strong> {selectedCar.vehicleNo}
                  </Col>
                </Row>
                <Image
                  src={selectedCar.imageUrl}
                  alt={`${selectedCar.make} ${selectedCar.model}`}
                  fluid
                />
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
}
