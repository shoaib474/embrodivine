import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  size: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },

  public_id: {
    type: String,
    default: null,
  },
});

const ArtworkSchema = new mongoose.Schema(
  {
    designName: {
      type: String,
      required: true,
    },

    designType: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "reviewing",
        "quoted",
        "approved",
        "completed",
        "rejected",
      ],
      default: "pending",
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    files: [FileSchema],

    details: {
      width: String,
      height: String,
      colors: String,
      fabric: String,
      notes: String,
    },

    contact: {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: String,

      company: String,
    },

    adminNote: {
      type: String,
      default: "",
    },

    quote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Artwork = mongoose.model("Artwork", ArtworkSchema);
export default Artwork;
