const {
    createLessonService,
    getLessonsService,
    getLessonsWithVocabularyCountService,
    updateLessonService,
    getLessonById,
    deleteLessonService
} = require("../services/lesson.service");
const createError = require("http-errors");

exports.createLesson = async (req, res, next) => {
    try {
        const { lessonName, lessonNumber } = req.body;

        // Validate lesson name
        if (!lessonName)
            throw createError(400, "Lesson name is required!");

        if (lessonName.length < 3)
            throw createError(400, "Lesson name must be at least 3 characters long!");

        // Validate lesson number
        if (!lessonNumber)
            throw createError(400, "Lesson number is required!");

        if (typeof lessonNumber !== 'number' || lessonNumber <= 0)
            throw createError(400, "Lesson number must be a positive number!");

        const lesson = await createLessonService({ lessonName, lessonNumber });

        // Send successfull response
        successResponse(res, {
            status: 200,
            message: "Lesson created successfully!",
            payload: { lesson },
        });
    } catch (err) {
        next(err);
    }
};

exports.getLessons = async (req, res, next) => {
    try {
        const lessons = await getLessonsService();

        // Send successfull response
        successResponse(res, {
            status: 200,
            message: "Lessons fetched successfully!",
            payload: { lessons },
        });
    } catch (err) {
        next(err);
    }
};

exports.getLessonsWithVocabularyCount = async (req, res, next) => {
    try {
        const lessonsWithCounts = await getLessonsWithVocabularyCountService();

        // Send successfull response
        successResponse(res, {
            status: 200,
            message: "Lessons fetched successfully!",
            payload: { lessonsWithCounts },
        });
    } catch (err) {
        next(err);
    }
};

exports.updateLesson = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { lessonName, lessonNumber } = req.body;

        // Validate id
        if (!id)
            throw createError(400, "ID is required!");

        const isLessonExist = await getLessonById(id);
        if (!isLessonExist)
            throw createError(400, "Lesson not found!");

        // Validate lesson name
        if (!lessonName)
            throw createError(400, "Lesson name is required!");

        if (lessonName.length < 3)
            throw createError(400, "Lesson name must be at least 3 characters long!");

        // Validate lesson number
        if (!lessonNumber)
            throw createError(400, "Lesson number is required!");

        if (typeof lessonNumber !== 'number' || lessonNumber <= 0)
            throw createError(400, "Lesson number must be a positive number!");

        const updatedLesson = await updateLessonService(id, { lessonName, lessonNumber });

        // Send successful response
        successResponse(res, {
            status: 200,
            message: "Lesson updated successfully!",
            payload: { updatedLesson },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteLesson = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate id
        if (!id) throw createError(400, "ID is required!");

        // Check if lesson exists
        const lesson = await getLessonById(id);
        if (!lesson) throw createError(400, "Lesson not found!");

        // Check if lesson has linked vocabularies
        const vocabCount = await Vocabulary.countDocuments({ lessonNumber: lesson.lessonNumber });
        if (vocabCount > 0) {
            throw createError(400, "Cannot delete lesson with linked vocabularies!");
        }

        // Delete the lesson
        const result = await deleteLessonService(id);

        // Send successful response
        successResponse(res, {
            status: 200,
            message: "Lesson deleted successfully!",
            payload: { result },
        });
    } catch (err) {
        next(err);
    }
};