import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";

var salt = bcrypt.genSaltSync(10);

export async function userRegister(req, res) {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password, name, phoneNumber } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await userModel.findOne({ email });
    if (user) {
      res.send("already exist");
    } else {
      const newUser = new userModel({
        email,
        password: hashedPassword,
        name,
        phone: phoneNumber,
      });
      newUser.save();
      res.send(true);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await userModel.findOne({ email });
      const userValid = bcrypt.compareSync(password, user[0].password);
      if(user && userValid){
        const key = process.env.SECRECT_KEY
        const token = jwt.sign({userId : user[0]._id}, key ,{
          expiresIn : '1h',
        })
        res.cookie('token',token , {
          httpOnly : true ,
          maxAge : 3600000,
        })
      }
    }
  } catch (error) {
    console.log(error);
  }
}
