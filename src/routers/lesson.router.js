const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const {
    createLesson,
    getLessons,
    updateLesson,
    deleteLesson
} = require("../controllers/lesson.controller");

router.get("/", verifyToken, getLessons);

router.post("/", verifyToken, createLesson);
router.put("/:id", verifyToken, updateLesson);
router.delete("/:id", verifyToken, deleteLesson);

module.exports = router;