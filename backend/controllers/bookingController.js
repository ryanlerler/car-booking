const BaseController = require("./baseController");

class BookingController extends BaseController {
  constructor(model, userModel, carModel) {
    super(model);
    this.userModel = userModel;
    this.carModel = carModel;
  }

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
}

module.exports = BookingController;
