// var Moive = require('../models/movie');
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');
console.log('Movie', Movie);

module.exports = {
  save: function(req, res){
    var movie = new Movie();
    console.log('moive', movie);
    movie.name = req.body.name;

    movie.save(function(err){
      if (err) return res.send(err);

      res.json({message: 'Movie created!'});
    });
  },
  list: function(req, res){
    console.log('test2', Movie);
    Movie.find(function(err, movies){
      if (err) res.send(err);

      res.json(movies);
    });
  }
}