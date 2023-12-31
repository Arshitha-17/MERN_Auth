import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const authUser= asyncHandler(async(req,res)=>{
    const {email,password}= req.body;

    const user = await User.findOne({email});

        if(user && (await user.matchPassword(password))){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email: user.email,
            password:user.password,
            images: user.images
        })
    }else{
        res.status(400)
        throw new Error('Invalid email or password')
    }
});

// register a new user 
// route:  POST/api/users
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const images = req.file;  // Get 'images' from req.body
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(404);
      throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password,
        images: images ? images.filename : '', // Set to empty string if no image provided
      });
  
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        images: user.images ? user.images : null, // Set to null if no image provided
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });
  

// logout user
// route: 
const logoutUser= asyncHandler(async(req,res)=>{

    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200).json({message:'User Logout user'})
});
// get user profile
// routes: get/api/users/profile

const getUserProfile= asyncHandler(async(req,res)=>{
    console.log(req.user);
    const user={
         _id:req.user._id,
         name:req.user.name,
         email: req.user.email
    }
    res.status(200).json(user)
});

// update user profile
// routes: put/api/users/profile

const updateUserProfile= asyncHandler(async(req,res)=>{

    const user = await User.findById(req.user._id); 
    if(user){
        user.name= req.body.name || user.name;
        user.email= req.body.email || user.email;

        if(req.file){
            user.images = req.file.filename || user.images;
           }

        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser= await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            images: updatedUser.images 
        });
    }else{
        res.status(404)
        throw new Error('User Not Found')
    }
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}