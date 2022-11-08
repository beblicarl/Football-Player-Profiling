const express = require("express");
const router = express.Router();
//profile controller
const {
  addProfile,
  getSingleProfile,
  getProfile,
  deleteProfile,
  updateProfile
} = require("../controllers/Profile");

const { registerUser, getAllUser, loginUser,logoutUser } = require("../controllers/User");

//profile route
router.route("/profile")
      .post(addProfile)
      .get(getProfile)
      .delete(deleteProfile)

router.route("/profile/:id")
      .get(getSingleProfile)
      .patch(updateProfile);

//user route
router.route("/user/register")
      .post(registerUser);
router.route("/user/login")
      .post(loginUser);
router.route("/user/logout")
      .get(logoutUser);
router.route("/user")
      .get(getAllUser);


module.exports = router;
