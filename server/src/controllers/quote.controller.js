import cloudinary from "../config/cloudinary.js";
import Quote from "../models/Quote.model.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const createQuote = async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      projectType,
      quantity,
      description,
      budget,
      size,
      timeline,
      colors,
    } = req.body;

    if (
      !customerName ||
      !email ||
      !phone ||
      !projectType ||
      !quantity ||
      !description ||
      !budget ||
      !size ||
      !timeline ||
      !colors
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Normalize phone
    const normalizedPhone = phone.replace(/\s+/g, "");

    // Handle attachments uploaded by Multer + Cloudinary
    let attachments = [];

    if (req.files && req.files.length > 0) {
      // Upload all files in parallel
      const uploadResults = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.path)),
      );

      // Map Cloudinary results to correct format
      attachments = uploadResults.map((file) => ({
        url: file.secure_url,
        public_id: file.public_id,
      }));
    }

    // Create new quote
    const quote = await Quote.create({
      customerName,
      email,
      phone: normalizedPhone,
      projectType,
      quantity,
      description,
      budget,
      size,
      timeline,
      colors,
      attachments,
    });

    res.status(201).json({
      success: true,
      message: "Quote submitted successfully",
      data: quote,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    res.status(200).json({
      success: true,
      data: quote,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateQuote = async (req, res) => {
  try {
    const { id } = req.params;

    // multer ke through req.body available hoga
    const {
      customerName,
      email,
      phone,
      projectType,
      quantity,
      description,
      budget,
      size,
      timeline,
      colors,
      status,
    } = req.body;

    // BASIC REQUIRED VALIDATION
    if (
      !customerName ||
      !email ||
      !phone ||
      !projectType ||
      !quantity ||
      !description ||
      !timeline
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const quote = await Quote.findById(id);
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    // ================== ATTACHMENTS UPDATE ==================
    if (req.files && req.files.length > 0) {
      // Delete old files from Cloudinary
      if (quote.attachments && quote.attachments.length > 0) {
        for (const file of quote.attachments) {
          if (file.public_id) {
            await cloudinary.uploader.destroy(file.public_id);
          }
        }
      }

      // Upload new files
      const uploadResults = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.path)),
      );

      quote.attachments = uploadResults.map((file) => ({
        url: file.secure_url,
        public_id: file.public_id,
      }));
    }

    // ================== UPDATE FIELDS ==================
    quote.customerName = customerName;
    quote.email = email;
    quote.phone = phone.replace(/\s+/g, "");
    quote.projectType = projectType;
    quote.quantity = Number(quantity);
    quote.description = description;
    quote.budget = budget;
    quote.size = size;
    quote.timeline = timeline;
    quote.colors = colors || quote.colors;
    quote.status = status || quote.status;

    await quote.save({ runValidators: true });

    res.status(200).json({
      success: true,
      message: "Quote updated successfully",
      data: quote,
    });
  } catch (error) {
    console.error("Update Quote Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const updateQuoteStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["pending", "quoted", "completed", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: quote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    // Delete attachments from Cloudinary
    if (quote.attachments && quote.attachments.length > 0) {
      for (const file of quote.attachments) {
        if (file.public_id) {
          await cloudinary.uploader.destroy(file.public_id);
        }
      }
    }

    // Delete the quote from DB
    await quote.deleteOne();

    res.status(200).json({
      success: true,
      message: "Quote and its attachments deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE MULTIPLE QUOTES
export const deleteSelectedQuotes = async (req, res) => {
  try {
    const { ids } = req.body; // array of quote IDs

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No quote IDs provided",
      });
    }

    // Find all quotes
    const quotes = await Quote.find({ _id: { $in: ids } });

    // Delete attachments from Cloudinary
    for (const quote of quotes) {
      if (quote.attachments?.length > 0) {
        for (const file of quote.attachments) {
          if (file.public_id) {
            await cloudinary.uploader.destroy(file.public_id);
          }
        }
      }
    }

    // Delete quotes from DB
    await Quote.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: "Selected quotes deleted successfully",
    });
  } catch (error) {
    console.error("Bulk Delete Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
