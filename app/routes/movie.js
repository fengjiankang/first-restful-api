var express = require('express');
var router = express.Router();

var MovieController = require('../controllers/movie')
console.log('routes');

router.route('/movies')
.post(MovieController.save)
.get(MovieController.list);

module.exports = router;