/* eslint-disable indent */
//User's Account - Account Name
let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserAccountSchema = new Schema({
    account_name: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("UserAccount", UserAccountSchema);