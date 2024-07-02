var express = require("express");
var router = express.Router();

require("dotenv").config();
const pgp = require("pg-promise")(/* options */);
//import db from env
const db = pgp(
  `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`
);

//pagination settings
const PlazaPageSize = 50;
const ContestPageSize = 50;
const ArtisanPageSize = 50;

function calculatePages(totalItems, pageSize) {
  
}

const GetPagesMiis = `SELECT COUNT(*) FROM miis`;
const GetPagesContests = `SELECT COUNT(*) FROM contests`;
const GetPagesArtisans = `SELECT COUNT(*) FROM artisans`;



router.get("/api/plaza/top", async (req, res) => {
    try {
      const query = `SELECT m.*, a.is_master AS artisan_is_master, a.name AS artisan_name
      FROM miis m
      LEFT JOIN artisans a ON m.artisan_id = a.artisan_id
      ORDER BY m.perm_likes DESC
      LIMIT 50`;
        const data_response = await db.many(query);
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
    const page = req.query.page || 1;
    const pageNumber = parseInt(page);
    const offset = (pageNumber - 1) * PlazaPageSize;
    const query = `
  SELECT m.*, a.is_master AS artisan_is_master, a.name AS artisan_name
  FROM miis m
  LEFT JOIN artisans a ON m.artisan_id = a.artisan_id
  ORDER BY m.entry_id DESC
  LIMIT $1 OFFSET $2
`;
    const data_response = await db.many(query, [PlazaPageSize, offset]);

    const data = data_response.map((item) => {
      const miiDataEncoded = item.mii_data.toString("base64");
      return { ...item, mii_data: miiDataEncoded};
    });

    let total_items = await db.one(GetPagesMiis);
    total_items = parseInt(total_items.count);
    const total_pages = Math.ceil(total_items / PlazaPageSize);

    res.json({ total_pages, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/api/plaza/all", async (req, res) => {
  try {
    const page = req.query.page || 1;
    //convert page to number
    const pageNumber = parseInt(page);
    //calculate offset
    const offset = (pageNumber - 1) * PlazaPageSize;
    const query = `SELECT m.*, a.is_master AS artisan_is_master, a.name AS artisan_name
    FROM miis m
    LEFT JOIN artisans a ON m.artisan_id = a.artisan_id
    ORDER BY m.entry_id
    LIMIT $1 OFFSET $2`;

    const data_response = await db.many(query, [PlazaPageSize, offset]);
    const data = data_response.map((item) => {
      const miiDataEncoded = item.mii_data.toString("base64");
      return { ...item, mii_data: miiDataEncoded };
    });

    //pagination
    //calculate total pages
    let total_items = await db.one(GetPagesMiis);
    //get only the number of items
    total_items = parseInt(total_items.count);
    const total_pages = Math.ceil(total_items / PlazaPageSize);

    res.json({total_pages, data});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/api/plaza/mii", async (req, res) => {
  try {
    const { entry_id } = req.body;
    const data_response = await db.oneOrNone("SELECT entry_id, artisan_id, initials, skill, nickname, gender, country_id, mii_data, likes, perm_likes FROM miis WHERE entry_id = $1", [entry_id]);
    if (!data_response) {
      return res.status(404).json({ message: "Mii not found" });
    } else {
      const data = {
        ...data_response,
        mii_data: data_response.mii_data.toString("base64"),
      };
      res.json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
);
  

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
    const page = req.query.page || 1;
    //convert page to number
    const pageNumber = parseInt(page);

    //calculate offset
    const offset = (pageNumber - 1) * ArtisanPageSize;

    const data_response = await db.many(
      "SELECT artisan_id, name, country_id, wii_number, mii_data, number_of_posts, total_likes, is_master, last_post FROM artisans ORDER BY artisan_id LIMIT $1 OFFSET $2", [ArtisanPageSize, offset]
    );
    const data = data_response.map((item) => {
      const miiDataEncoded = item.mii_data.toString("base64");
      return { ...item, mii_data: miiDataEncoded };
    });

    //calculate total pages
    let total_items = await db.one(GetPagesArtisans);
    //get only the number of items
    total_items = parseInt(total_items.count);
    const total_pages = Math.ceil(total_items / ArtisanPageSize);

    res.json({total_pages, data});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/api/artisans/artisan", async (req, res) => {
  try {
    const { artisan_id } = req.body
    const artisan_response = await db.oneOrNone(
      "SELECT artisan_id, name, country_id, wii_number, mii_data, number_of_posts, total_likes, is_master, last_post FROM artisans WHERE artisan_id = $1",
      [artisan_id]
    );
    console.log(artisan_response)
    const miidata_response = await db.manyOrNone(
      "SELECT entry_id, initials, skill, nickname, gender, country_id, mii_data, likes, perm_likes FROM miis WHERE artisan_id = $1",
      [artisan_id]
    );

    console.log(miidata_response)
    const artisan_data = {
      ...artisan_response,
      mii_data: artisan_response.mii_data.toString("base64"),
    };
    const miis_data = miidata_response.map((item) => {
      console.log(item)
      const miiDataEncoded = item.mii_data.toString("base64");
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
