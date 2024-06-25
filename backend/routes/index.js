var express = require("express");
var router = express.Router();

const pgp = require("pg-promise")(/* options */);
//import db from env
const db = pgp("postgres://username:password@127.0.0.1/EVC");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api/top", async (req, res) => {
    try {
        const data = await db.any("SELECT * FROM miis ORDER BY likes DESC LIMIT 50");

         const formattedData = data.map((item) => {
           if (
             item.mii_data &&
             item.mii_data.type === "Buffer" &&
             item.mii_data.data
           ) {
             item.mii_data_base64 = Buffer.from(item.mii_data.data).toString(
               "base64"
             );
             delete item.mii_data; // Optionally remove the original buffer field
           }
           return item;
         });
        res.json(formattedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    }
);

module.exports = router;
