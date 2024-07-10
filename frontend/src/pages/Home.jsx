import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/Home.css";

export default function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/cars`
      );
      setCars(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Row xs={1} md={3} className="g-4">
        {cars && cars.length > 0
          ? cars.map((car) => (
              <Col key={car.id}>
                <Card className="card">
                  <div className="files-container">
                    <Card.Img src={car.imageUrl} alt="file" className="files" />
                  </div>

                  <Card.Body>
                    <Card.Title className="card-title">
                      <strong>
                        {car.make} {car.model}
                      </strong>
                      <br />
                    </Card.Title>

                    <Card.Footer>
                      <Row>
                        <Col>${car.pricePerDay}/day</Col>
                        <Col>{car.type}</Col>
                        <Col>{car.seatCount}-seater</Col>
                      </Row>
                    </Card.Footer>

                    <Card.Footer></Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : "No Cars"}
      </Row>
    </div>
  );
}
