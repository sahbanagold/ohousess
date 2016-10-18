var mongoose = require('mongoose')
mongoose.connect('mongodb://stackx:stackx@ds057816.mlab.com:57816/stackx')

var ObjectId = mongoose.Schema.ObjectId
var housesSchema = new mongoose.Schema({
    owner_id: {type: ObjectId, refs: 'users'},
    location: String,
    city: String,
    nation: String,
    lattitude: String,
    longitude: String,
    prize: Number,
    bedroomNum: Number,
    bathroomNum: Number,
    size: Number,
    mainphoto: String,
    photos: [String]
})
var usersSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: String,
    email: String,
    address: String
})
var inboxSchema = new mongoose.Schema({
    buyer_id: {type: ObjectId, refs: 'users'},
    owner_id: {type: ObjectId, refs: 'users'},
    house_id: {type: ObjectId, refs: 'houses'},
    date: Number,
    month: Number,
    year: Number
},{
  timestamps:true
})

var Houses = {
  houses: mongoose.model('houses', housesSchema),
  users : mongoose.model('users', usersSchema),
  inbox : mongoose.model('inbox', inboxSchema)
}


module.exports = Houses
