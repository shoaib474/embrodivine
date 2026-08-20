import cloudinary from "../config/cloudinary.js";
import Artwork from "../models/Artwork.model.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// Upload Artwork
export const uploadArtwork = async (req, res) => {
  try {
    const {
      designName,
      designType,
      width,
      height,
      colors,
      fabric,
      notes,
      name,
      email,
      phone,
      company,
    } = req.body;

    let files = [];

    if (req.files && req.files.length > 0) {
      const uploadResults = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.path)),
      );

      files = uploadResults.map((file) => ({
        name: file.originalname,
        size: Number((file.size / (1024 * 1024)).toFixed(2)),
        type: file.mimetype,
        url: file.secure_url,
        public_id: file.public_id,
      }));
    }

    const artwork = await Artwork.create({
      designName,
      designType,

      files,

      details: {
        width,
        height,
        colors,
        fabric,
        notes,
      },

      contact: {
        name,
        email,
        phone,
        company,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Artwork uploaded successfully.",
      artwork,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Artworks
export const getAllArtworks = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      status,
      sort = "newest",
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const query = {};

    // Status Filter
    if (status) {
      query.status = status;
    }

    // Search
    if (search) {
      query.$or = [
        {
          designName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          "contact.name": {
            $regex: search,
            $options: "i",
          },
        },
        {
          "contact.email": {
            $regex: search,
            $options: "i",
          },
        },
        {
          designType: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const sortOption = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const total = await Artwork.countDocuments(query);

    const artworks = await Artwork.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      success: true,

      total,

      currentPage: page,

      totalPages: Math.ceil(total / limit),

      artworks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Single Artwork
export const getArtworkById = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found.",
      });
    }

    return res.status(200).json({
      success: true,
      artwork,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Artwork
export const updateArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found.",
      });
    }

    const {
      designName,
      designType,
      width,
      height,
      colors,
      fabric,
      notes,
      name,
      email,
      phone,
      company,
    } = req.body;

    // Basic Fields
    if (designName) artwork.designName = designName;
    if (designType) artwork.designType = designType;

    // Details
    artwork.details.width = width ?? artwork.details.width;
    artwork.details.height = height ?? artwork.details.height;
    artwork.details.colors = colors ?? artwork.details.colors;
    artwork.details.fabric = fabric ?? artwork.details.fabric;
    artwork.details.notes = notes ?? artwork.details.notes;

    // Contact
    artwork.contact.name = name ?? artwork.contact.name;
    artwork.contact.email = email ?? artwork.contact.email;
    artwork.contact.phone = phone ?? artwork.contact.phone;
    artwork.contact.company = company ?? artwork.contact.company;

    // New Uploaded Files
    if (req.files && req.files.length > 0) {
      if (artwork.files?.length > 0) {
        for (const file of artwork.files) {
          if (file.public_id) {
            await cloudinary.uploader.destroy(file.public_id);
          }
        }
      }

      const uploadResults = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.path)),
      );

      artwork.files = uploadResults.map((file) => ({
        url: file.secure_url,
        public_id: file.public_id,
      }));
    }

    await artwork.save();

    return res.status(200).json({
      success: true,
      message: "Artwork updated successfully.",
      artwork,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Artwork
export const deleteArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found.",
      });
    }

    // Delete Uploaded Files
    if (artwork.files?.length > 0) {
      for (const file of artwork.files) {
        if (file.public_id) {
          await cloudinary.uploader.destroy(file.public_id);
        }
      }
    }

    await artwork.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Artwork deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Artwork Status
export const updateArtworkStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "pending",
      "reviewing",
      "quoted",
      "approved",
      "completed",
      "rejected",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found.",
      });
    }

    artwork.status = status;

    await artwork.save();

    return res.status(200).json({
      success: true,
      message: "Artwork status updated.",
      artwork,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Admin Note
export const updateAdminNote = async (req, res) => {
  try {
    const { adminNote } = req.body;

    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found.",
      });
    }

    artwork.adminNote = adminNote;

    await artwork.save();

    return res.status(200).json({
      success: true,
      message: "Admin note updated successfully.",
      artwork,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Dashboard Statistics
export const getArtworkStats = async (req, res) => {
  try {
    const total = await Artwork.countDocuments();

    const pending = await Artwork.countDocuments({
      status: "pending",
    });

    const reviewing = await Artwork.countDocuments({
      status: "reviewing",
    });

    const quoted = await Artwork.countDocuments({
      status: "quoted",
    });

    const approved = await Artwork.countDocuments({
      status: "approved",
    });

    const completed = await Artwork.countDocuments({
      status: "completed",
    });

    const rejected = await Artwork.countDocuments({
      status: "rejected",
    });

    return res.status(200).json({
      success: true,
      stats: {
        total,
        pending,
        reviewing,
        quoted,
        approved,
        completed,
        rejected,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Recent Artworks
export const getRecentArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 }).limit(10);

    return res.status(200).json({
      success: true,
      artworks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
