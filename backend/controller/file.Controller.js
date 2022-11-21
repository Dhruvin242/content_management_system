const Folder = require("../model/Folder.model");
const File = require("../model/File.model");
const multer = require("multer");
const { cloudinary } = require("../utils/cloudinary");

const storage = multer.diskStorage({});

exports.upload = multer({
  storage,
});

exports.fileUpload = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "File required" });

    const checkfile = await Folder.findOne({
      $and: [
        { name: req.file.originalname },
        { createdBy: req.user.name },
        { path: req.body.path },
        { isDeleted: false },
      ],
    });

    if (checkfile) {
      return res.status(400).json({ error: "File is already exits" });
    }

    const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
      folder: "Files",
      resource_type: "auto",
    });

    const { originalname, mimetype } = req.file;
    const { secure_url } = uploadedFile;

    const newFile = await File.create({
      name: originalname,
      type: mimetype,
      userId: req.user.id,
      createdBy: req.user.name,
      url: secure_url,
      path: req.body.path,
      tags: req.body.tags,
    });

    return res.status(200).json({
      newFile,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can not upload file" });
  }
};

exports.GetFiles = async (req, res, next) => {
  try {
    const files = await File.find({
      $and: [{ userId: req.user.id }, { isDeleted: false }, { isHide: false }],
    });

    return res.status(200).json({
      data: {
        files,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Can not get Files" });
  }
};

exports.HideFileFolder = async (req, res, next) => {
  try {
    const folder = req.body.folder;
    if (!folder)
      return res.status(400).json({ message: "Please provide folder or file" });
    const folderCheck = await Folder.findById(folder);
    const fileCheck = await File.findById(folder);
    if (folderCheck) {
      folderCheck.isHide = true;
      folderCheck.save();

      return res.status(200).json({
        message: "Folder Hide Successfully.!",
      });
    }

    if (fileCheck) {
      fileCheck.isHide = true;
      fileCheck.save();

      return res.status(200).json({
        message: "File Hide Successfully.!",
      });
    }
    return res.status(200).json({
      message: "Folder or File Not found !",
    });
  } catch (error) {
    return res.status(500).json({ message: "Can not hide Folder or File" });
  }
};
//RegExp(req.query[el])
exports.search = async (req, res, next) => {
  try {
    const { searchWord } = req.params;
    const folders = await Folder.find({
      $and: [{ userId: req.user.id }, { name: new RegExp(searchWord, "i") }],
    });
    const files = await File.find({
      $and: [
        { userId: req.user.id },
        {
          $or: [
            { name: new RegExp(searchWord, "i") },
            { tags: new RegExp(searchWord, "i") },
          ],
        },
      ],
    });

    // folder filter
    const filterData = folders.filter((folder) => {
      return !folder.isDeleted && !folder.isHide;
    });

    // file filter
    const filterFiles = files.filter((file) => {
      return !file.isDeleted && !file.isHide;
    });

    if (folders.length === 0 && files.length === 0)
      return res.status(200).json({
        message: "No data found",
        folders: filterData,
        files: filterFiles,
      });

    return res.status(200).json({
      folders: filterData,
      files: filterFiles,
    });
  } catch (error) {
    return res.status(500).json({ message: "No Data Found.." });
  }
};
