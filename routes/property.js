const express = require("express");
const multer = require("multer");
const {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getPropertyByAgency,
} = require("../controller/propertyController");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/addproperty", upload.single("image"), addProperty);
router.get("/getAllProperty", getAllProperties);
router.get("/getProperty:id", getPropertyById);
router.get("/getPropertyByAgency:id", getPropertyByAgency);
router.put("/updateProperty:id", updateProperty);
router.delete("/deleteProperty:id", deleteProperty);

module.exports = router;
