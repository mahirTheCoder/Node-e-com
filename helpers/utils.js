const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 

const generateOTP = () => {
  // --------- Generate a random 4-digit OTP
  return crypto.randomInt(1000, 10000).toString();
};



//  Access Token Generate

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      roll: user.roll,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2h" }
  );
};

// ---------refresh token generate
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};


module.exports = { isValidEmail, generateOTP, generateAccessToken, generateRefreshToken }