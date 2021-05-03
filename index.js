
require('dotenv').config(); // this will read the .env file, if it exists

const { PORT = 3000, WEATHER_KEY } = process.env;

// const WEATHER_KEY = "2c59ba50618bc82c4a8d626cde56abb5";

console.log("Hello, world!");


const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.static('public'));

const axios = require('axios');

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

const cowsay = require('cowsay');
const Quote = require('inspirational-quotes')

const WEATHER_KEY = process.env.WEATHER_KEY

server.get('/cowspiration', (req, res) => {
  const { text, author } = Quote.getQuote();

  const cow = cowsay.say({
    text: `${ text }\n\n- ${ author }`,
    W: 80,
  });

  res.send({ cow });
});


server.post('/job-search', async (req, res) => {
  try {
    const { description, fulltime } = req.body;

    const URL = `https://jobs.github.com/positions.json?${
      description ? `description=${ description }&` : ''
    }${
      fulltime ? 'full_time=on' : ''
    }`;

    const { data } = await axios.get(URL);

    res.send({ results: data });
  } catch (error) {
    res.send({ error });
  }
});

server.get('/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${ lat }&lon=${ lon }&appid=${ WEATHER_KEY }`;
    
    const { data } = await axios.get(URL);
    res.send({ results: data });
    // make call, return data
  } catch (error) {
    res.send({ error });
  }
  
  // make axios request
  // send back data, or send back error
});


server.listen(PORT, () => {
  console.log('I am listening...');
});

// server.get('/hello', (req, res, next) => {
//     res.send(`
//     <html>
//     <head></head>
//     <body>
//       <h3>Hello!</h3>
//     </body>
//     </html>
//     `)
// });

// const { PORT = 3000 } = process.env;

// server.listen(PORT, () => {
//   // stuff
// });







