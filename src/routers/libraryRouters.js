const express = require("express");
const Library = require("../models/Library");
const Cart = require("../models/Cart");
const Checkout = require("../models/Checkout");
const Signup = require("../models/Signup");
const Signin = require("../models/Signin");
const bookProfile = require("../models/BookProfile");
const UserProfile = require("../models/UserProfile");
require("../config/db");
const LibraryRouter = express.Router();

LibraryRouter.get("/", async (request, response) => {
  try {
    const posts = await Library.find({});
//    console.log(posts);
    response.status(200).json({ posts });
  } catch (e) {
    console.error(e);
    response.status(500).send("Internal Server Error");
  }
})
  .post("/cart", async (request, response) => {
    try {
      const posts = await Signin.find();

      const post = new Cart(request.body);
    //  console.log(post);
      const temps = await Library.update(
        { bookid: post.bookid },
        {
          $set: {
            bookName: post.bookName,
            genre: post.genre,
            authorName: post.authorName,
            quantity: post.quantity-1
          }
        }
      );

      const tempsValue = await Cart.update(
        { bookid: post.bookid },
        {
          $set: {
            bookName: post.bookName,
            genre: post.genre,
            authorName: post.authorName,
            quantity: post.quantity+1
          }
        }
      );

      let b = 0;
      post.quantity = ++b;
      post.email = posts[posts.length - 1].email;
      const temp = await Cart.findOne({bookid : post.bookid , email : post.email})
      console.log(temp);

     
     
      const ups = await Cart.aggregate([
      {$match : {bookid : post.bookid}},
       {$group}
      ])
          const saveResponse = await post.save();
       
          response.status(200).json({ status: "SUCCESS" });
      
      

      

      
    } catch (e) {
      console.error(e);
      response.status(500).send("Internal Server Error");
    }
  })
  .get("/carts", async (request, response) => {
    try {
      const temp = await Signin.find();
      const posts = await Cart.find({ email: temp[temp.length - 1].email });
      response.status(200).json({ posts });
    } catch (e) {
      console.error(e);
      response.status(500).send("Internal Server Error");
    }
  })
  .post("/checkout", async (request, response) => {
    try {
      const posts = await Signin.find();
      const post = new Checkout(request.body);
      post.email = posts[posts.length - 1].email;
      const temp = await Cart.remove({
        bookid: post.bookid,
        email: post.email
      });
      console.log(temp);
      const saveResponse = await post.save();
      console.log(saveResponse);
      response.status(200).json({ status: "SUCCESS" });
    } catch (e) {
      console.error(e);
      response.status(500).send("Internal Server Error");
    }
  })
  .get("/checkouts", async (request, response) => {
    try {
      const temp = await Signin.find();
      const posts = await Checkout.find({ email: temp[temp.length - 1].email });

      response.status(200).json({ posts });
    } catch (e) {
      console.error(e);
      response.status(500).send("Internal Server Error");
    }
  })
  .post("/profile", async (request, response) => {
    try {
      const posts = await Signin.find();
      const post = new bookProfile(request.body);
      //  const temp = await Signup.find({ email: posts[posts.length - 1].email });
      //  console.log(temp);
      post.email = posts[posts.length - 1].email;
      const temp = await Checkout.remove({
        bookid: post.bookid,
        email: post.email
      });
      console.log(temp);
      const saveResponse = await post.save();
      console.log(saveResponse);
      response.status(200).json({ status: "SUCCESS" });
    } catch (e) {
      console.error(e);
      response.status(500).send("Internal Server Error");
    }
  })
  .get("/profiles", async (request, response) => {
    try {
      const temp = await Signin.find();
      console.log(temp[temp.length - 1].email);
      const post = await bookProfile.find({
        email: temp[temp.length - 1].email
      });
      console.log(temp);
      const posts = await UserProfile.find({
        email: temp[temp.length - 1].email
      });
      console.log(posts);
      response.status(200).json({ posts, post });
    } catch (e) {
      console.error(e);
      response.status(500).send("Internal Server Error");
    }
  })
  .post("/return", async (request, response) => {
    try {
      
      const post = new Library(request.body);
      console.log(post)
      const posts = await Library.find({ bookid : post.bookid});
     console.log(posts);
    console.log(posts[0].quantity);
      const temps = await Library.update(
        { bookid: post.bookid },
        {
          $set: {
            bookName: post.bookName,
            genre: post.genre,
            authorName: post.authorName,
            quantity: post.quantity + posts[0].quantity
          }
        }
      );
      console.log(temps);
      const temp = await bookProfile.remove({
        bookid: post.bookid,
      });
      response.status(200).json({ status: "SUCCESS" });
    } catch (e) {
      console.error(e);
      response.status(500).send("Internal Server Error");
    }
  });

module.exports = LibraryRouter;
