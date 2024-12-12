const { Schema, model } = require('mongoose');

const lessonSchema = new Schema({
    lessonName: {
        type: String,
        required: true,
        trim: true
    },

    lessonNumber: {
        type: Number,
        required: true,
        unique: true
    },
}, {
    timestamps: true
});

module.exports = model('Lesson', lessonSchema);