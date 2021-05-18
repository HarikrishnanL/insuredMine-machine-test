/* eslint-disable indent */
//Policy Carrier - company_name

let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let CronNextPhaseModel = new Schema({
    message: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("CronNextPhaseModel", CronNextPhaseModel);

