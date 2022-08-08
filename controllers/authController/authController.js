const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  // res.json("hello controller!");
  const { name, username, email, password, profile } = req.body;
  // hash password
  const saltRound = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, saltRound);

  if (!name || !username || !email || !password) {
    return res.json({
      message: "please enter information!",
    });
  }

  const user = new User({
    name: name,
    username: username,
    email: email,
    password: hashedPassword,
    profile: profile,
  });

  await user
    .save()
    .then((result) => {
      res.status(200).json({
        message: `hello ${name} your account has been created`,
        user,
      });
      console.log(result);
    })
    .catch((error) => {
      res.status(400).json({
        message: "signup error",
        error: error,
      });
    });
};

exports.signin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({
      message: "wrong username",
    });
  }

  const validatedPassword = await bcrypt.compare(password, user.password);
  if (!validatedPassword) {
    return res.status(401).json({
      message: "password invalid",
    });
  }

  if (user && validatedPassword == true) {
    let payload = { _id: user._id };
    const accountToken = jwt.sign(payload, process.env.ACCOUNT_SECRET_TOKEN);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
      // token lift .time.
      algorithm: "HS256",
      expiresIn: "1h",
    });
    res.status(200).json({
      message: `hello ${user.name} signin success`,
      accountToken: accountToken,
      refreshToken: refreshToken,
    });
  } else {
    console.log('singin fail');
    res.status(422).json({
        message:"signin fail",
    });
  }
};
