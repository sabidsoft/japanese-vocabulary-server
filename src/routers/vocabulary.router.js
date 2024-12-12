const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const {
    getVocabularies,
    createVocabulary,
    updateVocabulary,
    deleteVocabulary
} = require("../controllers/vocabulary.controller");

router.get("/", verifyToken, getVocabularies);
router.post("/", verifyToken, createVocabulary);
router.put("/:id", verifyToken, updateVocabulary);
router.delete("/:id", verifyToken, deleteVocabulary);

module.exports = router;