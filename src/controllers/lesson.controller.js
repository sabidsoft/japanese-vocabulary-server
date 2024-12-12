const createError = require("http-errors");
const { successResponse } = require("../utils/response");
const Lesson = require("../models/Lesson");
const {
    createLessonService,
    updateLessonService,
    getLessonById,
    deleteLessonService,
    getLessonsService
} = require("../services/lesson.service");

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

        // Check for duplicate lesson name
        const existingLessonByName = await Lesson.findOne({ lessonName });
        if (existingLessonByName) {
            throw createError(400, "Lesson name already exists!");
        }

        // Check for duplicate lesson number
        const existingLessonByNumber = await Lesson.findOne({ lessonNumber });
        if (existingLessonByNumber) {
            throw createError(400, "Lesson number already exists!");
        }

        // Create the lesson
        const lesson = await createLessonService({ lessonName, lessonNumber });

        // Send successful response
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

        // Send successful response
        successResponse(res, {
            status: 200,
            message: "Lessons fetched successfully!",
            payload: { lessons },
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
        if (!id) throw createError(400, "ID is required!");

        // checking lesson exist or not
        const isLessonExist = await getLessonById(id);
        if (!isLessonExist)
            throw createError(400, "Lesson not found!");

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