import mongoose from "mongoose";
import validator from "validator";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
      validate: {
        validator: function (v) {
          return v > 0;
        },
        message: (props) => `${props.value} is not a valid price!`,
      },
    },

    category: {
      type: String,
      default: "General",
      maxlength: [50, "Category name too long"],
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    badge: {
      type: String,
    },

    productStatus: {
      type: String,
      default: "active",
    },

    dimensions: {
      type: String,
      trim: true,
      example: "3 x 4 inches",
    },

    weight: {
      type: String, // "0.05 lbs"
      trim: true,
    },

    material: {
      type: String,
      trim: true,
    },

    colors: {
      type: Number,
      min: [0, "Color value must be a positive integer"],
      max: [16777215, "Color value cannot exceed 16777215 (hex FFFFFF)"],
      default: 0, // Default to black if not provided
    },

    image: {
      url: {
        type: String,
        default:
          "https://t4.ftcdn.net/jpg/05/97/47/95/360_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg",
        validate: {
          validator: (v) => validator.isURL(v),
          message: (props) => `${props.value} is not a valid URL`,
        },
      },

      public_id: {
        type: String,
        default: null,
      },
    },

    pdf: {
      url: {
        type: String,
        // required: [true, "PDF URL is required"],
        validate: {
          validator: (v) => validator.isURL(v),
          message: (props) => `${props.value} is not a valid URL`,
        },
      },
      public_id: {
        type: String,
        default: null, // Cloudinary / S3 ID if needed
      },
    },

    // zip: {
    //   type: String,
    //   default: "",
    // },

    zipUrl: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          return v === "" || validator.isURL(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
