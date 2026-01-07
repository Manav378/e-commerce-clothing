import ContactModels from "../models/contactus.models.js";

export const sendContact = async (req, res) => {
  try {
    const { Name, email, message } = req.body;

    if (!Name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contact = await ContactModels.create({
      Name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
