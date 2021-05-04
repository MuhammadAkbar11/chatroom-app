import asyncHandler from "express-async-handler";
import UserModel from "../models/UserModel.js";
import ErrorResponse from "../utils/errorResponse.js";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserModel.create({ name, email, password });
    res.status(201).json({
      status: true,
      message: "signup success",
      user,
    });
  } catch (error) {
    throw new ErrorResponse(
      error.statusCode,
      error.name,
      error.message,
      error.errors
    );
  }
});

export const login = (req, res) => {
  res.status(201).json({
    status: true,
    message: "login success",
  });
};

export const logout = (req, res) => {
  res.status(201).json({
    status: true,
    message: "logout success",
  });
};
