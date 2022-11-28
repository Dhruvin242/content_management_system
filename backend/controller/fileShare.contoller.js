const FileShare = require("../model/share.model");
const File = require("../model/File.model");

exports.fileShared = async (req, res, next) => {
  try {
    const checkfile = await FileShare.findOne({
      $and: [
        { name: req.body.name },
        { type: req.body.type },
        { sharedUserEmail: req.user.email },
        { receivedUserEmail: req.body.receivedUserEmail },
        { fileStatus: "NotFixed" },
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
      sharedUserEmail: req.user.email,
      sharedUserName: req.user.name,
      receivedUserEmail: req.body.receivedUserEmail,
      url: req.body.url,
      path: "root",
      tags: req.body.tags,
      permission: req.body.permission,
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
      receivedUserEmail: req.user.email,
      fileStatus: "NotFixed",
    });

    return res.status(200).json({
      shareCount: findbadgeContent.length,
      data: findbadgeContent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can not get file" });
  }
};

exports.fileStatus = async (req, res, next) => {
  try {
    console.log(req.body)
    const { fileResponse, shareFileName } = req.body;
    const requestShareFile = await FileShare.findOne({
      receivedUserEmail: req.user.email,
      name: shareFileName,
      fileStatus: "NotFixed",
    });

    if (fileResponse === "Denine") {
      requestShareFile.fileStatus = "Denine";
      requestShareFile.save();
      return res.status(200).json({
        message: "Shared Request File Denine",
      });
    } else {
      try {
        const newFile = await File.create({
          name: shareFileName,
          type: req.body.type,
          userId: req.user.id,
          createdBy: req.user.name,
          url: req.body.url,
          path: "root",
          tags: req.body.tags,
          permission: req.body.permission,
        });

        requestShareFile.fileStatus = "Approve";
        requestShareFile.save();

        const fileshareupdate = await File.updateOne(
          { name: shareFileName, createdBy: requestShareFile.sharedUserName },
          { $push: { SharedWith: req.user.name } }
        );

        return res.status(200).json({
          newFile,
          message: "File Added successfully",
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "File can not Added." });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Something went wrong please again later" });
  }
};

exports.reveivedUsersbadgeCount = async (req, res, next) => {
  try {
    const files = await FileShare.aggregate([
      { $group: { _id: "$name", count: { $sum: 1 } } },
    ]);

    console.log(files);
    return res.status(200).json({
      msg: "hi",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong please try again later",
    });
  }
};
