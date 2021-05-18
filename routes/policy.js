const express = require("express");
const router = express.Router();
const policyController = require("../controllers/policy");
const policyUpload = require("../middlewares/policyUpload");

router.post("/add-policy", policyUpload.single("sheet"), policyController.addPolicy);
router.post("/get-policy-username", policyController.getpolicyByUserName);
router.get("/get-policy", policyController.getPolicy);


module.exports = router;