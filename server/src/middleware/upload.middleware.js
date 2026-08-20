import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/temp");
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname}`;
    cb(null, unique);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
    "application/zip",
    "application/x-zip-compressed",
    "application/illustrator",
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fieldSize: 100 * 1024 * 1024 },
});

export default upload;

// import multer from "multer";
// import multerS3 from "multer-s3";
// import s3 from "./s3.js";

// const upload = multer({
//   storage: multerS3({
//     s3,
//     bucket: "embroidery-files",
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: (req, file, cb) => {
//       let folder = "others";

//       if (file.mimetype.startsWith("image/")) {
//         folder = "products/images";
//       } else if (file.mimetype === "application/pdf") {
//         folder = "products/pdfs";
//       } else if (file.mimetype === "application/zip") {
//         folder = "products/zips";
//       }

//       cb(null, `${folder}/${Date.now()}-${file.originalname}`);
//     },
//   }),
// });

// export default upload;
