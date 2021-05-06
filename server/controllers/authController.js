import asyncHandler from "express-async-handler";
import UserModel from "../models/UserModel.js";
import ErrorResponse from "../utils/errorResponse.js";
import generateJwtToken from "../utils/generateJwtToken.js";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserModel.create({ name, email, password });

    const token = generateJwtToken(user._id);

    res.status(201).json({
      status: true,
      message: "signup success",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: token,
      },
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
