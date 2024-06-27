var express = require("express");
var router = express.Router();

require("dotenv").config();
const pgp = require("pg-promise")(/* options */);
//import db from env
const db = pgp(
  `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`
);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api/plaza/top", async (req, res) => {
    try {
        const data_response = await db.many(
          "SELECT entry_id, artisan_id, initials, skill, nickname, gender, country_id, mii_data, likes, perm_likes FROM miis ORDER BY likes DESC LIMIT 50"
        );
        const data = data_response.map((item) => {
          const miiDataEncoded = item.mii_data.toString("base64");
          return { ...item, mii_data: miiDataEncoded };
        });
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    }
);

router.get("/api/plaza/popular", async (req, res) => {
  try {
    const data_response = await db.many("SELECT * FROM miis ORDER BY entry_id DESC");
    const data = data_response.map((item) => {
      const miiDataEncoded = item.mii_data.toString("base64");
      return { ...item, mii_data: miiDataEncoded };
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/api/plaza/all", async (req, res) => {
  try {
    const data_response = await db.many("SELECT entry_id, artisan_id, initials, skill, nickname, gender, country_id, mii_data, likes, perm_likes FROM miis ORDER BY entry_id");
    const data = data_response.map((item) => {
      const miiDataEncoded = item.mii_data.toString("base64");
      return { ...item, mii_data: miiDataEncoded };
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/api/plaza/search", async (req, res) => {
  try {
    const { search } = req.body;
    let data_response;
    if (search.length <= 2) {
      data_response = await db.any(
      "SELECT entry_id, artisan_id, initials, skill, nickname, gender, country_id, mii_data, likes, perm_likes FROM miis WHERE initials = $1", [search]
      );
    } else {
      data_response = await db.any(
      "SELECT entry_id, artisan_id, initials, skill, nickname, gender, country_id, mii_data, likes, perm_likes FROM miis WHERE nickname ILIKE $1", [`%${search}%`]
      );
    }
    const data = data_response.map((item) => {
      const miiDataEncoded = item.mii_data.toString("base64");
      return { ...item, mii_data: miiDataEncoded };
    })
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }});

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
    const contest_data = await db.oneOrNone(
      "SELECT contest_id, has_thumbnail, english_name, status, open_time, close_time, has_souvenir FROM contests WHERE contest_id = $1",
      [contest_id]
    );
    const entriesData_response = await db.manyOrNone("SELECT artisan_id, country_id, mii_data, likes, rank FROM contest_miis WHERE contest_id = $1", [contest_id]);
    const entries_data = entriesData_response.map((item) => {
      const miiDataEncoded = item.mii_data.toString("base64");
      return { ...item, mii_data: miiDataEncoded };
    });
    res.json({ contest_data, entries_data });
  } catch (error)
  {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.get("/api/artisans", async (req, res) => {
  try {
    const data_response = await db.many(
      "SELECT name, country_id, wii_number, mii_data, number_of_posts, total_likes, is_master, last_post FROM artisans ORDER BY artisan_id"
    );
    const data = data_response.map((item) => {
      const miiDataEncoded = item.mii_data.toString("base64");
      return { ...item, mii_data: miiDataEncoded };
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/api/artisans/artisan", async (req, res) => {
  try {
    const { wii_number } = req.body
    const artisan_response = await db.oneOrNone(
      "SELECT name, country_id, wii_number, mii_data, number_of_posts, total_likes, is_master, last_post FROM artisans WHERE wii_number = $1",
      [wii_number]
    );
    const miidata_response = await db.manyOrNone(
      "SELECT entry_id, initials, skill, nickname, gender, country_id, mii_data, likes, perm_likes FROM miis WHERE artisan_id = $1",
      [artisan_response.artisan_id]
    );

    const artisan_data = {
      ...artisan_response,
      mii_data: artisan_response.mii_data.toString("base64"),
    };
    const miis_data = miidata_response.map((item) => {
      const miiDataEncoded = item.miidataresponse.toString("base64");
      return { ...item, mii_data: miiDataEncoded };
    });
    res.json({ artisan_data, miis_data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/api/artisans/search", async (req, res) => {
  try {
    const { search } = req.body;
    let data_response;
    if (isNaN(search)) {
      data_response = await db.any(
        "SELECT name, country_id, wii_number, mii_data, number_of_posts, total_likes, is_master, last_post FROM artisans WHERE name ILIKE $1",
        [`%${search}%`]
      );
    } else {
      const wii_number = BigInt(search);
      data_response = await db.any(
        "SELECT name, country_id, wii_number, mii_data, number_of_posts, total_likes, is_master, last_post FROM artisans WHERE wii_number = $1",
        [wii_number]
      );
    }
    const data = data_response.map((item) => {
      const miiDataEncoded = item.mii_data.toString("base64");
      return { ...item, mii_data: miiDataEncoded };
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

})

module.exports = router;
