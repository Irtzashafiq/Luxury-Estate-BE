const express = require("express");
const { createCity, getCity } = require("../controller/citiesController");
const router = express.Router();

router.post("/createCity", createCity);
router.get("/getCity", getCity);
module.exports = router;
