const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const {
    getVocabularies,
    createVocabulary,
    updateVocabulary,
    deleteVocabulary,
    getVocabulariesByLessonNumber
} = require("../controllers/vocabulary.controller");

router.get("/", verifyToken, getVocabularies);
router.get("/:lessonNumber", verifyToken, getVocabulariesByLessonNumber);
router.post("/", verifyToken, createVocabulary);
router.put("/:id", verifyToken, updateVocabulary);
router.delete("/:id", verifyToken, deleteVocabulary);

module.exports = router;