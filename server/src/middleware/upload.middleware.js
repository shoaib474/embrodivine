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

const upload = multer({ storage });

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
