const joi = require("joi");
const user = require("../models/user");

const createUserSchema = joi.object().keys({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(20).required(),
  confirmPassword: joi.ref("password"),
});
const updateUserSchema = joi.object().keys({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(20).required(),
});
module.exports = {
  createUser: async (req, res) => {
    try {
      const { email } = req.body;
      const validate = await createUserSchema.validateAsync(req.body);
      const existingUser = await user.findOne({ email });

      var userCreated;
      if (!existingUser) {
        userCreated = await user.create(validate);
      }
      if (existingUser) {
        return res.send({
          message: "User already exist!",
          response: existingUser,
        });
      }
      if (userCreated.error) {
        return res.send({
          error: userCreated.error,
        });
      }
      return res.send({
        message: "User created successfully",
        response: userCreated,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await user.find();

      return res.send({
        response: users,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      console.log("Request Params:", req.query);
      const users = await user.findById(req.query.id);

      return res.send({
        response: users,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const users = await user.findById(req.query.id);
      const validate = await updateUserSchema.validateAsync(req.body);
      var userUpdated;
      if (users) {
        userUpdated = await user.updateOne(validate);
      }
      if (userUpdated.error) {
        return res.send({
          message: userUpdated.error,
        });
      }
      return res.send({
        message: "User updated successfully",
        response: userUpdated,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const users = await user.findByIdAndDelete(req.query.id);
      if (!users) {
        return res.send({
          message: "user not found!",
        });
      }
      if (users.error) {
        return res.send({
          message: users.error,
        });
      }
      return res.send({
        message: "User deleted successfully",
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
};