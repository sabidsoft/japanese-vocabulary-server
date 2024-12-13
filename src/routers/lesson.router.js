const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const {
    createLesson,
    getLessons,
    updateLesson,
    deleteLesson,
    getLessonsWithVocabularyCount
} = require("../controllers/lesson.controller");

router.get("/", verifyToken, getLessons);
router.get("/lesson-management", verifyToken, getLessonsWithVocabularyCount);

router.post("/", verifyToken, createLesson);
router.put("/", verifyToken, updateLesson);
router.delete("/:id", verifyToken, deleteLesson);

module.exports = router;