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
          "SELECT entry_id, artisan_id, initials, skill, nickname, gender, country_id, mii_data, likes, perm_likes FROM miis ORDER BY likes DESC LIMIT 50"
        );
        const formattedData = data.map((item) => {
          const miiDataEncoded = item.mii_data.toString("base64");
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
      const miiDataEncoded = item.mii_data.toString("base64");
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
    const data = await db.many("SELECT entry_id, artisan_id, initials, skill, nickname, gender, country_id, mii_data, likes, perm_likes FROM miis ORDER BY entry_id");
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
    const data = await db.many("SELECT contest_id, has_thumbnail, english_name, status, open_time, close_time, has_souvenir FROM contests ORDER BY contest_id");
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/api/contests/contest", async (req, res) => {
  try {
    const { contest_id } = req.body;
    const contestData = await db.oneOrNone(
      "SELECT contest_id, has_thumbnail, english_name, status, open_time, close_time, has_souvenir FROM contests WHERE contest_id = $1",
      [contest_id]
    );
    const entriesData = await db.manyOrNone("SELECT artisan_id, country_id, mii_data, likes, rank FROM contest_miis WHERE contest_id = $1", [contest_id]);
    const formattedEntriesData = entriesData.map((item) => {
      const miiDataEncoded = item.mii_data.toString("base64");
      return { ...item, mii_data: miiDataEncoded };
    });
    res.json({ contestData, formattedEntriesData });
  } catch (error)
  {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.get("/api/artisans", async (req, res) => {
  try {
    const data = await db.many(
      "SELECT name, country_id, wii_number, mii_data number_of_posts, total_likes, is_master, last_post FROM artisans ORDER BY artisan_id"
    );
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
    const artisandata = await db.oneOrNone(
      "SELECT name, country_id, wii_number, number_of_posts, total_likes, is_master, last_post FROM artisans WHERE wii_number = $1",
      [wii_number]
    );
    const miidata = await db.manyOrNone(
      "SELECT name, country_id, wii_number, number_of_posts, total_likes, is_master, last_post FROM miis WHERE artisan_id = $1",
      artisandata.artisan_id
    );

    const formattedArtisanData = { ...artisandata, mii_data: artisandata.mii_data.toString("base64") };
    const formattedMiiData = data.map((item) => {
      const miiDataEncoded = item.mii_data.toString("base64");
      return { ...item, mii_data: miiDataEncoded };
    });
    res.json({ formattedArtisanData, formattedMiiData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/api/artisans/search", async (req, res) => {
  try {
    const { search } = req.body;
    let data;
    if (isNaN(search)) {
      data = await db.any("SELECT name, country_id, wii_number, mii_data number_of_posts, total_likes, is_master, last_post FROM artisans WHERE name ILIKE $1", [`%${search}%`]);
    } else {
      const wii_number = BigInt(search);
      data = await db.any(
        "SELECT name, country_id, wii_number, mii_data number_of_posts, total_likes, is_master, last_post FROM artisans WHERE wii_number = $1",
        [wii_number]
      );
    }
    const formattedData = data.map((item) => {
      const miiDataEncoded = item.mii_data.toString("base64");
      return { ...item, mii_data: miiDataEncoded };
    });
    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

})

module.exports = router;
