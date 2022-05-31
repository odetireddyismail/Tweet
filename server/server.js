const express = require("express");
const bodyParser = require("body-parser");
const util = require("util");
const request = require("request");
const path = require("path");
const http = require("http");

const app = express();
let port = process.env.PORT || 3000;
const post = util.promisify(request.post);
const get = util.promisify(request.get);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

const BEARER_TOKEN =
  "AAAAAAAAAAAAAAAAAAAAALBrYwEAAAAAVyzPxN5mPJRo%2BI%2Fvktune8915kc%3DF1xsrikePItsvFwqBv86SGxJSXg0ulMCJjzRbeiQvJgzd4eNdP";

let timeout = 0;

const authMessage = {
  title: "Could not authenticate",
  details: [`Please make sure your bearer token is correct`],
  type: "https://developer.twitter.com/en/docs/authentication",
};

const sleep = async (delay) => {
  return new Promise((resolve) => setTimeout(() => resolve(true), delay));
};

app.get("/api/tweets", async (req, res) => {
  if (!BEARER_TOKEN) {
    res.status(400).send(authMessage);
  }

  let userName = req.query.name;
  console.log(req.query);
  if (userName == "") {
    res.send("Invalid request");
  }
  //make call to get the id

  const token = BEARER_TOKEN;
  let userId = "";
  userResponse = await get({
    url: `https://api.twitter.com/2/users/by/username/${userName}`,
    auth: {
      bearer: token,
    },
    json: true,
  });

  if (userResponse.statusCode == 200) {
    userId = userResponse.body.data.id;
  } else {
    res.send(userResponse);
  }

  const tweetsUrl = `https://api.twitter.com/2/users/${userId}/tweets/`;
  const requestConfig = {
    url: tweetsUrl,
    auth: {
      bearer: token,
    },
    json: true,
  };

  try {
    const response = await get(requestConfig);
    res.send(response);
  } catch (e) {
    res.send(e);
  }
});

port = 3001;

server.listen(port, () => console.log(`Listening on port ${port}`));
