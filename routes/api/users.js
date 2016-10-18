'use strict'
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Houses = require('../../models/houses.js')


router.get('/', function(req, res, next) {
    Houses.users.find({}, function(err, result) {
        res.json(result)
    })
});

router.post('/', function(req, res, next) {
    let newUser = new   Houses.users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    }).save(function(err, result) {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            res.json({
                success: true,
                message: "add user is succesful",
                data: result
            })
        }
    })
});

router.put('/:id', function(req, res, next) {
    Houses.users.update({
        _id: req.params.id
    }, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address
    }, function(err, result) {
        if (err) {
            res.json({
              success: false,
              message: err
            })
        } else {
          Houses.users.findOne({_id: req.params.id},function(err2,result2){
            res.json({
                success: true,
                message: "update user is successful",
                data: result
            })
          })
        }
    })
});

router.delete('/:id', function(req, res, next) {
  Houses.users.remove({
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
              message: "delete user is successful",
            })
        }
    })
})



module.exports = router;
