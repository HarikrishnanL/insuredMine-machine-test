/* eslint-disable indent */
/* eslint-disable no-unused-vars */

//Policy Category(LOB) - category_name

let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PolicyCategorySchema = new Schema({
    category_name: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("PolicyCategory", PolicyCategorySchema);
