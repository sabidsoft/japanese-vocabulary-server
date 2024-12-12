const router = require("express").Router();
const { createLesson, getLessonsWithVocabularyCount, getLessons } = require("../controllers/lesson.controller");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, createLesson);
router.get("/user-lessons", verifyToken, getLessons);
router.get("/admin-lessons", verifyToken, getLessonsWithVocabularyCount);

module.exports = router;