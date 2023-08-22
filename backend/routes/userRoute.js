import express from "express";
import {
  checkAuth,
  login,
  logout,
  updateImage,
  updateProfile,
  userRegister,
} from "../controller/user.js";
import { validate } from "../middleware/validator.js";


const router = express.Router();

router.get("/");
router.get("/checkAuth", checkAuth);

router.post("/register", validate, userRegister);
router.post("/login", login);
router.post("/logout", logout);
router.post("/updateImage", updateImage);
router.post("/update-profile", updateProfile);

export default router;
