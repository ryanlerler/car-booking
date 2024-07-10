const BaseController = require("./baseController");

class UserController extends BaseController {
  constructor(model) {
    super(model);
  }

  getOne = async (req, res) => {
    const { email } = req.params;
    try {
      const user = await this.model.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(404).json({ error: true, msg: "User not found" });
      }
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
}

module.exports = UserController;
