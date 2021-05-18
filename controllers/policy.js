/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");

// imports models
const Agent = require("../models/AgentModel");
const PolicyCarrier = require("../models/PolicyCarrierModel");
const PolicyCategory = require("../models/PolicyCategoryModel");
const PolicyInfo = require("../models/PolicyInfoModel");
const UserAccountModel = require("../models/UserAccountModel");
const User = require("../models/UserModel");


exports.addPolicy = async (req, res, next) => {
    try {
        if (req.file === undefined) {
            return res.status(400).send("Please upload a CSV file!");
        }
        let policies = [];
        let filePath = __basedir + "/resources/" + req.file.filename;
        await fs.createReadStream(filePath)
            .pipe(csv.parse({ headers: true }))
            .on("error", (error) => {
                throw error.message;
            })
            .on("data", (row) => {
                policies.push(row);
            })
            .on("end", async () => {
                await Promise.all(policies.map(async (policy) => {
                    const policyCategory = new PolicyCategory({ category_name: policy.category_name });
                    const policyCarrier = new PolicyCarrier({ company_name: policy.company_name });
                    const user = new User({
                        firstname: policy.firstname,
                        dob: policy.dob,
                        address: policy.address,
                        phone: policy.phone,
                        state: policy.state,
                        city: policy.city,
                        zip: policy.zip,
                        email: policy.email,
                        gender: policy.gender,
                        userType: policy.userType
                    });

                    let addUser = await user.save();
                    let addPolicyCategory = await policyCategory.save();
                    let addPolicyCarrier = await policyCarrier.save();
                    const policyInfo = new PolicyInfo({
                        policy_number: policy.policy_number,
                        policy_start_date: policy.policy_start_date,
                        policy_end_date: policy.policy_end_date,
                        policy_category: addPolicyCategory._id,
                        policy_company: addPolicyCarrier._id,
                        user: addUser._id,
                    });
                    await policyInfo.save();
                }));

                return res.status(200).send({ Message: "added to database successfully" });
            });
    }
    catch (error) {
        throw error;
    }
};

exports.getpolicyByUserName = async (req, res, next) => {
    const firstname = req.body.firstname;
    const policyInfo = await PolicyInfo.findOne().populate({ path: "user", firstname: firstname });
    return res.status(200).send({ data: policyInfo });
};

exports.getPolicy = async (req, res, next) => {
    const policyInfo = await PolicyInfo.find().populate("user").populate("policy_category").populate("policy_company");
    return res.status(200).send({ data: policyInfo });
};