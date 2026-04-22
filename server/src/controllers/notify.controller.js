import NotifyEmail from "../models/NotifyEmail.model.js";

// ------------------ Add / Notify ------------------
export const notifyMe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const alreadyExists = await NotifyEmail.findOne({ email });
    if (alreadyExists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const savedEmail = await NotifyEmail.create({ email, notifyStatus: "pending" });

    res.status(201).json({
      success: true,
      message: "You will be notified soon",
      data: savedEmail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ Get All Emails ------------------
export const getAllEmails = async (req, res) => {
  try {
    const emails = await NotifyEmail.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: emails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ Delete Single Email ------------------
export const deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await NotifyEmail.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.status(200).json({ success: true, message: "Email deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ Delete Selected Emails ------------------
export const deleteSelectedEmails = async (req, res) => {
  try {
    const { ids } = req.body; // array of email IDs
    if (!ids || !ids.length) {
      return res.status(400).json({ success: false, message: "No emails selected" });
    }

    await NotifyEmail.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ success: true, message: `${ids.length} email(s) deleted` });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
