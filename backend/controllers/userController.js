const BaseController = require("./baseController");

class UserController extends BaseController {
  constructor(model) {
    super(model);
  }

  getOne = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await this.model.findOne({
        where: {
          useruserId,
        },
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  signUp = async (req, res) => {
    const { email, name, profilePicUrl, contactNo, isAdmin } = req.body;

    try {
      const [user] = await this.model.findOrCreate({
        where: {
          email,
        },
        defaults: {
          email,
          name,
          profilePicUrl,
          contactNo,
          isAdmin,
        },
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  updateProfile = async (req, res) => {
    const { email, name, profilePicUrl, contactNo, isAdmin } = req.body;

    const { userId } = req.params;

    try {
      const userToEdit = await this.model.findOne({
        where: {
          userId,
        },
      });

      const updatedUser = await userToEdit.update({
        email,
        name,
        profilePicUrl,
        contactNo,
        isAdmin,
      });
      return res.json(updatedUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = UserController;
