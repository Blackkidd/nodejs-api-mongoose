const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getAllUser = async (req, res, next) =>{
    const user = await User.find().then((result) =>{
        res.status(200).json(result);
    }).catch((error) =>{
        res.status(422).json({
            message:"get all users error",
            error:error
        })
    });
};

exports.updateUser = async (req, res, next) =>{
    // userId used in userRoute
    const userId = req.params.userId;
    await User.findById(userId).then((result) =>{
        console.log(result);
        if(!result) {
            return res.status(400).json({
                message:"wrong user"
            })
        };

        // verify password
        const saltRound = await bcrypt.genSalt(12);
        req.body.password = await bcrypt.hash(req.body.password, saltRound);
        const updateUser = await User.findByIdAndUpdate(userId, req.body,{
            new: true,
       });

       res.status(200).json({
        message:"profile updated",
        updateUser,
       });


    }).catch((error)=>{
        console.log("update user error, not match");
        res.status(400).json({
            message:"update error",
            error:error
        });
    })
};