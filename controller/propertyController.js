const Property = require("../models/propertyModel");

module.exports = {
  getAllProperties: async (req, res) => {
    try {
      const properties = await Property.find();
      res.send(properties);
    } catch (error) {
      res.send({ message: error.message });
    }
  },

  getPropertyByAgency: async (req, res) => {
    try {
      const { id } = req.query;
      const filter = { agency_id: id };
      console.log(id);
      const properties = await Property.find(filter);

      res.send(properties);
    } catch (error) {
      res.send({ message: error.message });
    }
  },

  //   getPropertyrent: async (req, res) => {
  //     try {
  //       const properties = await Property.find({ buyOrRent: "rent" });
  //       res.json(properties);
  //     } catch (error) {
  //       res.send({ message: error.message });
  //     }
  //   },

  //   getPropertybuy: async (req, res) => {
  //     try {
  //       const properties = await Property.find({ buyOrRent: "buy" });
  //       res.json(properties);
  //     } catch (error) {
  //       res.send({ message: error.message });
  //     }
  //   },

  getPropertyById: async (req, res) => {
    try {
      const property = await Property.findById(req.query.id);
      if (!property) {
        return res.send({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.send({ message: error.message });
    }
  },

  addProperty: async (req, res) => {
    console.log(req.file);
    console.log(req.files);
    try {
      const {
        title,
        location,
        price,
        size,
        bedrooms,
        buyOrRent,
        bathrooms,
        propertyType,
        phone,
        description,
        agency_id,
        cityId,
      } = req.body;
      if (
        !title ||
        !location ||
        !price ||
        !size ||
        !propertyType ||
        !buyOrRent ||
        !phone ||
        !description ||
        !agency_id ||
        !cityId ||
        !bedrooms
      ) {
        return res.send({ message: "Please fill all fields" });
      }
      //   const images = req.files.map((val) => val.path); // Use val.path to access the file path
      const images = req.file.path;
      const newProperty = new Property({
        title,
        location,
        price,
        size,
        bedrooms,
        buyOrRent,
        agency_id,
        image: images,
        cityId,
        bathrooms,
        propertyType,
        phone,
        description,
      });

      const savedProperty = await newProperty.save();
      // res.send({ userid: user_id });
      res.send(savedProperty);
    } catch (error) {
      res.send({ message: error.message });
    }
  },

  updateProperty: async (req, res) => {
    try {
      const { id } = req.query;
      const {
        title,
        location,
        price,
        size,
        bedrooms,
        propertyType,
        bathrooms,
        file,
        phone,
        buyOrRent,
        cityId,
      } = req.body;

      // Find the property to update
      const property = await Property.findById(id);
      if (!property) {
        return res.send({ message: "Property not found" });
      }

      // Update property data
      property.title = title;
      property.location = location;
      property.price = price;
      property.size = size;
      property.bedrooms = bedrooms;
      property.bathrooms = bathrooms;
      property.propertyType = propertyType;
      property.buyOrRent = buyOrRent;
      property.phone = phone;
      property.file = file;
      property.cityId = cityId;
      if (req.file !== undefined) {
        property.image = req.file.path;
      }

      const updatedProperty = await property.save();
      res.send(updatedProperty);
    } catch (error) {
      res.send({ message: error.message });
    }
  },
  //   makePropertyFeature: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const { is_featured } = req.body;
  //       // Find the property to update
  //       const property = await Property.findById(id);
  //       if (!property) {
  //         return res.send({ message: "Property not found" });
  //       }
  //       // Update property data
  //       property.is_featured = is_featured;

  //       const updatedProperty = await property.save();
  //       res.json(updatedProperty);
  //     } catch (error) {
  //       res.send({ message: error.message });
  //     }
  //   },
  deleteProperty: async (req, res) => {
    try {
      const { id } = req.query;

      // Find the property to delete
      const property = await Property.findByIdAndDelete(id);
      if (!property) {
        return res.send({
          message: "Property Not Found",
        });
      }
      return res.send({
        message: "deleted Successfully",
      });
    } catch (error) {
      res.send({ message: error.message });
    }
  },
};
