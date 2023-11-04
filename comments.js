// Create web server using express
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Comment = require('../models/comment');

// Get all comments
router.get('/', function(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.json(comments);
  });
});

// Get comments by id
router.get('/:id', function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.json(comment);
  });
});

// Post new comment
router.post('/', jsonParser, function(req, res) {
  Comment.create({
    user: req.body.user,
    text: req.body.text
  }, function(err, comment) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.status(201).json(comment);
  });
});

// Update comment
router.put('/:id', jsonParser, function(req, res) {
  Comment.findByIdAndUpdate(req.params.id, {
    $set: {
      user: req.body.user,
      text: req.body.text
    }
  }, function(err, comment) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.status(204).json(comment);
  });
});

// Delete comment
router.delete('/:id', function(req, res) {
  Comment.findByIdAndRemove(req.params.id, function(err, comment) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.status(204).json(comment);
  });
});

module.exports = router;