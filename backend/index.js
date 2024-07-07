const cors = require("cors");
const express = require("express");
require("dotenv").config();

const { auth } = require("express-oauth2-jwt-bearer");
const checkJwt = auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
});

const PORT = process.env.PORT || 3000;

const db = require("./db/models/index");
const { user, car, booking } = db;

const UserRouter = require("./routers/userRouter");
const UserController = require("./controllers/userController");
const userController = new UserController(user);
const userRouter = new UserRouter(userController, checkJwt).routes();

const CarRouter = require("./routers/carRouter");
const CarController = require("./controllers/carController");
const carController = new CarController(car, booking);
const carRouter = new CarRouter(carController, checkJwt).routes();

const BookingRouter = require("./routers/bookingRouter");
const BookingController = require("./controllers/bookingController");
const bookingController = new BookingController(booking, user, car);
const bookingRouter = new BookingRouter(bookingController, checkJwt).routes();

const allowedOrigins = [process.env.FRONTEND];

const corsOptions = {
  origin: allowedOrigins,
};

const app = express(corsOptions);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/bookings", bookingRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express app listening on port ${PORT}!`);
});
