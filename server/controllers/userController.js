const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const regiserUser =async (req,res)=>{
    try{

     const {name,email,password} = req.body

     if(!name || !email || !password){
        return res.status(400).json({
             success: false,
             message: "Please fill all fields",
        })
     }

     const existingUser = await User.findOne({ email })

     if(existingUser){
         return res.status(400).json({
        success: false,
        message: "User already exists",
      });
     }

     const hashedPassword =await bcrypt.hash(password, 10)

     const user = await User.create({
        name,
        email,
        password : hashedPassword
     })

     res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });

    }
    catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

const loginUser = async(req,res)=>{
    try{
        const { email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "Please fill all Field"
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success : false,
                message :"Inavalifd email or password"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)

         if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({
        id: user._id,
        role : user.role
    },process.env.JWT_SECRET_KEY,
 {
        expiresIn: "7d",
      })

      const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userData,
    });
    }


    catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }

}

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if another user already uses this email
    const existingUser = await User.findOne({
      email,
      _id: { $ne: user._id },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Check if both fields are provided
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide both passwords",
      });
    }

    // Find logged-in user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    // Update password
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {regiserUser, loginUser, getUserProfile, updateUserProfile,changePassword}