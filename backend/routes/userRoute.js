import express from "express";
import { userRegister } from "../controller/user.js";

const router = express.Router();

router.get("/");
router.post("/register", userRegister);

export default router;
