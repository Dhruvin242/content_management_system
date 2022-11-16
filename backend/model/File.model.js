const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  url: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  lastAccessed: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isHide: {
    type: Boolean,
    default: false,
  },
});

const Folder = mongoose.model("File", fileSchema);

module.exports = Folder;
