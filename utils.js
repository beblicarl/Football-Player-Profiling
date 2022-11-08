const expressJwt = require("express-jwt");

function endSession() {
  const secret = process.env.SECRET;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  })
}
async function isRevoked(req, payload, done) {
  if (payload){
    done(null, true);
  }
  done();
}

module.exports = endSession;
