import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";
import { RiSendPlaneFill } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";

const PICTURE_STORAGE_KEY = "pictures/";

export default function AddCarForm() {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState({
    make: "",
    model: "",
    power: "",
    type: "",
    vehicleNo: "",
  });
  const [numberInput, setNumberInput] = useState({
    pricePerDay: "",
    seatCount: "",
    makeYear: "",
  });

  const [photoFileInputFile, setPhotoFileInputFile] = useState([]);
  const [photoFileInputValue, setPhotoFileInputValue] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleTextInputChange = ({ target }) => {
    const { name, value } = target;
    setTextInput({ ...textInput, [name]: value });
  };

  const handleNumberInputChange = ({ target }) => {
    const { name, value } = target;
    setNumberInput({ ...numberInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    let imageUrl = null;
    if (photoFileInputFile) {
      const pictureFileRef = storageRef(
        storage,
        `${PICTURE_STORAGE_KEY}${photoFileInputFile.name}`
      );

      await uploadBytes(pictureFileRef, photoFileInputFile);

      imageUrl = await getDownloadURL(pictureFileRef);
      console.log("url", imageUrl);
    }

    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/cars`,
      {
        make: textInput.make,
        model: textInput.model,
        power: textInput.power,
        type: textInput.type,
        vehicleNo: textInput.vehicleNo,
        pricePerDay: numberInput.pricePerDay,
        seatCount: numberInput.seatCount,
        makeYear: numberInput.makeYear,
        imageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate("/");
  };

  const handlePictureFileChange = ({ target }) => {
    const { files, value } = target;
    setPhotoFileInputFile(files[0]);
    setPhotoFileInputValue(value);
    const previewUrl = URL.createObjectURL(files[0]);

    setPhotoPreview(previewUrl);
  };

  return (
    <Container>
      <h2>Add A New Car</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Label>
              <small>Make</small>
            </Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                name="make"
                type="text"
                placeholder="Toyota"
                value={textInput.make}
                onChange={handleTextInputChange}
                required
                minLength={3}
                maxLength={35}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Label>
              <small>Model</small>
            </Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                name="model"
                type="text"
                placeholder="Sienta"
                value={textInput.model}
                onChange={handleTextInputChange}
                required
                minLength={3}
                maxLength={35}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Label>
              <small>Power</small>
            </Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                name="power"
                type="text"
                placeholder="Petrol/ Hybrid/ Diesel"
                value={textInput.power}
                onChange={handleTextInputChange}
                required
                minLength={3}
                maxLength={35}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Label>
              <small>Type</small>
            </Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                name="type"
                type="text"
                placeholder="MPV/ Sedan/ SUV"
                value={textInput.type}
                onChange={handleTextInputChange}
                required
                minLength={3}
                maxLength={35}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Label>
              <small>Price/ Day ($)</small>
            </Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                name="pricePerDay"
                type="number"
                placeholder="70"
                value={numberInput.pricePerDay}
                onChange={handleNumberInputChange}
                required
                min={1}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Label>
              <small>No of Seats</small>
            </Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                name="seatCount"
                type="number"
                placeholder="5"
                value={numberInput.seatCount}
                onChange={handleNumberInputChange}
                required
                min={1}
                max={8}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Label>
              <small>Year Manufactured</small>
            </Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                name="makeYear"
                type="number"
                placeholder="2024"
                value={numberInput.makeYear}
                onChange={handleNumberInputChange}
                required
                min={2000}
                max={2025}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Label>
              <small>Vehicle No</small>
            </Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                name="vehicleNo"
                type="text"
                placeholder="ABC1234"
                value={textInput.vehicleNo}
                onChange={handleTextInputChange}
                required
                minLength={3}
                maxLength={35}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">
                <small>
                  <strong>Upload Photo</strong>
                </small>
              </Form.Label>
              <Form.Control
                type="file"
                onChange={handlePictureFileChange}
                required
                accept="image/*"
                multiple
              />
            </Form.Group>
          </Col>

          {photoPreview && (
            <div>
              <img
                src={photoPreview}
                alt={`Preview ${photoPreview}`}
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
              <p>{photoFileInputValue}</p>
            </div>
          )}
        </Row>

        <Button type="submit" className="special-button">
          <RiSendPlaneFill />
        </Button>
        <Button onClick={() => navigate(-1)} className="special-button">
          <GiCancel />
        </Button>
      </Form>
    </Container>
  );
}
