import User from "../models/auth.model";
import mongoose from "mongoose";
import {env} from "../config/env";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService{
    async register(
        firstName:string,
        middleName:string,
        lastName:string,
        email:string,
        password:string,
        mobileNumber:number

    ){
        email = email.trim().toLowerCase();

        const existingUser = await User .findOne({ email });

        if (existingUser){
            throw new Error("Email is already exists ");
        }
         if (password.length < 6) {
            throw new Error("password must be 6 characters");
         }
         if(mobileNumber.toString().length === 10 && !isNaN(mobileNumber)) {
            throw new Error("please enter valid 10 digit number");

         }

         const hashpassword = await bcrypt.hash(password,20)

         const user = await User.create({
            firstName,
            middleName,
            lastName,
            email,
            password:hashpassword,
            mobileNumber,

         });
         const token = jwt.sign({firstName:user.firstName,middleName:user.middleName,lastName:user.lastName,role:user.role},env.JWT_SECRET,{
            expiresIn:"7d"
         });
         return {
            user:{
                id:user._id,
                firstName:user.firstName,
                middleName:user.middleName,
                lastName:user.lastName,
                email:user.email,
                role:user.role,
                mobileNumber:user.mobileNumber

            },
            token
         }
    }
}









