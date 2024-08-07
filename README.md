<p align="center">
<a href="https://wiilink24.com"><img height="100px" src="https://www.wiilink24.com/img/Wii_Link_Logo.png" alt="Logo"/></a>
  <h2 align="center"><b><i>The frontend and backend for WiiLink's Mii Contest Viewer website.</i></b></h2>
</p>

# Table of contents

- [Introduction](#introduction)
- [Self hosting](#self-hosting)
- [API](#api)
  - [Plaza](#plaza)
    - [Fetch the Top 50](#fetch-the-top-50-get)
    - [Fetch the latest Miis](#fetch-the-latest-miis-get)
    - [Fetch all Miis](#fetch-all-miis-get)
    - [Fetch a specific Mii](#fetch-a-specific-mii-post)
    - [Search for Miis](#search-for-miis-post)
  - [Artisans](#artisans)
    - [Fetch all Artisans](#fetch-all-artisans-get)
    - [Fetch a specific Artisan](#fetch-a-specific-artisan-post)
    - [Search for Artisans](#search-for-artisans-post)
  - [Contests](#contests)
    - [Fetch all contests](#fetch-all-contests-get)
    - [Fetch a specific contest](#fetch-a-specific-contest-post)
  - [Misc](#misc)
    - [Check if a Wii Number is valid](#check-if-a-wii-number-is-valid-post)
- [License](#license)

# Introduction

This website serves as a web frontend and backend for WiiLink's Mii Contesnt Channel.

You can access and view plaza Miis, ordered by newest, most popular and by searching. You can also consult Artisans and their associated Miis, as well as Contests and their entries.

The website also includes a free and public API to use.

For the frontend, Vue 3 with TypeScript and Tailwind CSS are used. For the backend, Express is serving the website and the JSON responses.

# Self hosting

You'll need the [Mii Contest Channel Server](https://github.com/WiiLink24/MiiContestChannelServer) running, including the PostgreSQL server.

Next, clone this repository, fill out the `.env` for both the frontend and backend, and open a terminal in the folder:

```sh
npm install
npm run start
```

Both the frontend and backend should start. You can also start the frontend and backend individually by typing

```sh
npm run start:frontend
npm run start:backend
```

To build and run the website the website, simply type in the frontend folder:

```sh
npm run build
```

A `dist` folder should appear. Next, just move it to `backend/public` and start the backend.

# API

The Mii Contest Channel API is public and free to use.

However, please note that a rate limit has been set on the server to minimize strain on the server.
Meaning that you can make **100 requests** per **15-minute window**. Exceeding this limit will result in a **429** HTTP status code, and you'll have to wait for the next window.

In total, 11 routes are available to use.

Some routes also includes pagination. To change pages, use `?page=` on the routes with the `"total_pages"` field in the JSON response.

For POST requests, the body needs to be a JSON.

## Plaza

### Fetch the Top 50 (GET)

```txt
https://miicontest.wiilink.ca/api/plaza/top
```

### Fetch the latest Miis (GET)

```txt
https://miicontest.wiilink.ca/api/plaza/popular
```

### Fetch all Miis (GET)

```txt
https://miicontest.wiilink.ca/api/plaza/all
```

### Fetch a specific Mii (POST)

```txt
https://miicontest.wiilink.ca/api/plaza/mii
```

Use the channel's entry code to fetch.

```json
{
    "entry_code": "5403-6703-1484"
}
```

### Search for Miis (POST)

```txt
https://miicontest.wiilink.ca/api/plaza/search
```

Use either the initals, nickname or entry ID to search.

```json
{
    "search": "Matt" 
}
```

## Artisans

### Fetch all Artisans (GET)

```txt
https://miicontest.wiilink.ca/api/artisans
```

### Fetch a specific Artisan (POST)

```txt
https://miicontest.wiilink.ca/api/artisans/artisan
```

Use the Artisan ID for this.

```json
{
    "artisan_id": 100000005 
}
```

### Search for Artisans (POST)

```txt
https://miicontest.wiilink.ca/api/artisans/search
```
Use either the nickname or Wii Number to search.

```json
{
    "search": 2038467325237853 
}
```

## Contests

### Fetch all contests (GET)

```txt
https://miicontest.wiilink.ca/api/contests
```

### Fetch a specific contest (POST)

```txt
https://miicontest.wiilink.ca/api/contests/contest
```

Use the Contest ID for this.

```txt
{
    "contest_id": 11 
}
```

## Misc

### Check if a Wii Number is valid (POST)

```txt
https://miicontest.wiilink.ca/api/testnumber
```

Send the number formatted like the following

```json
{
    "number": "0000-0000-0000-0000"
}
```

# License

This project is licenced under the [MIT License](https://rem.mit-license.org)

# Also Check out

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=WiiLink24&repo=EVC-Viewer)](https://github.com/WiiLink24/EVC-Viewer)
[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=WiiLink24&repo=web)](https://github.com/WiiLink24/web)
[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=WiiLink24&repo=WiiLink24-Patcher)](https://github.com/WiiLink24/WiiLink24-Patcher)
