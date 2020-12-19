const { trim } = require('lodash');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: trim,
            required: true,
            unique: true,
            maxlength: 32
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Category", categorySchema)