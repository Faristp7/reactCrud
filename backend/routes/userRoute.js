import express from "express";
import { login, userRegister } from "../controller/user.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

router.get("/");

router.post("/register", validate, userRegister);
router.post("/login", login);

export default router;
