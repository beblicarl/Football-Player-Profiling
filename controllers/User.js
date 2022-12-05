const user = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {transformUserResponse} = require("../common/transform")

//@Desc Register a User
//@Route POST api/v1/user/register
//@Access Public
exports.registerUser = async (req, res, next) => {
  try {
    //validate user to find if the data is registered in the database
    
    const { email } = req.body;
    let data = await user.findOne({ email });
    if (data) return res.status(400).send("User already registered.");


    //encrypt password data
    let password = bcrypt.hashSync(req.body.password, 10);
    //create the data
    const userData = await user.create({
      name: req.body.name,
      email: req.body.email,
      password,
      city: req.body.city,
      phone: req.body.phone
    });

    await userData.save();
    await res.status(200).json({
      success: true,
      data: {
        ...transformUserResponse(userData)
      },
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
//@Desc get a User
//@Route GET api/v1/user/
//@Access Private
exports.getAllUser = async (req, res, next) => {
  console.log(req)
  try {
    const userData = await user
      .find()
      .select("name email city country phone -_id");
  console.log(userData)
    await res.status(200).json({
      success: true,
      data: userData.map((userProfiles) => ({
        ...transformUserResponse(userProfiles)
      })),
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
//@Desc login a user
//@Route POST api/v1/user/login
//@Access Public
exports.loginUser = async (req, res, next) => {
  try {
    //find user in the data base
    console.log(req)
    const userData = await user.findOne({
      email: req.body.email,
    });

    if (!userData)
      return await res
        .status(401)
        .send(`The Email ${req.body.email} not Found`);

    if (userData && bcrypt.compareSync(req.body.password, userData.password)) {
      let token = jwt.sign(
        { userId: userData._id },
        process.env.SECRET,
        {expiresIn: 360 * 2, algorithm : 'HS256' }
        
        );

        res.cookie("token", token, {
          expire: 360 * 2 + Date.now()
        })
       
      return await res
        .status(200)
        .send({ Message: `Welcome ${userData.name}`, token });
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

//@Desc logout a user
//@Route POST api/v1/user/logout
//@Access Private
exports.logoutUser = async (req, res, next) => {

 try {
    res.clearCookie("token")
    return await res
        .status(200)
        .send({ Message: `User has been logged out`});
  
 } catch (err) {
  res.status(400).send(err.message);
 }

}