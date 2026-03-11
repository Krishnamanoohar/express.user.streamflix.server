import { AuthService } from "../services/auth.services";
import {Request,Response} from"express";

const authService = new AuthService();

export class AuthControllers{
    async register(req:any,res:Response){
        try{
            const {firstName,middleName,lastName,email,password, mobileNumber} = req.body;
            if(!firstName || !lastName || !email || !password || !mobileNumber){
                return res.status(400).json({
                    message: "ALL FIELDS ARE REQUIRED",
                })
            }
            const result = await authService.register(
                firstName,
                middleName,
                lastName,
                email,
                password,
                mobileNumber
            );
            return res.status(200).json({
                message:"ACCOUNT CREATED SUCCESSFULLY",
                status:true,
                data:result

            })
        }
        catch(error:any){
            return res.status(400).json({
                message:error.message,
            });
        }

    }
} 