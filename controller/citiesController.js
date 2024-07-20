const City = require("../models/cityModel");

module.exports = {
  createCity: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.send({
          message: " City Not Found",
        });
      }
      const newCity = new City({ name });
      const savedCity = await newCity.save();
      return res.send({
        Response: savedCity,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  getCity: async (req, res) => {
    try {
      const cities = await City.find();
      res.json(cities);
    } catch (error) {
      res.send({
        message: error.message,
      });
    }
  },
};
