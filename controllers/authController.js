const { isValidEmail } = require("../helpers/utils");
const userSchema = require("../models/userSchema");

const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname) return res.status(400).send("Fullname is required");
    if (!email) return res.status(400).send("Email is required");
    if (!isValidEmail(email)) return res.status(400).send("Invalid email");
    if (!password) return res.status(400).send("Password is required");

    // ---------exesting email check
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }

    // ---------save user data in database
    const user = userSchema({
      fullname,
      email,
      password,
    });

    user.save();

  } catch (err) {
    return res.status(500).send("Server error");
  }

  res.status(200).send("Signup successful!");
};

module.exports = {
  signup,
};
