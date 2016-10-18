'use strict'
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Inbox = require('../../models/houses.js')


router.get('/', function(req, res, next) {
    Inbox.find({}, function(err, result) {
        res.json(result)
    })
});

router.post('/', function(req, res, next) {
    let newInbox = new Inbox({
      buyer_id: req.body.buyer_id,
      owner_id: req.body.owner_id,
      house_id: req.body.house_id,
      date: new Date().getDate(),
      month: new Date().getMonth()+1,
      year: new Date().getYear()+1900
    }).save(function(err, result) {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            res.json({
                success: true,
                message: "add inbox is succesful",
                data: result
            })
        }
    })
});

router.put('/:id', function(req, res, next) {
    Inbox.update({
        _id: req.params.id
    }, {
      buyer_id: req.body.buyer_id,
      owner_id: req.body.owner_id,
      house_id: req.body.house_id,
      date: new Date().getDate(),
      month: new Date().getMonth()+1,
      year: new Date().getYear()+1900,
      lastUpdate: new Date()
    }, function(err, result) {
        if (err) {
            res.json({
              success: false,
              message: err
            })
        } else {
          Inbox.findOne({_id: req.params.id},function(err2,result2){
            res.json({
                success: true,
                message: "update inbox is successful",
                data: result
            })
          })
        }
    })
});

router.delete('/:id', function(req, res, next) {
    Inbox.remove({
        _id: req.params.id
    }, function(err, result) {
        if (err) {
            res.json({
              success: false,
              message: err
            })
        } else {
            res.json({
              success: true,
              message: "delete inbox is successful",
            })
        }
    })
})



module.exports = router;
