'use strict'
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Houses = require('../../models/houses.js')


router.get('/', function(req, res, next) {
    Houses.find({}, function(err, result) {
        res.json(result)
    })
});

router.post('/', function(req, res, next) {
    let newHouses = new Houses({
      owner_id: req.body.owner,
      location: req.body.location,
      lattitude: req.body.lattitude,
      longitude: req.body.longitude,
      prize: req.body.prize,
      bedroomNum: req.body.bedroom_num,
      bathroomNum: req.body.bathroom_num,
      size: req.body.size,
      mainphoto: req.body.main_photo,
      photos: req.body.photos
    }).save(function(err, result) {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            res.json({
                success: true,
                message: "add Houses is succesful",
                data: result
            })
        }
    })
});

router.put('/:id', function(req, res, next) {
    Houses.update({
        _id: req.params.id
    }, {
      owner_id: req.body.owner,
      location: req.body.location,
      city: req.body.city,
      nation: req.body.nation,
      lattitude: req.body.lattitude,
      longitude: req.body.longitude,
      prize: req.body.prize,
      bedroomNum: req.body.bedroom_num,
      bathroomNum: req.body.bathroom_num,
      size: req.body.size,
      mainphoto: req.body.main_photo,
      photos: req.body.photosnp
    }, function(err, result) {
        if (err) {
            res.json({
              success: false,
              message: err
            })
        } else {
          Houses.findOne({_id: req.params.id},function(err2,result2){
            res.json({
                success: true,
                message: "update Houses is successful",
                data: result
            })
          })
        }
    })
});

router.delete('/:id', function(req, res, next) {
    Houses.remove({
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
              message: "delete Houses is successful",
            })
        }
    })
})



module.exports = router;
