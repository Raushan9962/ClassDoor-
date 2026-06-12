//import the required modules
const express = require("express")
const router = express.Router()
//import course controller 
const { getCourseDetails, getAllCourses, createCourse } = require("../controllers/Course");
//import rating and  review controller
const { createRating, getAverageRating, getAllRating } = require("../controllers/RatingAndReview")
//import categary
const { createCategory, showAllcategorys, categaryPageDetails } = require('../controllers/Category')
//import section controller
const { createSection, updateSection, deleteSection, } = require("../controllers/Section")
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/SubSection")
// import auth  controller
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");
//Course can Only Created by Imstructors
router.post("/createCourse", auth, isInstructor, createCourse)
//add a section to a course
router.post("/addSection", auth, isInstructor, createSection)
//update a section 
router.patch("/updateSection", auth, isInstructor, updateSection)
//delete a section
router.delete("/deleteSection", auth, isInstructor, deleteSection)
//Edit/update sub section
router.patch("/updateSubSecton", auth, updateSubSection)
//delete sub section 
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection)
//add a sub section to a section 
router.post("/addSubSection", auth, isInstructor, createSubSection)

router.get("/getAllCourses", auth, isStudent, getAllCourses)
router.get("/getCourseDetails", auth, isAdmin, getCourseDetails)
//create course Rating 
router.post("/createRating", auth, isStudent, createRating)
//get hoga average 
router.get("/getAverageRating", getAverageRating)
router.get("/getAllRating", getAllRating)
module.exports = router