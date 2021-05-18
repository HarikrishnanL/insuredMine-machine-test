/* eslint-disable indent */
let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PolicyInfoSchema = new Schema({
    policy_number: { type: String, required: true },
    policy_start_date: { type: Date, required: true },
    policy_end_date: { type: Date, required: true },
    policy_category: { type: Schema.ObjectId, ref: "PolicyCategory", required: true },
    policy_company: { type: Schema.ObjectId, ref: "PolicyCarrier", required: true },
    user: { type: Schema.ObjectId, ref: "User", required: true },

}, { timestamps: true });

module.exports = mongoose.model("PolicyInfo", PolicyInfoSchema);