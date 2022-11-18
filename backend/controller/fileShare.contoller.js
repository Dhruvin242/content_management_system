const FileShare = require("../model/share.model");

exports.fileShared = async (req, res, next) => {
  try {
    const checkfile = await FileShare.findOne({
      $and: [
        { name: req.body.name },
        { type: req.body.type },
        { sharedUserId: req.user.id },
        { receivedUserId: req.body.receivedUserId },
      ],
    });

    if (checkfile) {
      return res
        .status(400)
        .json({ error: "File is already Shared with this user" });
    }

    const newFile = await FileShare.create({
      name: req.body.name,
      type: req.body.type,
      sharedUserId: req.user.id,
      receivedUserId: req.body.receivedUserId,
      url: req.body.url,
      path: req.body.path,
      tags: req.body.tags,
    });

    return res.status(200).json({
      newFile,
      message: "File Shared Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can not Shared file" });
  }
};

exports.badgeContent = async (req, res, next) => {
  try {
    const findbadgeContent = await FileShare.find({
      receivedUserId: req.user.id,
    });

    return res.status(200).json({
      data: findbadgeContent.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can not get file" });
  }
};
