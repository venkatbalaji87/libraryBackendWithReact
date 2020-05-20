const express = require("express");
const Signup = require("../models/Signup");
const { compareHash } = require("../utils/hash");
const {
  adminTokenGenerator,
  adminTokenValidator
} = require("../utils/adminTokenManager");
const adminAuth = require("../middleware/adminAuth");
const Signin = require("../models/Signin");

const signinRouter = express.Router();

signinRouter
  .post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Signup.findOne({ email }).exec();
      if (admin) {
        const result = await compareHash(password, admin.passwordHash);
        console.log(result);
        if (result) {
          console.log('after result');
          const post = new Signin({email});
          const saveResponse = await post.save();
          const jwtToken = adminTokenGenerator({ email });
          res.cookie("jwt", jwtToken); // cookie will not work in another domain
          res.status(200).json({
            status: "SUCCESS",
            jwtToken // usually token is not sent back, here sending for the workaround
          });
        } else {
          res.status(400).send("Invalid Request");
        }
      } else {
        res.status(400).send("Invalid Request");
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  })
  .get("/isLoggedIn", adminAuth, async (req, res) => {
    res.status(200).json({ message: "logged in" });
  })
  .get("/logout", async (req, res) => {
   // clear cookies
    console.log('inside logout');
    try {
      const saveResponse = await Signin.deleteMany();
      res.status(200).send("logout successful");
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
    console.log('after logout');
  });

module.exports = signinRouter;
