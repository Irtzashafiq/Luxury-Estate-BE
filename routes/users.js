var express = require("express");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const { login } = require("../controller/authController");

var router = express.Router();

router.post("/register", upload.single("image"), createUser);
router.get("/getalluser", getUsers);
router.get("/getuser/:id", getUserById);
router.post("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);
router.post("/login", login);

module.exports = router;
