const express = require("express");
const router = express.Router();

class CarRouter {
  constructor(controller, checkJwt) {
    this.checkJwt = checkJwt;
    this.controller = controller;
  }

  routes = () => {
    router.get("/", this.controller.getAll);
    router.get("/available-cars", this.controller.getAvailableCars);
    router.get("/:carId", this.controller.getOne);
    router.post("/", this.checkJwt, this.controller.addCar);
    // router.put("/:carId", this.checkJwt, this.controller.updateCar);
    // router.delete("/:carId", this.checkJwt, this.controller.deleteCar);
    return router;
  };
}

module.exports = CarRouter;
