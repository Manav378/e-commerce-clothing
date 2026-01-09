import mongoose from "mongoose";

const conndb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/ecommerce`);
    console.log("The MONGODB is connected succeessfully");
  } catch (error) {
    console.log("There is any error in the MONGODB connection", error.message);

    process.exit(1);
  }
};

export default conndb;
