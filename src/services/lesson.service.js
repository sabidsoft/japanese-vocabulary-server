const Lesson = require("../models/Lesson");
const Vocabulary = require("../models/Vocabulary");

exports.createLessonService = async (data) => {
    const lesson = await Lesson.create(data);
    return lesson;
}

exports.getLessonsService = async () => {
    const lessons = await Lesson.find({});
    return lessons;
}

exports.getLessonsWithVocabularyCountService = async () => {
    const lessons = await Lesson.find().lean();

    const lessonsWithCounts = await Promise.all(
        lessons.map(async (lesson) => {
            const vocabCount = await Vocabulary.countDocuments({ lessonNumber: lesson.lessonNumber });
            return { ...lesson, vocabCount };
        })
    );
    return lessonsWithCounts;
};
