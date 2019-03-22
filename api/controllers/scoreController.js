'use strict'

const mongoose = require('mongoose'),
  Score = mongoose.model('Scores');

  exports.get_scores = function(req, res){
    Score.find({}, function(err, score){
      if(err){
        res.send(err)
      }
      res.json(score)
    })
  }

  exports.create_score = function(req, res){
    
    const new_score = new Score(req.body);
    new_score.save(function(err, score){
      if(err){
        res.send(err);
      }
      res.json(score)
    })
  }
