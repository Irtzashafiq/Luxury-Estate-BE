// const auth = require("../controller/userController");
const user = require("../models/userModel");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const login = await user.findOne({ email });

      if (!login) {
        return res.send({
          message: "User Not Found",
        });
      }
      if (password !== login.password) {
        return res.send({
          message: "invalid credentrials",
        });
      }
      return res.send({
        message: "Logged In Successfully",
        userId: login._id,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
};
