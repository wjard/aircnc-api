const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    techsindex: [String],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

SpotSchema.methods.toJSON = function() {
    var obj = this.toObject()
    delete obj.techsindex
    return obj
  }

module.exports = mongoose.model('Spot', SpotSchema);