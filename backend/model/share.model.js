const mongoose = require("mongoose");

const fileShareSchema = new mongoose.Schema({
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
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  sharedUserId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  receivedUserId: {
    type: mongoose.Schema.ObjectId,
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
  isAccpected: {
    type: Boolean,
    default: false,
  },
});

const FileShare = mongoose.model("FileShare", fileShareSchema);

module.exports = FileShare;
