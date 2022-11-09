const Folder = require("../model/Folder.model");

exports.createFolder = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.path) {
      return res.status(404).json({ message: "Please provide fields" });
    }

    const checkfolder = await Folder.findOne({ name: req.body.name });
    if (checkfolder) {
      return res.status(400).json({ message: "Folder is already exits" });
    }

    const result = await Folder.create({
      name: req.body.name,
      userId: req.user.id,
      createdBy: req.user.name,
      path: req.body.path,
    });
    return res.status(200).json({
      result,
      message: "Folder created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can not create folder" });
  }
};

exports.getFolders = async (req, res, next) => {
  try {
    const folders = await Folder.find({ userId: req.user.id });
    console.log(folders);
    return res.status(200).json({
      data: folders,
    });
  } catch (error) {
    return res.status(500).json({ message: "Can not get Folders" });
  }
};
