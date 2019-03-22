'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    default: 0
  }
})

const Score = mongoose.model('Scores', ScoreSchema)

module.exports = Score.find().limit(10)
