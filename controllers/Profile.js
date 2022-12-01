const profile = require("../model/profile");

//@Desc Add Profile
//@Route POST api/v1/product
//@access Private
exports.addProfile = async (req, res, next) => {
  try {
    
    const playerProfileData = await profile.create({
      name: req.body.name,
      birthplace: req.body.birthplace,
      age: req.body.age,
      image: req.body.image,
      images: req.body.images,
      height: req.body.height,
      foot: req.body.foot,
      position: req.body.position,
      currentClub: req.body.currentClub,
      joined: req.body.joined,
      contractExpiry: req.body.contractExpiry,
      dateCreated: new Date(),
    });
    
    await playerProfileData.save()
  
    await res.status(200).json({
      success: true,
      data: playerProfileData,
    });
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};
//@Desc Get Profile
//@Route GET api/v1/profile/:id
//@Access Public
exports.getSingleProfile = async (req, res, next) => {
  try {
    const playerProfileData = await profile
      .findOne({ _id: req.params.id })

    await res.status(200).json({
      success: true,
      data: playerProfileData,
    });
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};
//@Desc Get All Profile
//@Route GET api/v1/profile
//@Access Public
exports.getProfile = async (req, res, next) => {
  try {

    const playerProfileData = await profile.find().sort({ createdAt: "desc" })

    await res.status(200).json({
      success: true,
      data: playerProfileData,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
//@Desc update profile by id
//@Route PATCH api/v1/profile/:id
//@Access Private
exports.updateProfile = async (req, res, next) => {
  try {
    
    const playerProfileData = await profile.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        birthplace: req.body.birthplace,
        age: req.body.age,
        image: req.body.image,
        images: req.body.images,
        height: req.body.height,
        foot: req.body.foot,
        position: req.body.position,
        currentClub: req.body.currentClub,
        joined: req.body.joined,
        contractExpiry: req.body.contractExpiry,
        dateCreated: new Date(),
      },
      { new: true }
    );
    await playerProfileData.save();
    await res.status(200).json({
      success: true,
      data: playerProfileData,
    });
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};

//@Desc Delete a player profile
//@Route api/v1/profile/:id
//@Access Private
exports.deleteProfile = async (req, res, next) => {
  try {
    const playerProfileData = await profile.findByIdAndDelete(req.params.id);
    if (!playerProfileData) res.status(404).send("Profile Not Found");
    res.status(200).send(playerProfileData);
  } catch (err) {
    res.status(500).send(err);
  }
};