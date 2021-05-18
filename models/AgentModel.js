/* eslint-disable indent */
/* eslint-disable no-unused-vars */
//Agent - Agent Name

let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let AgentSchema = new Schema({
    agent: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Agent", AgentSchema);

