import asyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log('Request Email:', email);
    console.log('Request Password:', password);

    const admin = await Admin.findOne({ email });
    console.log('Admin from DB:', admin);

    if (admin && (await admin.matchPassword(password))) {
        generateToken(res,admin._id)
        res.status(201).json({
            _id:admin._id,
            name:admin.name,
            email:admin.email,
            password:admin.password
        })
    }else{
        res.status(400)
        throw new Error('Invalid email or pasword')
    }
});

// Logout

const logoutAdmin = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:"Admin Logout "})
});


// admin home
const adminHome = asyncHandler(async (req, res) => {
    try {
        const usersData = await User.find({});
        res.status(200).json(usersData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data' });
    }
});


// delete user
const deleteUser= asyncHandler(async(req,res)=>{
    try {
        const userId=req.body._id
        const userData= await User.deleteOne({_id:userId})
        res.status(500).json(userData)
    } catch (error) {
        res.status(401).json({message:'Can;t delete'})
    }
})

// const deleteUser = asyncHandler(async (req, res) => {
//     try {
//         const userId = req.body._id;
        
//         // Check if the userId is provided
//         if (!userId) {
//             return res.status(400).json({ message: 'User ID is required' });
//         }

//         // Delete the user with the given ID
//         const deletedUser = await User.findOneAndDelete({ _id: userId });

//         if (deletedUser) {
//             res.status(200).json({ message: 'User deleted successfully' });
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting user' });
//     }
// });

export {
    authAdmin,
    logoutAdmin,
    adminHome,
    deleteUser
}
