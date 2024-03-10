// /* eslint-disable camelcase */
// require('dotenv').config();
// // Require the cloudinary library
// const cloudinary = require('cloudinary').v2;

// // Return "https" URLs by setting secure: true
// cloudinary.config({
//   // eslint-disable-next-line camelcase
//   cloud_name: process.env.YOUR_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.YOUR_CLOUDINARY_API_KEY,
//   api_secret: process.env.YOUR_CLOUDINARY_API_SECRET,
//   secure: true
// });

// /////////////////////////
// // Uploads an image file
// /////////////////////////
// const uploadImage = async (imagePath) => {

//   // Use the uploaded file's name as the asset's public ID and
//   // allow overwriting the asset with new versions
//   const options = {
//     use_filename: true,
//     unique_filename: false,
//     overwrite: true,
//   };

//   try {
//     // Upload the image
//     const result = await cloudinary.uploader.upload(imagePath, options);
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports.uploadImage = uploadImage;