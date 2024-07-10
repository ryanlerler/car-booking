const { Op } = require("sequelize");

const BaseController = require("./baseController");

class BookingController extends BaseController {
  constructor(model, userModel, carModel) {
    super(model);
    this.userModel = userModel;
    this.carModel = carModel;
  }

  getAll = async (req, res) => {
    const { userId } = req.params;

    try {
      const data = await this.model.findAll({
        where: {
          userId,
        },
        include: [this.userModel, this.carModel],
      });
      return res.json(data);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  getOne = async (req, res) => {
    const { bookingId } = req.params;
    try {
      const booking = await this.model.findByPk(bookingId, {
        include: [
          {
            model: this.userModel,
          },
          {
            model: this.carModel,
            include: [
              {
                model: this.model,
              },
            ],
          },
        ],
      });
      if (!booking) {
        return res.status(404).json({ error: true, msg: "Booking not found" });
      }
      return res.json(booking);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  addBooking = async (req, res) => {
    const { userId, carId, startDate, endDate } = req.body;

    try {
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);

      const overlappingBookings = await this.model.findAll({
        where: {
          carId,
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
      });

      if (overlappingBookings.length > 0) {
        return res.status(400).json({
          error: true,
          msg: "Car is already booked for the selected dates.",
        });
      }

      const newBooking = await this.model.create({
        userId,
        carId,
        startDate: startDateTime,
        endDate: endDateTime,
      });

      const bookingWithDetails = await this.model.findOne({
        where: { id: newBooking.id },
        include: [
          {
            model: this.userModel,
            as: "user",
          },
          {
            model: this.carModel,
            as: "car",
          },
        ],
      });

      return res.json(bookingWithDetails);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;

    try {
      const bookingToUpdate = await this.model.findByPk(bookingId);

      if (!bookingToUpdate) {
        return res.status(404).json({ error: true, msg: "Booking not found" });
      }

      const carId = bookingToUpdate.carId;

      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);

      const overlappingBookings = await this.model.findAll({
        where: {
          carId,
          id: { [Op.ne]: bookingId }, // Exclude the current booking
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
      });

      if (overlappingBookings.length > 0) {
        return res.status(400).json({
          error: true,
          msg: "Car is already booked for the selected dates.",
        });
      }

      const updatedBooking = await bookingToUpdate.update({
        startDate: startDateTime,
        endDate: endDateTime,
      });
      return res.json(updatedBooking);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  deleteBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
      const bookingToDelete = await this.model.findByPk(bookingId);

      if (!bookingToDelete) {
        return res.status(404).json({ error: true, msg: "Booking not found" });
      }

      await bookingToDelete.destroy();
      return res.json({
        msg: `Booking ${bookingId} successfully deleted`,
      });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = BookingController;
