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
    // router.post("/", this.checkJwt, this.controller.addBooking);
    // router.put("/:bookingId", this.checkJwt, this.controller.updateBooking);
    // router.delete("/:bookingId", this.checkJwt, this.controller.deleteBooking);
    return router;
  };
}

module.exports = BookingRouter;
