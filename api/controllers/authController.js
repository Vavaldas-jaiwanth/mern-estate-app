import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
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
    
};

export const signin= async(req,res,next)=>{
    const {email,password}=req.body;
    try {
        const validUser=await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,'user not found'));
        }
        console.log("pass:",password);
        console.log("validpass:",validUser.password);
        const validPassword=bcrypt.compareSync(password,validUser.password);
        if(!validPassword)
        {
            return next(errorHandler(401,"Wrong credentials!"));
        }
        const token =jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const {password:pass,...rest}=validUser._doc;

        res.cookie('access_token',token,{httOnly:true}).status(200).json(rest)
        
    } catch (error) {
        next(error);
    }
}