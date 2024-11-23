const userRouter = require("express").Router();

const userModel = require("../models/User.model");


userRouter.post("/signup", async (req, res) => {
  try {
    if (!req.body.email) {
      return res
        .status(400)
        .json({ message: "Email is missing", success: false });
    }
    if (!req.body.oldPassword) {
      return res
        .status(400)
        .json({ message: "Password is missing", success: false });
    }

    const userEmail = await userModel.findOne({ email: req.body.email });
    if (userEmail) {
      return res
        .status(409)
        .json({ message: "Email already exists", success: false });
    }

    const newUser = new userModel(req.body);
    const result = await newUser.save();
    if (result && result._id) {
      return res
        .status(201)
        .json({ message: "Account created successfully", success: true });
    } else {
      return res
        .status(500)
        .json({ message: "Unable to create the account", success: false });
    }
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Something went wrong",
        error: error.message,
        success: false,
      });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const EMAIL = req.body.email;
    const PASSWORD = req.body.oldPassword;

    if ( !EMAIL || !PASSWORD) {
       console.log(EMAIL, PASSWORD);
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }
    

    const matchingUser = await userModel.findOne({ email: EMAIL });

    if (!matchingUser) {
      return res
        .status(404)
        .json({ message: "Account doesn't exist", success: false });
    }

    if (EMAIL && PASSWORD) {
      console.log(EMAIL, PASSWORD);
      return res
        .status(200)
        .json({ message: "Signin successful", success: true });
    } else {
        console.log(EMAIL, PASSWORD);
      return res
        .status(400)
        .json({ message: "Invalid Credentials", success: false });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      success: false,
    });
  }
});

userRouter.put("/reset/:email", async (req, res) => {
  try {
    const { oldPassword, newPassword, reEnterPassword } = req.body;
    const { email } = req.params;

    if (!oldPassword || !newPassword || !reEnterPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (userModel.oldPassword !== userModel.newPassword) {
      return res.status(400).json({ message: "Old password do not match" });
    }
      if (newPassword !== reEnterPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.newPassword = newPassword;
    await user.save();
    console.log("Received oldPassword:", oldPassword);
    console.log("Stored user password:", user.newPassword);

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
module.exports = userRouter;
