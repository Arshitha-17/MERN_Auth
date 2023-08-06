import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';

const authUser= asyncHandler(async(req,res)=>{

    res.status(200).json({message:'Auth user'})
});

// register a new user 
// route:  POST/api/users

const registerUser= asyncHandler(async(req,res)=>{

    const {name,email,password}= req.body
    const userExists= await  User.findOne({email})
    if(userExists){
        res.status(404)
        throw new Error('User already exist')
    }
    const  user= await User.create({
        name,
        email,
        password
    });
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email: user.email,
            password:user.password
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
});

// logout user
// route: 
const logoutUser= asyncHandler(async(req,res)=>{

    res.status(200).json({message:'Logout user'})
});
// get user profile
// routes: get/api/users/profile

const getUserProfile= asyncHandler(async(req,res)=>{

    res.status(200).json({message:'User profile'})
});

// update user profile
// routes: put/api/users/profile

const updateUserProfile= asyncHandler(async(req,res)=>{

    res.status(200).json({message:'update profile'})
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}