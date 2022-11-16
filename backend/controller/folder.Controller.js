const Folder = require("../model/Folder.model");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createFolder = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.path) {
      return res.status(404).json({ message: "Please provide fields" });
    }

    const checkfolder = await Folder.findOne({
      $and: [
        { name: req.body.name },
        { createdBy: req.user.name },
        { path: req.body.path },
        { isDeleted: false },
      ],
    });

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
    const folders = await Folder.find({
      $and: [{ userId: req.user.id }, { isDeleted: false }, { isHide: false }],
    });

    return res.status(200).json({
      data: folders,
    });
  } catch (error) {
    return res.status(500).json({ message: "Can not get Folders" });
  }
};

exports.deleteFolder = async (req, res, next) => {
  try {
    const folder = req.body.folder;
    if (!folder)
      return res.status(400).json({ message: "Please provide folder" });
    const folderCheck = await Folder.findById(folder);
    if (!folderCheck) {
      return res.status(404).json({ message: "Folder not found!" });
    }

    folderCheck.isDeleted = true;
    folderCheck.save();

    return res.status(200).json({
      message: "Folder Deleted Successfully.!",
    });
  } catch (error) {
    return res.status(500).json({ message: "Can not delete Folder" });
  }
};

exports.renameFolder = async (req, res, next) => {
  try {
    const filterBody = filterObj(req.body, "name");

    const folder = await Folder.findOne({ name: req.body.name });
    if (folder) {
      return res.status(200).json({ error: "Folder is exists" });
    }
    const rename = await Folder.findByIdAndUpdate(
      req.body.folderID,
      filterBody,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Renamed Successfully",
      data: {
        rename,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Can not Rename Folder" });
  }
};
