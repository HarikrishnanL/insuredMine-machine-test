const express = require("express");
const router = express.Router();
const cronPhaseController = require("../controllers/cronPhase");


router.post("/add-cron-phase", cronPhaseController.addCronFirstPhase);


module.exports = router;