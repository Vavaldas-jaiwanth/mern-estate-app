import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
export const signup = async (req,res,next)=>{
    const {username, email, password}=req.body;
    const hashpass=bcrypt.hashSync(password,10);
    const newUser =new User({username,email,password:hashpass});

try{
    await newUser.save();
    res.status(201).json("user created successfully")
}
catch(err){
    
    //next(errorHandler(500,"error from function")) custom error
    next(err)
}
    
}