const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    imgBuffer: {
        type: String,
        required: true
    },
    createdBy: {
        type:String,
        required: true
    },
    timeStamp: {
        type: Date,
        required: true
    }
});

const BlogModel = mongoose.model("blogs", BlogSchema);

module.exports = BlogModel;