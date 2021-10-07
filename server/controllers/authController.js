import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import UserModel from "../models/UserModel.js";
import ErrorResponse from "../utils/errorResponse.js";
import errorValidation from "../utils/errorValidation.js";
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

export const login = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const errors = validationResult(req);

  const validationMsg = errorValidation(errors.array());

  if (!errors.isEmpty()) {
    throw new ErrorResponse(
      403,
      "ValidationError",
      "validation Error",
      validationMsg
    );
  }

  try {
    const user = await UserModel.findOne({ email });

    res.status(201).json({
      status: true,
      message: "login success",
      user: {
        isAdmin: user.isAdmin,
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateJwtToken(user._id),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    throw new ErrorResponse(
      error.statusCode,
      error.name,
      error.message,
      error.errors
    );
  }
});

export const logout = (req, res) => {
  res.status(201).json({
    status: true,
    message: "logout success",
  });
};
