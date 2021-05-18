//User - first name, Dob, address, phone number, state, zip code, email, gender, userType
var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	firstname: { type: String },
	dob: { type: Date },
	address: { type: String },
	phone: { type: String },
	state: { type: String },
	city: { type: String },
	zip: { type: String },
	email: { type: String },
	gender: { type: String },
	userType: { type: String }
}, { timestamps: true });

// Virtual for user's full name
// UserSchema
// 	.virtual("fullName")
// 	.get(function () {
// 		return this.firstName + " " + this.lastName;
// 	});

module.exports = mongoose.model("User", UserSchema);