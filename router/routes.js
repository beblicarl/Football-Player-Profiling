const express = require("express");
const router = express.Router();

//profile controller
const {
  addProfile,
  getSingleProfile,
  getAllProfiles,
  deleteProfile,
  updateProfile
} = require("../controllers/Profile");

const { 
      registerUser, 
      getAllUser, 
      loginUser,
      logoutUser } = require("../controllers/User");

const {
    registerUserSchema,
    loginSchema,
    addProfileSchema,
    getProfileSchema,
    updateProfileSchema,
    deleteProfileSchema
} = require("../schema")

const validateSchema = require("../middleware/validateSchema")

//profile route
router.route("/profile")
      .post( validateSchema(addProfileSchema), addProfile)
      .get(getAllProfiles)
      
router.route("/profile/:id")
      .get( validateSchema(getProfileSchema), getSingleProfile)
      .patch( validateSchema(updateProfileSchema) , updateProfile)
      .delete(validateSchema(deleteProfileSchema) , deleteProfile)

//user route
router.route("/user/register")
      .post( validateSchema(registerUserSchema), registerUser);
router.route("/user/login")
      .post(validateSchema(loginSchema), loginUser);
router.route("/user/logout")
      .get(logoutUser);
router.route("/user")
      .get(getAllUser);


module.exports = router;
