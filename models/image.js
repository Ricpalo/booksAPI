const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength:3,
        maxlength:40
    },
    image: {
        data:Buffer,
        contentType:String
    }
});

module.exports = new mongoose.model('Image', ImageSchema);