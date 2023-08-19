import express from "express";
import { userRegister } from "../controller/user.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

router.get("/");
router.post("/register", validate, userRegister);

export default router;
