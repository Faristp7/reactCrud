import bcrypt from 'bcryptjs'
import adminModel from '../model/adminModel.js'
import userModel from '../model/userModel.js'
import jwt from "jsonwebtoken";

var salt = bcrypt.genSaltSync(10);

export async function adminLogin(req,res){
    try {
        const {email ,password} = req.body;
    } catch (error) {
        console.log(error);
    }
}

export async function getUser (req,res){
    try {
        const user = await userModel.find()
        res.send(user)
    } catch (error) {
        console.log(error);
    }
}
