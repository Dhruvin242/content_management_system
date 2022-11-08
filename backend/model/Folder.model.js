const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
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
  parent: {
    type: String,
  },
  lastAccessed: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
