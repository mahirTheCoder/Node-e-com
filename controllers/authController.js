const { isValidEmail } = require("../helpers/utils");

const signup = (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname) return res.status(400).send("Fullname is required");
    if (!isValidEmail(email)) return res.status(400).send("Invalid email");
    if (!password) return res.status(400).send("Password is required");
  } catch (err) {
    console.error("Error during signup:", err);
    return res.status(500).send("An error occurred during signup");
  }

  res.status(200).send("Signup successful!");
};

module.exports = {
  signup,
};
