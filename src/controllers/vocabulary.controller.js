const Vocabulary = require("../models/Vocabulary");
const {
    getVocabulariesService,
    createVocabularyService,
    getVocabularyById,
    updateVocabularyService,
    deleteVocabularyService
} = require("../services/vocabulary.service");

exports.createVocabulary = async (req, res, next) => {
    try {
        const { word, pronunciation, meaning, whenToSay, lessonNumber, adminEmail } = req.body;

        // Validate word
        if (!word) throw createError(400, "Word is required!");

        // Validate pronunciation
        if (!pronunciation) throw createError(400, "Pronunciation is required!");

        // Validate meaning
        if (!meaning) throw createError(400, "Meaning is required!");

        // Validate when to say
        if (!whenToSay) throw createError(400, "When to say is required!");

        // Validate lesson number
        if (!lessonNumber) throw createError(400, "Lesson number is required!");
        if (typeof lessonNumber !== 'number' || lessonNumber <= 0)
            throw createError(400, "Lesson number must be a positive number!");

        // Validate admin email
        if (!adminEmail) throw createError(400, "Admin email is required!");


        // Check for duplicate word in the same lesson
        const existingVocabulary = await Vocabulary.findOne({ word, lessonNumber });
        if (existingVocabulary) {
            throw createError(400, `The word "${word}" already exists in lesson ${lessonNumber}!`);
        }

        // Create the vocabulary
        const newVocabulary = await createVocabularyService({ word, pronunciation, meaning, whenToSay, lessonNumber, adminEmail });

        // Send successful response
        successResponse(res, {
            status: 201,
            message: "Vocabulary created successfully!",
            payload: { newVocabulary },
        });
    } catch (err) {
        next(err);
    }
};

exports.getVocabularies = async (req, res, next) => {
    try {
        const vocabularies = await getVocabulariesService();

        // Send successfull response
        successResponse(res, {
            status: 200,
            message: "Vocabularies fetched successfully!",
            payload: { vocabularies },
        });
    } catch (err) {
        next(err);
    }
};

exports.updateVocabulary = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { word, pronunciation, meaning, whenToSay, lessonNumber } = req.body;

        // Validate id
        if (!id) throw createError(400, "ID is required!");

        // checking vocabulary exist or not
        const isVocabularyExist = await getVocabularyById(id);
        if (!isVocabularyExist)
            throw createError(400, "Vocabulary not found!");

        const updatedVocabulary = await updateVocabularyService(id, { word, pronunciation, meaning, whenToSay, lessonNumber });

        // Send successful response
        successResponse(res, {
            status: 200,
            message: "Vocabulary updated successfully!",
            payload: { updatedVocabulary },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteVocabulary = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate id
        if (!id) throw createError(400, "ID is required!");

        // Check if vocabulary exists
        const vocabulary = await getVocabularyById(id);
        if (!vocabulary) throw createError(400, "Vocabulary not found!");

        // Delete the vocabulary
        const result = await deleteVocabularyService(id);

        // Send successful response
        successResponse(res, {
            status: 200,
            message: "Vocabulary deleted successfully!",
            payload: { result },
        });
    } catch (err) {
        next(err);
    }
};