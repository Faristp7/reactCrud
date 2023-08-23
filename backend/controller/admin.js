import bcrypt from "bcryptjs";
import adminModel from "../model/adminModel.js";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";

export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await adminModel.findOne({ email });
    if (user) {
      const valid = bcrypt.compareSync(password, user.password);
      if (valid) {
        const key = process.env.SECRECT_KEY;
        const token = jwt.sign({ userId: user._id }, key, {
          expiresIn: "1h",
        });
        res.cookie("adminToken", token, {
          httpOnly: true,
          maxAge: 3600000,
        });
        res.status(200).json({ message: "success" ,user ,token});
      } else {
        res.json({ message: "password incorrect" });
      }
    } else {
      res.json({ message: "admin not found" });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(req, res) {
  try {
    const user = await userModel.find().sort({ createdAt: -1 });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await userModel.deleteOne({ _id: req.params.id });
    if (user) {
      res.send(true);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function checkAdminAuth(req,res) {
  try {
    const token = req.cookies.adminToken
    const key = process.env.SECRECT_KEY;
    if (!token) {
      res.json(401).json({message : "token not found"})
    }else{
      const verified = jwt.verify(token , key)
      res.json({message : true})
    }
  } catch (error) {
    console.log(error);
  }
}