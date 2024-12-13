const createError = require("http-errors");
const { getUserByEmail, createNewUser, getUsersService, getUserById } = require("../services/user.service");
const { generateToken } = require("../utils/generateToken");
const { successResponse } = require("../utils/response");
const cloudinary = require("../utils/cloudinary");

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const profilePicture = req.file;

        const emailValidationPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validate name
        if (!name)
            throw createError(400, "Name is required!");

        if (name.length < 3)
            throw createError(400, "Name is too short!");

        if (name.length > 30)
            throw createError(400, "Name is too big!");

        // Validate email
        if (!email)
            throw createError(400, "Email is required!");

        if (!emailValidationPattern.test(email))
            throw createError(400, "Invalid email address!");

        // Validate profile picture
        if (!profilePicture)
            throw createError(400, "Profile picture is required!");

        // Upload profile picture to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(profilePicture.path, {
            folder: "japanese_vocabulary/user_profiles",
            transformation: { width: 300, height: 300, crop: "fill" },
        });

        // Validate password
        if (!password)
            throw createError(400, "Password is required!");

        if (password.length < 6)
            throw createError(400, "Password should be at least 6 characters long!");

        if (password.length > 40)
            throw createError(400, "Password is too long!");

        // Check if user already exists
        const isUserExist = await getUserByEmail(email);

        if (isUserExist)
            throw createError(400, "User already exists!");

        // Create new user
        const user = await createNewUser({ name, email, password, profilePicture: uploadResult.secure_url });

        // Remove sensitive information from response
        const { password: pass, ...userInfoWithoutPassword } = user.toObject();

        // Generate JWT token
        const token = generateToken({ email: user.email, id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, "365d");

        // Send success response
        successResponse(res, {
            status: 200,
            message: "User registration successful!",
            payload: { user: userInfoWithoutPassword, token },
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const emailValidationPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validate email and password presence
        if (!email || !emailValidationPattern.test(email)) {
            throw createError(400, "Invalid credentials.");
        }
        if (!password) {
            throw createError(400, "Invalid credentials.");
        }

        // Find user by email
        const user = await getUserByEmail(email);
        if (!user) {
            throw createError(400, "Invalid credentials.");
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw createError(400, "Invalid credentials.");
        }

        // Remove sensitive information from the user object
        const { password: pass, ...userInfoWithoutPassword } = user.toObject();

        // Generate JWT token
        const token = generateToken(
            { email: user.email, id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            "365d"
        );

        // Send success response
        successResponse(res, {
            status: 200,
            message: "User login successful!",
            payload: { user: userInfoWithoutPassword, token },
        });
    } catch (err) {
        // Pass errors to the error handling middleware
        next(err);
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await getUsersService();

        // Send successful response
        successResponse(res, {
            status: 200,
            message: "Users fetched successfully!",
            payload: { users },
        });
    } catch (err) {
        next(err);
    }
};

exports.updateUserRole = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        if (!userId)
            throw createError(400, "User ID is required!");

        if (!role)
            throw createError(400, "Role is required!");

        const user = await getUserById(userId);

        if (!user)
            throw createError(400, "User not found!");

        // Update the user's role
        user.role = role;
        await user.save();

        // Send successful response
        successResponse(res, {
            status: 200,
            message: "User role updated successfully!",
            payload: { user },
        });
    } catch (err) {
        next(err);
    }
};