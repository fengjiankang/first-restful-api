// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');


var mongoose = require('mongoose');

var Bear = require('./app/models/bear');
var Movie = require('./app/models/movie');

// mongoose.connect('mongodb://localhost:27017/third');
function modeldb(){
  var db = mongoose.connect('mongodb://localhost:27017/third');
  require('./app/models/bear');
  require('./app/models/movie');
  return db;
}

var db = modeldb();


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next(); // make sure wo go to the next routes and don't stop here
})

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


// more routes for our API will happen here

router.route('/bears')
  .post(function(req, res) {
    var bear = new Bear(); // create a new instance of the Bear Model
    bear.name = req.body.name;

    // save the bear and check for errors
    bear.save(function(err) {
      if (err) res.send(err);

      res.json({ message: 'Bear created!' });
    });
  })
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err) res.send(err);

      res.json(bears)
    })
  });

router.route('/bears/:bear_id')
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) res.send(err);

      res.json(bear);
    });
  })
  .put(function(req, res) {
    // use our bear model to find the bear wo want
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) res.send(err);

      bear.name = req.body.name;

      // save the bear
      bear.save(function(err) {
        if (err) res.send(err);

        res.json({message: 'Bear updated!'});
      });
    });
  })
  .delete(function(req, res) {
    Bear.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if (err) res.send(err);

      res.json({message: 'Successfully deleted'});
    });
  });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);