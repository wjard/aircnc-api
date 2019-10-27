const mongoose = require('mongoose');

//Read the .env File
const dotenv = require('dotenv');
dotenv.config();

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    techsindex: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true        
    }
});

// SpotSchema.virtual('thumbnail_url').get(function () {
//     return `${process.env.API_IMAGE_URL}/files/${this.thumbnail}`;
// })

SpotSchema.methods.toJSON = function () {
    const url = process.env.API_IMAGE_URL;
    const obj = this.toObject();    
    obj.thumbnail_url = `${url}/files/${this.thumbnail}`;
    //obj.thumbnail = `${url}/files/${this.thumbnail}`;
    delete obj.techsindex;
    return obj;
}

module.exports = mongoose.model('Spot', SpotSchema);