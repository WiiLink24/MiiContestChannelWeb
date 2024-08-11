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
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com", "fonts.gstatic.com"],
      scriptSrc: ["'self'", "fontawesome.com", "kit.fontawesome.com", "unpkg.com", "cdn.jsdelivr.net", "'unsafe-inline'"],
      imgSrc: ["'self'", "rc24.xyz", "studio.mii.nintendo.com", "cdn.jsdelivr.net", "'unsafe-inline'"],
      connectSrc: ["'self'", "ka-f.fontawesome.com", "miicontestp.wii.rc24.xyz", "'unsafe-inline'"],
      fontSrc: ["'self'", "fonts.gstatic.com", "ka-f.fontawesome.com", "kit.fontawesome.com", "'unsafe-inline'"],
    }
  }
}));
app.use(morgan('combined', { stream: accessLogStream }))
app.set("trust proxy", true);
/* app.use(formidableMiddleware()); */

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
  console.log(`CMOC Viewer is running on ${port}`);
});

module.exports = app;
