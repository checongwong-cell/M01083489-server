var mongoose = require("mongoose");

var lessonSchema = new mongoose.Schema({
    id: Number,
    topic: String,
    location: String,
    price: Number,
    space: Number,
    image: String
});

module.exports = mongoose.model("Lesson", lessonSchema);