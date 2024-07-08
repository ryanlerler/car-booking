import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table, Image } from "react-bootstrap";
import { UserContext } from "../App";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const value = useContext(UserContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/bookings/users/${
            value.loggedInUser.id
          }`
        );
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [value.loggedInUser.id]);

  return (
    <div>
      <h1 className="mt-3">Manage Bookings</h1>
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
                  <td>{booking.startDate}</td>
                  <td>{booking.endDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}
