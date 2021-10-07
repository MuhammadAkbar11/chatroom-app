import express from "express";

const router = express.Router();

import * as authController from "../controllers/authController.js";
import loginSchema from "../schema/login.schema.js";

router.post("/signup", authController.signup);
router.post("/login", [loginSchema], authController.login);
router.get("/logout", authController.logout);

export default router;
