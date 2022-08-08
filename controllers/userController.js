const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.getAllUser = async (req, res, next) => {
  const user = await User.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(422).json({
        message: "get all users error",
        error: error,
      });
    });
};

exports.updateUser = async (req, res, next) => {
  // userId used in userRoute
  try {
    const saltRound = await bcrypt.genSalt(12);
    const _id = req.params.userId;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({
        message: "wrong user",
      });
    }
    //
    req.body.password = await bcrypt.hash(req.body.password, saltRound);
    const updateUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Profile updated",
      updateUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "update error",
      error: error,
    });
  }

  //   const { name, password, username, email, profile } = req.body;
  //   const userId = req.params.userId;
  //   const hashedPassword = await bcrypt.hash(password, saltRound);
  //   const updateInfo = {
  //     name: name,
  //     username: username,
  //     email: email,
  //     password: password,
  //     profile: profile,
  //   };
  //   await User.findByIdAndUpdate(userId, updateInfo)
  //     .select("name password username email")
  //     .then((result) => {
  //       console.log(`OLD:${password} : NEW ${password}`);
  //       console.log("profile updated", result);
  //       res.status(200).json({
  //         message: "profile updated",
  //         result,
  //       });
  //     })
  //     .catch((error) => {
  //       res.status(400).json({
  //         message: "user id invalid!",
  //       });
  //     });
};

// exports.deleteUser = async (req, res, next) =>{
//     const _id = req.params.userId;
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(400).json({
//         message: "wrong user",
//       });
//     };
//     const deletedUser = await User.findByIdAndDelete(_id).then((result) =>{
//         res.status(200).json({
//             message:"delete user success",
//             deletedUser
//         });
//     }).catch((error) =>{
//         console.log(error)
//         res.status(400).json({
//             message:"delete user error",
//             error:error
//         });
//     })
// };