const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    firstname: {
        type: String,
        required: true,
        minLength: 3
    },
    lastname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 1024
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: 'user'
    }
}, {
    timestamps: true
});


exports.User = mongoose.model('User', userSchema);