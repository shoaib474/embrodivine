import Contact from "../models/Contact.model.js";
import { sendContactEmail } from "../utils/sendEmail.js";

// CREATE CONTACT MESSAGE
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const newContact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Send admin + user email
    await sendContactEmail(newContact);

    return res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully",
      contact: newContact,
    });
  } catch (error) {
    console.error("Contact Form Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET ALL CONTACTS (Admin)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error("Get Contacts Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET SINGLE CONTACT
export const getSingleContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    contact.isRead = true;
    await contact.save();

    return res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    console.error("Get Single Contact Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// UPDATE STATUS
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    contact.status = status;

    if (status === "resolved") {
      contact.repliedAt = new Date();
    }

    await contact.save();

    return res.status(200).json({
      success: true,
      message: "Contact status updated",
      contact,
    });
  } catch (error) {
    console.error("Update Contact Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// DELETE CONTACT
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Delete Contact Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
