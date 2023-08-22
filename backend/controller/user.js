import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import cookie from "cookie";

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
      if (user) {
        const userValid = bcrypt.compareSync(password, user.password);
        if (userValid) {
          const key = process.env.SECRECT_KEY;
          const token = jwt.sign({ userId: user._id }, key, {
            expiresIn: "1h",
          });
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000,
          });
          res.status(200).json({ message: "Login successful", user, token });
        } else {
          res.status(401).json({ message: "Invalid password" });
        }
      } else {
        res.status(401).json({ message: "User not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid input" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function checkAuth(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ auth: false });
    }

    const key = process.env.SECRECT_KEY;

    try {
      const decodeToken = jwt.verify(token, key);

      return res.status(200).json({ auth: true });
    } catch (error) {
      res.status(401).json({ auth: false });
    }
  } catch (error) {
    res.status(401).json({ auth: false });
  }
}

export async function logout(req, res) {
  try {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
  }
}

export async function updateImage(req, res) {
  try {
    const { url, userId } = req.body;
    if (url && userId) {
      const user = await userModel.findByIdAndUpdate(userId, {
        $set: { image: url },
      });
      if (user) {
        res.send(user);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProfile(req, res) {
  try {
    const { name, phoneNumber, email, oldPassword, newPassword, userId } =
      req.body;
    const user = await userModel.findById(userId);
    const userValid = bcrypt.compareSync(oldPassword, user.password);
    if (userValid) {
      const user = await userModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            name,
            phone: phoneNumber,
            password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10)),
            email,
          },
        },
        { new: true }
      );
      res.send(user);
    }
  } catch (error) {
    console.log(error);
  }
}
