const Folder = require("../model/File.model");
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

    console.log(uploadedFile)

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
