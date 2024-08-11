var express = require("express");
var path = require("path");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");
var morgan = require('morgan')
var fs = require("fs");
const formidableMiddleware = require('express-formidable');

var indexRouter = require("./routes/index");
var port = 3000

var app = express();

var corsOptions = {
  origin: false,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public/dist")));
app.use(helmet());
app.use(morgan('combined', { stream: accessLogStream }))
app.set("trust proxy", true);
app.use(function (req, res, next) {
  res.setHeader('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'; img-src * data:; connect-src *; font-src *; object-src *; media-src *; frame-src *;");
  next();
});
app.use(formidableMiddleware());

app.use("/", indexRouter);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: "draft-7", 
  legacyHeaders: false,
});

app.use(limiter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Mii Contest Viewer is running on ${port}`);
});

module.exports = app;
