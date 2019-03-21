'use strict'
module.exports = function(app){
  const score = require('../controllers/scoreController')

  app.route('/scores')
    .get(score.get_scores)
    .post(score.create_score)
}
