import { checkSchema } from "express-validator";
import UserModel from "../models/UserModel.js";

const loginSchema = checkSchema({
  email: {
    notEmpty: {
      errorMessage: "Masukan Email anda",
    },
    isEmail: {
      errorMessage: "Email tidak valid",
    },
    custom: {
      options: value => {
        return UserModel.findOne({ email: value }).then(user => {
          if (!user) {
            return Promise.reject("E-mail belum terdaftar");
          }
        });
      },
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Masukan password anda",
    },

    custom: {
      options: async (value, { req }) => {
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) {
          const doMatch = await user.matchPassword(value);
          if (doMatch === false) {
            return Promise.reject("password salah");
          }
        }
      },
    },
  },
});

export default loginSchema;
