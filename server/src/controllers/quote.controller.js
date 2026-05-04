import cloudinary from "../config/cloudinary.js";
import Quote from "../models/Quote.model.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { redisClient } from "../config/redis.js";

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

    const normalizedPhone = phone.replace(/\s+/g, "");

    let attachments = [];

    if (req.files && req.files.length > 0) {
      const uploadResults = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.path)),
      );

      attachments = uploadResults.map((file) => ({
        url: file.secure_url,
        public_id: file.public_id,
      }));
    }

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

    // 🔥 CLEAR CACHE (important)
    await redisClient.del("quotes_all");

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
    const cacheKey = "quotes_all";

    // 🔥 CHECK REDIS
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return res.status(200).json({
        success: true,
        source: "redis",
        data: JSON.parse(cached),
      });
    }

    const quotes = await Quote.find().sort({ submittedAt: -1 });

    // 🔥 STORE CACHE
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(quotes));

    res.status(200).json({
      success: true,
      source: "db",
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
    const id = req.params.id;
    const cacheKey = `quote_${id}`;

    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return res.status(200).json({
        success: true,
        source: "redis",
        data: JSON.parse(cached),
      });
    }

    const quote = await Quote.findById(id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(quote));

    res.status(200).json({
      success: true,
      source: "db",
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

    const quote = await Quote.findById(id);
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    if (req.files && req.files.length > 0) {
      if (quote.attachments?.length > 0) {
        for (const file of quote.attachments) {
          if (file.public_id) {
            await cloudinary.uploader.destroy(file.public_id);
          }
        }
      }

      const uploadResults = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.path)),
      );

      quote.attachments = uploadResults.map((file) => ({
        url: file.secure_url,
        public_id: file.public_id,
      }));
    }

    Object.assign(quote, req.body);
    await quote.save({ runValidators: true });

    // 🔥 CACHE UPDATE
    await redisClient.del("quotes_all");
    await redisClient.setEx(`quote_${id}`, 3600, JSON.stringify(quote));

    res.status(200).json({
      success: true,
      message: "Quote updated successfully",
      data: quote,
    });
  } catch (error) {
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
    const id = req.params.id;

    const allowedStatus = ["pending", "quoted", "completed", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const quote = await Quote.findByIdAndUpdate(id, { status }, { new: true });

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    // 🔥 CACHE REFRESH
    await redisClient.del("quotes_all");
    await redisClient.setEx(`quote_${id}`, 3600, JSON.stringify(quote));

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

    if (quote.attachments?.length > 0) {
      for (const file of quote.attachments) {
        if (file.public_id) {
          await cloudinary.uploader.destroy(file.public_id);
        }
      }
    }

    await quote.deleteOne();

    // 🔥 CACHE CLEAR
    await redisClient.del("quotes_all");
    await redisClient.del(`quote_${req.params.id}`);

    res.status(200).json({
      success: true,
      message: "Quote deleted successfully",
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
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        success: false,
        message: "No quote IDs provided",
      });
    }

    const quotes = await Quote.find({ _id: { $in: ids } });

    for (const quote of quotes) {
      if (quote.attachments?.length > 0) {
        for (const file of quote.attachments) {
          if (file.public_id) {
            await cloudinary.uploader.destroy(file.public_id);
          }
        }
      }
    }

    await Quote.deleteMany({ _id: { $in: ids } });

    // 🔥 CACHE RESET
    await redisClient.del("quotes_all");

    for (const id of ids) {
      await redisClient.del(`quote_${id}`);
    }

    res.status(200).json({
      success: true,
      message: "Selected quotes deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
