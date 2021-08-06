const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true,
        unique: true
    },
    price: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minLength: 50
    },
    quantity: {
        type: Number,
        default:0
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        }
    ]
}, {
    timestamps: true
});


exports.Medicine = mongoose.model('Medicine', medicineSchema);