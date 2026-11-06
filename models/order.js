var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    customer: {
        name: String,
        phone: String,
        address: String
    },
    items: Array,
    total: Number
});

module.exports = mongoose.model("Order", orderSchema);