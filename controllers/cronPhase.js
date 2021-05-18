/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const CronFirstPhase = require("../models/CronFirstPhaseModel");

exports.addCronFirstPhase = async (req, res, next) => {
    try {
        let cronFirstPhase = new CronFirstPhase(
            {
                message: req.body.message,
                day: req.body.day,
                time: req.body.time

            }
        );

        await cronFirstPhase.save();
        return res.status(200).send({ message: "cron job work added" });
    }
    catch (error) {
        throw error;
    }
};