import mongoose from "mongoose";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "masukan nama anda"],
    },
    email: {
      type: String,
      required: [true, "masukan email anda"],
      lowercase: true,
      validate: [isEmail, "email tidak valid"],
    },
    password: {
      type: String,
      required: [true, "masukan password anda"],
      minLength: [6, "password minimal 5 karakter"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1, name: 1 }, { unique: true });

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.post("save", function (error, doc, next) {
  let isError = false;
  const errorObj = new Error();
  if (
    error.keyValue?.email &&
    error.keyValue.email != null &&
    error.name === "MongoError" &&
    error.code === 11000
  ) {
    errorObj.name = "ValidationError";
    errorObj.message = "Validation Error";
    errorObj.errors = {
      ...errorObj.errors,
      email: {
        name: "ValidatorError",
        message: "email sudah tersedia",
        properties: { message: "email sudah tersedia", path: "email" },
      },
    };
    isError = true;
  }

  if (
    error.keyValue?.name &&
    error.keyValue.name != null &&
    error.name === "MongoError" &&
    error.code === 11000
  ) {
    console.log("name");
    errorObj.name = "ValidationError";
    errorObj.message = "Validation Error";
    errorObj.errors = {
      ...errorObj.errors,
      name: {
        name: "ValidatorError",
        message: "nama sudah tersedia",
        properties: { message: "Nama sudah tersedia", path: "name" },
      },
    };
    isError = true;
  }

  next(isError && errorObj);
});

// userSchema.pre("create", async function (next) {
//   const emailExist = await this.model.findOne({ email: this.email });

//   // console.log(e);

//   console.log(this);

//   if (!emailExist) {
//     return next();
//   }

//   throw new ErrorResponse(400, "Email already exist");
// });

const UserModel = mongoose.model("UserModel", userSchema, "user");

export default UserModel;
