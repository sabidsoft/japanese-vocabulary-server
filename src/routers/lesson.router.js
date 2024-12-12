const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, );

module.exports = router;