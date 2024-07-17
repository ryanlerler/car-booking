import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Col, Row, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../App";
import { eachDayOfInterval, parseISO } from "date-fns";

export default function EditBookingForm() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [cars, setCars] = useState([]);
  const [bookingDates, setBookingDates] = useState({
    startDate: "",
    endDate: "",
  });
  const value = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBooking = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/bookings/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBooking(data);
      setBookingDates({
        startDate: parseISO(data.startDate),
        endDate: parseISO(data.endDate),
      });
    };

    const fetchCars = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/cars`
      );
      setCars(data);
    };

    fetchBooking();
    fetchCars();
  }, [bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBooking = {
      userId: value.loggedInUser.id,
      carId: booking.car.id,
      startDate: bookingDates.startDate,
      endDate: bookingDates.endDate,
    };

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/bookings/${bookingId}`,
        updatedBooking,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/manage-bookings");
    } catch (error) {
      alert("Car is already booked for the selected dates!");
      console.error("Error updating booking:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/bookings/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/managebookings");
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const getExcludedDates = () => {
    console.log(booking);
    if (!booking || !booking.car.bookings) return [];
    let excludedDates = [];
    booking.car.bookings.forEach((booking) => {
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

  if (!booking) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <h2 className="mt-3">Edit Booking</h2>
      <Row className="mt-3">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <strong>Booking ID: {booking.id}</strong>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Car:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={`${booking.car.make} ${booking.car.model}`}
                  readOnly
                />
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
                  readOnly
                  dateFormat="yyyy-MM-dd"
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
            </Form.Group>

            <h6>
              DISCLAIMER: You may extend the end date to a later date here, but
              changing of car, shortening end date to an earlier date, or
              postponing the start date after booking is <strong>NOT</strong>{" "}
              allowed!
            </h6>

            <Button type="submit" variant="primary">
              Update Booking
            </Button>
            <Button variant="danger" onClick={handleDelete} className="ms-3">
              Delete Booking
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={booking.car.imageUrl} />
            <Card.Body>
              <Card.Title>{`${booking.car.make} ${booking.car.model}`}</Card.Title>
              <Card.Text>
                <strong>Power:</strong> {booking.car.power} <br />
                <strong>Type:</strong> {booking.car.type} <br />
                <strong>Price:</strong> ${booking.car.pricePerDay}/day <br />
                <strong>Seats:</strong> {booking.car.seatCount} <br />
                <strong>Make Year:</strong> {booking.car.makeYear} <br />
                <strong>Vehicle No:</strong> {booking.car.vehicleNo} <br />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
