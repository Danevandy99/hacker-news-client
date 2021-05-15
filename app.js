// create an express app
const express = require("express");
const cors = require('cors');
var mcache = require('memory-cache');
const metascraper = require('metascraper')([
  require('metascraper-logo-favicon')(),
  require('metascraper-image')(),
  require('metascraper-publisher')(),
  //require('metascraper-logo')(),
]);
const got = require('got');

var cache = (duration) => {
  return (req, res, next) => {
    if (!req.query.url) {
      next();
      return;
    }
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      console.log("using cache");
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        console.log("caching for " + req.query.url);
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      }
      next()
    }
  }
}

const app = express();

app.use(cors())

// define the first route
app.get("/get-metadata", cache(60 * 5), async (req, res) => {
  try {
    let url = req.query.url;
    let title = req.query.title || 'tech';

    if (!url) {
      res.status(403).send("Must include url and title query parameters");
      return;
    }

    const { body: html, _ } = await got(url)
    const metadata = await metascraper({ html, url })
    console.log(metadata);
    if (metadata.image) {
      res.json(metadata);
      return;
    }

    let { body: json, _2 } = await got("https://api.unsplash.com/search/photos?query=tech " + title + "&client_id=3OvKMi4PToRpzbMaoQwQGSD6wH7ornSlpNtaTrkcumE");
    json = JSON.parse(json);
    if (json.results[0].urls.small) {
      res.json({
        ...metadata,
        image: json.results[0].urls.small
      });
      return;
    }

    res.json({
      ...metadata,
      image: "https://jayclouse.com/wp-content/uploads/2019/06/hacker_news-1000x525-1.jpg"
    });
  } catch (error) {
    console.log(error);
    res.json({
      image: "https://jayclouse.com/wp-content/uploads/2019/06/hacker_news-1000x525-1.jpg",
      publisher: "",
      icon: ""
    });
  }
})

// app.use('/', express.static(__dirname + '/dist/hacker-news-client'));

// app.get('/*', (req, res) => {
//   res.sendFile(__dirname + '/dist/hacker-news-client/index.html');
// });

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + (process.env.PORT || 3000) + "...")
});
