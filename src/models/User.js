const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    profilePicture: {
        type: String,
        default: 'https://res.cloudinary.com/dkam34jg6/image/upload/v1733855647/japanese_vocabulary/user_profiles/default_profile_picture_tkorgq.png'
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin'],
    },
}, { 
    timestamps: true,
    strict: true, 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
});

// Hash password before saving or updating
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords for login
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// User model
const User = model('User', userSchema);

module.exports = User;
