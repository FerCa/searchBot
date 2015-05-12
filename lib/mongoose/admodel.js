
var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var AdSchema = new Schema({
    title:  String,
    text: String,
    price:   String,
    link:   String,
    image:   String
});

AdSchema.index({title: 1, price: 1, link: 1}, {unique: true});

var adModel = mongoose.model('Ad', AdSchema);

module.exports = adModel;