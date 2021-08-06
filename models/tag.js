const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true,
    }
}, {
    timestamps: true
});


exports.Tag = mongoose.model('Tag', tagSchema);