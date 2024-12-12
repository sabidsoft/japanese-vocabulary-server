const Lesson = require("../models/Lesson");

exports.createLessonService = async (data) => {
    const lesson = await Lesson.create(data);
    return lesson;
}
