
const transformPlayerResponse = (playerProfileData) => ({
    _id : playerProfileData._id,
      name: playerProfileData.name,
      birthplace: playerProfileData.birthplace,
      age: playerProfileData.age,
      image: playerProfileData.image,
      images: playerProfileData.images,
      height: playerProfileData.height,
      foot: playerProfileData.foot,
      position: playerProfileData.position,
      currentClub: playerProfileData.currentClub,
      joined: playerProfileData.joined,
      contractExpiry: playerProfileData.contractExpiry,
      createdAt : playerProfileData.createdAt
})

const transformUserResponse = (userData) => ({
    _id : userData._id,
    name: userData.name,
    email: userData.email,
    city : userData.city,
    phone: userData.phone
})

module.exports = {
    transformPlayerResponse,
    transformUserResponse
}