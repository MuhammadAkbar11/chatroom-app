import mongoose from "mongoose";

const connectDB = async () => {

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`\nMongoDB Connected : ${conn.connection.host}\n`);
  } catch (error) {
    console.log(`\nError : ${error.message}\n`);
    process.exit(1);
  }
};

export default connectDB;
