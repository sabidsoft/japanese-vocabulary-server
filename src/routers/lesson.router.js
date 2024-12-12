const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const {
    createLesson,
    getLessonsWithVocabularyCount,
    getLessons,
    updateLesson
} = require("../controllers/lesson.controller");

router.get("/user-lessons", verifyToken, getLessons);
router.get("/admin-lessons", verifyToken, getLessonsWithVocabularyCount);

router.post("/", verifyToken, createLesson);
router.put("/:id", verifyToken, updateLesson);

module.exports = router;