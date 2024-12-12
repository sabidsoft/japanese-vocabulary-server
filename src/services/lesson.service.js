const Lesson = require("../models/Lesson");
const Vocabulary = require("../models/Vocabulary");

exports.createLessonService = async (data) => {
    const lesson = await Lesson.create(data);
    return lesson;
}

exports.getLessonById = async (lessonId) => {
    const lesson = await Lesson.findOne({ _id: lessonId });
    return lesson;
}


exports.getLessonsService = async () => {
    const lessons = await Lesson.find({});
    return lessons;
}

exports.updateLessonService = async (id, updateData) => {
    const updatedLesson = await Lesson.findByIdAndUpdate(id, updateData, { new: true });
    return updatedLesson;
};

exports.deleteLessonService = async (id) => {
    const result = await Lesson.deleteOne({ _id: id });
    return result;
}