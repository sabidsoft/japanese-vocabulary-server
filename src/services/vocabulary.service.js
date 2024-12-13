const Vocabulary = require("../models/Vocabulary");

exports.createVocabularyService = async (data) => {
    const vocabulary = await Vocabulary.create(data);
    return vocabulary;
}

exports.getVocabularyById = async (vocabularyId) => {
    const vocabulary = await Vocabulary.findOne({ _id: vocabularyId });
    return vocabulary;
}

exports.getVocabulariesByLessonNumberService = async (lessonNumber) => {
    const vocabularies = await Vocabulary.find({ lessonNumber });
    return vocabularies;
}


exports.getVocabulariesService = async () => {
    const vocabularies = await Vocabulary.find({}).sort({ createdAt: -1 }); // Sorting by descending order of `createdAt`
    return vocabularies;
};
exports.updateVocabularyService = async (id, updateData) => {
    const updatedVocabulary = await Vocabulary.findByIdAndUpdate(id, updateData, { new: true });
    return updatedVocabulary;
};

exports.deleteVocabularyService = async (id) => {
    const result = await Vocabulary.deleteOne({ _id: id });
    return result;
}
