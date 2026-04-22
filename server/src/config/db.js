import mongoose from "mongoose";

const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "embrodivine",
    });
    console.log("Database connected sucessfully...");
  } catch (error) {
    console.error("Database not connected.", error.message);
    process.exit(1);
  }
};

export default Connection;
