/* eslint-disable indent */
//Policy Carrier - company_name

let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PolicyCarrierSchema = new Schema({
    company_name: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("PolicyCarrier", PolicyCarrierSchema);

