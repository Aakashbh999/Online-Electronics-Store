import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL || " ");
    console.log(` Mongodb connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error has occur ${(error as Error).message}`);
    process.exit(1);
  }
};
