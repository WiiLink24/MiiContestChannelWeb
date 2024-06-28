var express = require("express");
var path = require("path");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

var indexRouter = require("./routes/index");
var port = 3000

var app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public/dist")));

app.use("/", indexRouter);

// Adds rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

app.use(limiter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/dist/index.html"));
});

app.listen(port, () => {
  console.log(`CMOC Viewer is running on ${port}`);
});

module.exports = app;
