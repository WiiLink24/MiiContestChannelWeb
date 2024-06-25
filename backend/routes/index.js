var express = require("express");
var router = express.Router();

const pgp = require("pg-promise")(/* options */);
//import db from env
const db = pgp("postgres://username:password@127.0.0.1/EVC");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api/plaza/top", async (req, res) => {
    try {
        const data = await db.many(
          "SELECT * FROM miis ORDER BY likes DESC LIMIT 50"
        );
        const formattedData = data.map(item => {
          console.log(item.mii_data)
            // Encoder mii_data en base64
            const miiDataEncoded = item.mii_data.toString('base64');
            // Retourner un nouvel objet avec toutes les propriétés de l'item, mais remplacer mii_data par sa version encodée
            return { ...item, mii_data: miiDataEncoded };
        });
        res.json(formattedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    }
);

router.get("/api/plaza/popular", async (req, res) => {
  try {
    const data = await db.many("SELECT * FROM miis ORDER BY entry_id DESC");
    const formattedData = data.map((item) => {
      console.log(item.mii_data);
      // Encoder mii_data en base64
      const miiDataEncoded = item.mii_data.toString("base64");
      // Retourner un nouvel objet avec toutes les propriétés de l'item, mais remplacer mii_data par sa version encodée
      return { ...item, mii_data: miiDataEncoded };
    });
    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/api/plaza/all", async (req, res) => {
  try {
    const data = await db.many("SELECT * FROM miis ORDER BY entry_id");
    const formattedData = data.map((item) => {
      const miiDataEncoded = item.mii_data.toString("base64");
      return { ...item, mii_data: miiDataEncoded };
    });
    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/api/contests", async (req, res) => {
  try {
    const data = await db.many("SELECT * FROM contests ORDER BY contest_id");
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/api/contests/:id", async (req, res) => {

})

router.get("/api/artisans", async (req, res) => {
  try {
    const data = await db.many("SELECT * FROM artisans ORDER BY artisan_id");
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/api/artisans/artisan", async (req, res) => {
  try {
    //fetch body data
    const { wii_number } = req.body
    const artisandata = await db.oneOrNone("SELECT * FROM artisans WHERE wii_number = $1", [wii_number]);
    const miidata = await db.manyOrNone("SELECT * FROM miis WHERE artisan_id = $1", artisandata.artisan_id);
    res.json({artisandata, miidata});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
