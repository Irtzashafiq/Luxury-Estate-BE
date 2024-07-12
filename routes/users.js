var express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/userController");
var router = express.Router();

router.post("/register", createUser);
router.get("/getalluser", getUsers);
router.get("/getuser/:id", getUserById);
router.post("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
