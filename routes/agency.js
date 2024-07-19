var express = require("express");
const {
  createAgency,
  loginAgency,
  getAllAgencies,
  getAgencybyId,
} = require("../controller/agencyController");
const multer = require("multer");
var router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/register", upload.single("image"), createAgency);
router.post("/login", loginAgency);
router.get("/getAllAgencies", getAllAgencies);
router.get("/getAgency/:id", getAgencybyId);
module.exports = router;
