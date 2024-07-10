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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { eachDayOfInterval, parseISO } from "date-fns";

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
  const token = localStorage.getItem("token");

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
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/bookings`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookingDetails(data);
      setBookingConfirmed(true);
    } catch (error) {
      alert("Car is already booked for the selected dates!");
      console.error("Error submitting booking:", error);
    }
  };

  const getExcludedDates = () => {
    if (!selectedCar || !selectedCar.bookings) return [];
    let excludedDates = [];
    selectedCar.bookings.forEach((booking) => {
      const startDate = parseISO(booking.startDate);
      const endDate = parseISO(booking.endDate);
      const interval = eachDayOfInterval({
        start: startDate,
        end: endDate,
      });
      excludedDates = excludedDates.concat(interval);
    });
    return excludedDates;
  };

  if (bookingConfirmed) {
    return <ConfirmationPage bookingDetails={bookingDetails} />;
  }

  return (
    <Container>
      <h2 className="mt-3">Book a Car</h2>
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
                <DatePicker
                  selected={bookingDates.startDate}
                  onChange={(date) =>
                    setBookingDates({ ...bookingDates, startDate: date })
                  }
                  minDate={new Date()}
                  excludeDates={getExcludedDates()}
                  dateFormat="yyyy-MM-dd"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                End Date:
              </Form.Label>
              <Col sm="8">
                <DatePicker
                  selected={bookingDates.endDate}
                  onChange={(date) =>
                    setBookingDates({ ...bookingDates, endDate: date })
                  }
                  minDate={bookingDates.startDate || new Date()}
                  excludeDates={getExcludedDates()}
                  dateFormat="yyyy-MM-dd"
                  required
                />
              </Col>

              <h6>
                DISCLAIMER: You may extend the end date later , but changing the
                car or shortening the booking period after booking is{" "}
                <strong>NOT</strong> allowed!
              </h6>
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
