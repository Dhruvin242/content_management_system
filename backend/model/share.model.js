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
  sharedUserEmail: {
    type: String,
    required: true,
  },
  sharedUserName: {
    type: String,
    required: true,
  },
  receivedUserEmail: {
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
  fileStatus: {
    type: String,
    enum: ["Approve", "Denine", "NotFixed"],
    default: "NotFixed",
  },
});

const FileShare = mongoose.model("FileShare", fileShareSchema);

module.exports = FileShare;
