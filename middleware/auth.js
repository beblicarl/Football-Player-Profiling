const expressJwt = require("express-jwt");
const api = process.env.API_URL;

function auth() {
  const secret = process.env.SECRET;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/api\/v1\/profile(.*)/, methods: ["POST", "OPTIONS"] },
      { url: /\/api\/v1\/profile(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/profile(.*)/, methods: ["PATCH", "OPTIONS"] },
      { url: /\/api\/v1\/profile(.*)/, methods: ["DELETE", "OPTIONS"] },
      `${api}user/login`,
      `${api}user/logout`,
      `${api}user/register`,
      `${api}profile`
    ],
  });
}
async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
}

module.exports = auth;
