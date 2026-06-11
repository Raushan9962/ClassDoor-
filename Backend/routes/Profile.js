//import the required modules
const express = require("express")
const router = express.Router()

const { updateProfile, deleteAccount, getAllUserDetails } = require("../controllers/Profile");
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

router.patch("/updateProfile", auth, updateProfile)
router.delete("/deleteAccount", auth, deleteAccount)
router.get("/getAllUserDetails", auth, getAllUserDetails)
module.exports = router