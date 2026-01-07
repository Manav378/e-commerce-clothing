import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ContactModels = mongoose.model("Contact", contactSchema);

export default ContactModels;
