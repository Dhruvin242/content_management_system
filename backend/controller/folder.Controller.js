const Folder = require("../model/Folder.model");

exports.createFolder = async (req, res, next) => {
  console.log(req.user);
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

    res.status(200).json({
      result,
    });
  } catch (error) {
    catchResponse(res, 500, "Something went wrong...");
    console.log(error);
  }
};
