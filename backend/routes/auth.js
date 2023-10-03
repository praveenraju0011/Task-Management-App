const router = require("express").Router();

const User = require("../models/user.js");
const List = require("../models/list.js");
const bcrypt = require("bcrypt");
//sign in functionality
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const salt = 10;
    const hashpassword = bcrypt.hashSync(password, salt);
    const user = new User({ email, username, password: hashpassword });
    await user
      .save()
      .then(() => res.status(200).json({ message: "Sign up Successful" }));
  } catch (error) {
    res.status(200).json({ message: "User already Exists" });
  }
});

//Login

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(200).json({ message: "Email/Password is not correct" });
  }
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.status(200).json({ message: "Please Sign up first" });
    }

    if (user) {
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        res.status(200).json({ message: "Password is not correct" });
      }
      const { password, ...others } = user._doc;
      res.status(200).json({ others });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "User already Exists" });
  }
});

module.exports = router;
