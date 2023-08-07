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
            password:user.password
        })
    }else{
        res.status(400)
        throw new Error('Invalid email or password')
    }
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
        generateToken(res,user._id)
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

    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200).json({message:'User Logout user'})
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