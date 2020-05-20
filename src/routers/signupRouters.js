const express = require("express");
const Signup = require("../models/Signup");
const UserProfile = require('../models/UserProfile');
const { generateHashSync } = require("../utils/hash");

const postsRouter = express.Router();

postsRouter.post("/", async (request, response) => {
  try {
    const post = new Signup(request.body);
    const posts = new UserProfile(request.body);
    console.log(request.body.password);
    console.log(request.body.email);
    console.log(generateHashSync(post.password));
    post.passwordHash = generateHashSync(post.password);
    const saveResponse = await post.save();
    const saveResponses = await posts.save();
    console.log(saveResponse);
    response.status(200).json({ status: "SUCCESS" });
  } catch (e) {
    console.error(e);
    response.status(500).send("Internal Server Error");
  }
});

module.exports = postsRouter;
