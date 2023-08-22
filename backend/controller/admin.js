import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

var salt = bcrypt.genSaltSync(10);

export async function adminLogin(req,res){
    try {
        const {email ,password} = req.body;
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newAdmin = new adminLogin({
            email , password : hashedPassword
        })
        newAdmin.save()
    } catch (error) {
        console.log(error);
    }
}
