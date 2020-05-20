require("./config/db");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const signinRouter = require("./routers/signinRouters");
const signupRouter = require("./routers/signupRouters");
const libraryRouter = require("./routers/libraryRouters");

const app = express();

app.set("trust proxy", 1); // trust first proxy
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Blog Backend running!");
});

app.use("/library", libraryRouter);
app.use("/signin", signinRouter);
app.use("/signup", signupRouter);

const server = app.listen(8080, () => {
  console.log("Server running on port " + server.address().port);
});
