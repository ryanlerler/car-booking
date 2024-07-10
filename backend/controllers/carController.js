const BaseController = require("./baseController");

class CarController extends BaseController {
  constructor(model, bookingModel) {
    super(model);
    this.bookingModel = bookingModel;
  }

  getAll = async (req, res) => {
    try {
      const data = await this.model.findAll({
        include: [this.bookingModel],
      });
      return res.json(data);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  getOne = async (req, res) => {
    const { carId } = req.params;
    try {
      const car = await this.model.findByPk(carId, {
        include: [this.bookingModel],
      });
      if (!car) {
        return res.status(404).json({ error: true, msg: "Car not found" });
      }
      return res.json(car);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  addCar = async (req, res) => {
    try {
      const newCar = await this.model.create({
        ...req.body,
      });
      return res.json(newCar);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = CarController;
