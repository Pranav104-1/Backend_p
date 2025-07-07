import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadCloudinary } from "../models/cloudinary.models.js";

const registeruser = AsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // 1. Validation
  if ([username, email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  // 2. Check if user already exists by email OR username
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  // 3. Handle file uploads
  const avatarFilePath = req.files?.avatar?.[0]?.path;
  const coverImageFilePath = req.files?.coverImage?.[0]?.path;

  if (!avatarFilePath) {
    throw new ApiError(400, "Avatar is required");
  }

  // 4. Upload to Cloudinary
  const avatar = await uploadCloudinary(avatarFilePath);
  const coverImage = coverImageFilePath
    ? await uploadCloudinary(coverImageFilePath)
    : null;

  if (!avatar?.url) {
    throw new ApiError(500, "Avatar upload failed");
  }

  // 5. Create user
  const newUser = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  // 6. Fetch created user without sensitive fields
  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }

  // 7. Send response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export { registeruser };