const Agency = require("../models/agencyModel");
const joi = require("joi");

const createAgencySchema = joi.object().keys({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(20).required(),
  contactInfo: joi.string(),
  //   confirmPassword: joi.ref("password"),
});

module.exports = {
  createAgency: async (req, res) => {
    try {
      const { email } = req.body;
      const validate = await createAgencySchema.validateAsync(req.body);
      const existingAgency = await Agency.findOne({ email });
      var agencyCreated;
      var image;

      if (existingAgency) {
        return res.send({
          message: "Email already registered",
          response: existingAgency,
        });
      }
      if (req.file !== undefined) {
        console.log(req.file, "========================");
        image = req.file.path;
      }

      const agency = new Agency({
        username: validate.username,
        email: validate.email,
        password: validate.password,
        contactInfo: validate.contactInfo,
        image: image,
      });

      if (!existingAgency) {
        agencyCreated = await Agency.create(agency);
      }

      return res.send({
        message: "Agency Created Successfully",
        response: agencyCreated,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },

  loginAgency: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const login = await Agency.findOne({ email });
      if (!login) {
        return res.send({
          message: "Email Not Found",
        });
      }

      if (password !== login.password) {
        return res.send({
          message: "invalid credentrials",
        });
      }
      return res.send({
        message: "Logged In Successfully",
        // userId: login._id,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  getAllAgencies: async (req, res) => {
    try {
      const agencies = await Agency.find();
      return res.send({
        response: agencies,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  getAgencybyId: async (req, res) => {
    try {
      console.log(req.query, "===============");
      const agencies = await Agency.findById(req.query.id);
      return res.send({
        response: agencies,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
};
