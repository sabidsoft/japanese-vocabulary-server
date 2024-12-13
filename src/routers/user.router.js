const router = require("express").Router();
const { register, login, getUsers, updateUserRole } = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");
const uploads = require("../utils/multer");

router.get("/", verifyToken, getUsers);
router.put("/update-role/:userId", verifyToken, updateUserRole);
router.post("/register", uploads.single('profilePicture'), register);
router.post("/login", login);

module.exports = router;