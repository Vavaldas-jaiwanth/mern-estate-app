import User from "../models/user.js";
import bcrypt from 'bcryptjs';
export const signup = async (req,res)=>{
    const {username, email, password}=req.body;
    const hashpass=bcrypt.hashSync(password,10);
    const newUser =new User({username,email,password:hashpass});

try{
    await newUser.save();
    res.status(201).json("user created successfully")
}
catch(err){
    
    res.status(500).json(err.message)
}
    
}