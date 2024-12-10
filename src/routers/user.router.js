const router = require("express").Router();
const { register, login } = require("../controllers/user.controller");
const uploads = require("../utils/multer");

router.post("/register", uploads.single('profilePicture'), register);
router.post("/login", login);

module.exports = router;