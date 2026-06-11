//import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, varifySignature } = require("../controllers/Payment");
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", varifySignature)
module.exports = router
