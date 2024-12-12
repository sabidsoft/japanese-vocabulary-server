const { Schema, model } = require('mongoose');

const vocabularySchema = new Schema({
    word: {
        type: String,
        required: true,
        trim: true
    },

    pronunciation: {
        type: String,
        required: true,
        trim: true
    },
    
    meaning: {
        type: String,
        required: true,
        trim: true
    },

    whenToSay: {
        type: String,
        required: true,
        trim: true
    },

    lessonNumber: {
        type: Number,
        required: true
    },

    adminEmail: {
        type: String,
        required: true,
        trim: true
    },
  }, {
    timestamps: true
  });
  
  module.exports = model('Vocabulary', vocabularySchema);