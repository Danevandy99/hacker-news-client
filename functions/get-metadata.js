const serverless = require('serverless-http');
/* Express App */
const express = require('express');
const cors = require('cors');
const compression = require('compression');
var mcache = require('memory-cache');
const metascraper = require('metascraper')([
  require('metascraper-logo-favicon')(),
  require('metascraper-image')(),
  require('metascraper-publisher')(),
  //require('metascraper-logo')(),
]);
const got = require('got');

/* My express App */
function expressApp(functionName) {
  const app = express()
  const router = express.Router()
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


  // gzip responses
  router.use(compression())

  // Set router base path for local dev
  const routerBasePath = process.env.NODE_ENV === 'dev' ? `/${functionName}` : `/.netlify/functions/${functionName}/`

  /* define routes */
  router.get('/', cache(60 * 5), (req, res) => {
    try {
      let url = req.query.url;
      let title = req.query.title || 'tech';

      if (!url) {
        res.status(403).send("Must include url and title query parameters");
        return;
      }

      const {
        body: html,
        _
      } = await got(url)
      const metadata = await metascraper({
        html,
        url
      })
      console.log(metadata);
      if (metadata.image) {
        res.json(metadata);
        return;
      }

      let {
        body: json,
        _2
      } = await got("https://api.unsplash.com/search/photos?query=tech " + title + "&client_id=3OvKMi4PToRpzbMaoQwQGSD6wH7ornSlpNtaTrkcumE");
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


  // Setup routes
  app.use(routerBasePath, router)

  // Apply express middlewares
  router.use(cors())

  return app
}

// We need to define our function name for express routes to set the correct base path
const functionName = 'get-metadata';

// Initialize express app
const app = expressApp(functionName);

// Export lambda handler
exports.handler = serverless(app);
