
// const metascraper = require('metascraper')([
//   require('metascraper-logo-favicon')(),
//   require('metascraper-image')(),
//   require('metascraper-publisher')(),
//   //require('metascraper-logo')(),
// ]);
// const got = require('got');

import got from 'got';
import metascraper from 'metascraper';


// Export lambda handler
exports.handler = async (event, context) => {
  try {
    let url = event.queryStringParameters.url;
    let title = event.queryStringParameters.title || 'tech';

    if (!url) {
      return {
        statusCode: 403,
        body: "Must include url query parameter"
      };
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
      return {
        statusCode: 200,
        body: JSON.stringify(metadata)
      };
    }

    let {
      body: json,
      _2
    } = await got("https://api.unsplash.com/search/photos?query=tech " + title + "&client_id=3OvKMi4PToRpzbMaoQwQGSD6wH7ornSlpNtaTrkcumE");
    json = JSON.parse(json);
    if (json.results[0].urls.small) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          ...metadata,
          image: json.results[0].urls.small
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...metadata,
        image: "https://jayclouse.com/wp-content/uploads/2019/06/hacker_news-1000x525-1.jpg"
      })
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 200,
      body: JSON.stringify({
        image: "https://jayclouse.com/wp-content/uploads/2019/06/hacker_news-1000x525-1.jpg",
        publisher: "",
        icon: ""
      })
    };
  }
};
