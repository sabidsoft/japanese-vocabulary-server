const { createLessonService } = require("../services/lesson.service");
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