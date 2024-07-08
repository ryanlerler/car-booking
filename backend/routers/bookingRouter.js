const express = require("express");
const router = express.Router();

class BookingRouter {
  constructor(controller, checkJwt) {
    this.checkJwt = checkJwt;
    this.controller = controller;
  }

  routes = () => {
    router.get("/", this.controller.getAll);
    router.get("/:bookingId", this.controller.getOne);
    router.post("/", this.controller.addBooking);
    router.put("/:bookingId", this.controller.updateBooking);
    router.delete("/:bookingId", this.controller.deleteBooking);
    return router;
  };
}

module.exports = BookingRouter;
