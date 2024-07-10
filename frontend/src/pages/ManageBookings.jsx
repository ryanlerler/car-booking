import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table, Image, Button } from "react-bootstrap";
import { UserContext } from "../App";
import { formatInTimeZone } from "date-fns-tz";
import { useNavigate } from "react-router-dom";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const value = useContext(UserContext);
  const navigate = useNavigate();

  const timeZone = "Singapore";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/bookings/users/${
            value.loggedInUser.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [value.loggedInUser.id]);

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/bookings/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div>
      <h2 className="mt-3">Manage Bookings</h2>
      <div>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Car Make</th>
                <th>Car Model</th>
                <th>Car Image</th>
                <th>Power</th>
                <th>Type</th>
                <th>Price</th>
                <th>Seat Count</th>
                <th>Make Year</th>
                <th>Vehicle No</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.car.make}</td>
                  <td>{booking.car.model}</td>
                  <td>
                    <Image
                      src={booking.car.imageUrl}
                      alt={`${booking.car.make} ${booking.car.model}`}
                      fluid
                      thumbnail
                    />
                  </td>
                  <td>{booking.car.power}</td>
                  <td>{booking.car.type}</td>
                  <td>${booking.car.pricePerDay}/day</td>
                  <td>{booking.car.seatCount}</td>
                  <td>{booking.car.makeYear}</td>
                  <td>{booking.car.vehicleNo}</td>
                  <td>
                    {formatInTimeZone(
                      booking.startDate,
                      timeZone,
                      "yyyy-MM-dd"
                    )}
                  </td>
                  <td>
                    {formatInTimeZone(booking.endDate, timeZone, "yyyy-MM-dd")}
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/edit-booking/${booking.id}`)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(booking.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}
