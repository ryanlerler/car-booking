const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(controller, checkJwt) {
    this.checkJwt = checkJwt;
    this.controller = controller;
  }

  routes = () => {
    router.get("/", this.controller.getAll);
    router.get("/:email", this.controller.getOne);
    router.post("/", this.controller.signUp);
    return router;
  };
}

module.exports = UserRouter;
