const profile = require("../model/profile");
const { transformPlayerResponse } = require("../common/transform")

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

    });
    
    await playerProfileData.save()
  
    await res.status(200).json({
      success: true,
      data: {
      ...transformPlayerResponse(playerProfileData)
      },
    });
  } catch (err) {
    console.log(err.message)
    res.status(500).send(err);
  }
};
//@Desc Get Profile
//@Route GET api/v1/profile/:id
//@Access Private
exports.getSingleProfile = async (req, res, next) => {
  try {
    const playerProfileData = await profile
      .findOne({ _id: req.params.id })

    await res.status(200).json({
      success: true,
      data: {
        ...transformPlayerResponse(playerProfileData)
      },
    });
  } catch (err) {
    console.log(err.message)
    res.status(500).send(err);
  }
};
//@Desc Get All Profiles
//@Route GET api/v1/profile
//@Access Private
exports.getAllProfiles = async (req, res, next) => {
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
        contractExpiry: req.body.contractExpiry
      },
      { new: true }
    );
    await playerProfileData.save();
    await res.status(200).json({
      success: true,
      data: {
      ...transformPlayerResponse(playerProfileData),
      updatedAt : playerProfileData.updatedAt
      },
    });
  } catch (err) {
    console.log(err.message)
    res.status(500).send(err);
  }
};

//@Desc Delete a player profile
//@Route api/v1/profile/:id
//@Access Private
exports.deleteProfile = async (req, res, next) => {
  try {
    const playerProfileData = await profile.findByIdAndRemove(req.params.id);
    if (!playerProfileData) res.status(404)
    res.status(200).send("Player profile successfully deleted");
  } catch (err) {
    res.status(500).send(err);
  }
};