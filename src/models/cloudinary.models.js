import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (loaclfile) => {
  try {
    if (!loaclfile) return null;                                        //if file not uploaded
    const result = await cloudinary.uploader.upload(loaclfile, {                  //file uploaded in loacal storage and to cloudinary
      resource_type: "auto",
    });
    console.log("file is uploaded to cloudinary", result.url);
    return result;
  } catch (error) {
    fs.unlinkSync(loaclfile);        //if file uploaded then it is delted or remove from the server 
    return null;
  }
};

export { uploadCloudinary };
