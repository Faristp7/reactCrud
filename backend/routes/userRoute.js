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
import {
  adminLogin,

  adminLogout,

  checkAdminAuth,
  deleteUser,
  getUser,
} from "../controller/admin.js";

const router = express.Router();

router.get("/");
router.get("/checkAuth", checkAuth);
router.get("/getUser", getUser);
router.get("/checkAdminAuth", checkAdminAuth);
router.get('/adminLogout' ,adminLogout)      

router.post("/register", validate, userRegister);
router.post("/login", login);
router.post("/logout", logout);
router.post("/updateImage", updateImage);
router.post("/update-profile", updateProfile);
router.post("/admin-login", adminLogin);

router.delete("/deleteUser/:id", deleteUser);

export default router;
