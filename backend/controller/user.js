import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import userModel from "../model/userModel.js";

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
