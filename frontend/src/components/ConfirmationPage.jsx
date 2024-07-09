import { Container, Card, Image, Row, Col, Button } from "react-bootstrap";
import { formatInTimeZone } from "date-fns-tz";

export default function ConfirmationPage({ bookingDetails }) {
  const handleRefresh = () => {
    window.location.reload();
  };

  const timeZone = "Singapore";

  const formattedStartDate = formatInTimeZone(
    bookingDetails.startDate,
    timeZone,
    "yyyy-MM-dd HH:mm:ssXXX"
  );
  const formattedEndDate = formatInTimeZone(
    bookingDetails.endDate,
    timeZone,
    "yyyy-MM-dd HH:mm:ssXXX"
  );

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>Booking Confirmation</Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Image
                src={bookingDetails.car.imageUrl}
                alt={bookingDetails.car.model}
                fluid
                thumbnail
              />
            </Col>
            <Col md={8}>
              <Row>
                <Col xs={6}>
                  <Card.Text>
                    <strong>Booking No:</strong> {bookingDetails.id}
                  </Card.Text>
                  <Card.Text>
                    <strong>Customer Name:</strong> {bookingDetails.user.name}
                  </Card.Text>
                  <Card.Text>
                    <strong>Vehicle No:</strong> {bookingDetails.car.vehicleNo}
                  </Card.Text>
                </Col>
                <Col xs={6}>
                  <Card.Text>
                    <strong>Make:</strong> {bookingDetails.car.make}
                  </Card.Text>
                  <Card.Text>
                    <strong>Model:</strong> {bookingDetails.car.model}
                  </Card.Text>
                  <Card.Text>
                    <strong>Rental Rate:</strong> $
                    {bookingDetails.car.pricePerDay}/day
                  </Card.Text>
                </Col>
              </Row>
              <Card.Text>
                <strong> Rental Period:</strong> {formattedStartDate} to{" "}
                {formattedEndDate}
              </Card.Text>
              <Button variant="primary" onClick={handleRefresh}>
                Book Another Car
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

// Todo: wrong timezone in confirmation/ bookings management; edit start/end dates; delete booking; find out how to implement admin role then admin to crud new car; Implement additional filters (like car type, price range) on the home page to improve user search capability.
