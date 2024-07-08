const BaseController = require("./baseController");

class BookingController extends BaseController {
  constructor(model, userModel, carModel) {
    super(model);
    this.userModel = userModel;
    this.carModel = carModel;
  }

  getAll = async (req, res) => {
    try {
      const data = await this.model.findAll({
        include: [this.userModel, this.carModel],
      });
      return res.json(data);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getOne = async (req, res) => {
    const { bookingId } = req.params;
    try {
      const booking = await this.model.findByPk(bookingId, {
        include: [this.userModel, this.carModel],
      });
      return res.json(booking);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  addBooking = async (req, res) => {
    const { userId, carId, startDate, endDate } = req.body;
    try {
      const newBooking = await this.model.create({
        userId,
        carId,
        startDate,
        endDate,
      });
      return res.json(newBooking);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { userId, carId, startDate, endDate } = req.body;

    try {
      const bookingToUpdate = await this.model.findByPk(bookingId);

      const updatedBooking = await bookingToUpdate.update({
        userId,
        carId,
        startDate,
        endDate,
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
