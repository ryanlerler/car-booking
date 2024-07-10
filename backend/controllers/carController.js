const BaseController = require("./baseController");
const { Op } = require("sequelize");

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

  getAvailableCars = async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: true, msg: "Start date and end date are required." });
    }

    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);

    console.log(startDateTime);
    console.log(endDateTime);

    try {
      const cars = await this.model.findAll({
        include: [
          {
            model: this.bookingModel,
            where: {
              [Op.or]: [
                {
                  startDate: {
                    [Op.between]: [startDateTime, endDateTime],
                  },
                },
                {
                  endDate: {
                    [Op.between]: [startDateTime, endDateTime],
                  },
                },
                {
                  [Op.and]: [
                    {
                      startDate: {
                        [Op.lte]: startDateTime,
                      },
                    },
                    {
                      endDate: {
                        [Op.gte]: endDateTime,
                      },
                    },
                  ],
                },
              ],
            },
            required: false,
          },
        ],
      });

      // Filter out cars that have bookings in the specified date range
      const availableCars = cars.filter((car) => car.bookings.length === 0);

      return res.json(availableCars);
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
