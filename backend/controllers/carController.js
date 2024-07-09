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
      return res.json(car);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = CarController;
