const expressJwt = require("express-jwt");
const api = process.env.API_URL;

function auth() {
  const secret = process.env.SECRET;
  return expressJwt({
    secret,
    algorithms: ["HS256"]

  }).unless({
    path: [
      `${api}user/login`,
      `${api}user/register`,
    ],
  });
}

module.exports = auth;
