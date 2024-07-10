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
                  <Card.Text>
                    <strong>Rental Period:</strong> {formattedStartDate} to{" "}
                    {formattedEndDate}
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
                  <Card.Text>
                    <strong>Power:</strong> {bookingDetails.car.power}
                  </Card.Text>
                  <Card.Text>
                    <strong>Type:</strong> {bookingDetails.car.type}
                  </Card.Text>
                  <Card.Text>
                    <strong>Seat Count:</strong> {bookingDetails.car.seatCount}
                  </Card.Text>
                  <Card.Text>
                    <strong>Make Year:</strong> {bookingDetails.car.makeYear}
                  </Card.Text>
                </Col>
              </Row>
              <Button
                variant="primary"
                onClick={handleRefresh}
                className="mt-3"
              >
                Book Another Car
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
