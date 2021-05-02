console.log("Hello, world!");

const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.static('public'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

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

// somewhere before server.listen()
const cowsay = require('cowsay');
const Quote = require('inspirational-quotes')

server.get('/cowspiration', (req, res) => {
  const { text, author } = Quote.getQuote();

  const cow = cowsay.say({
    text: `${ text }\n\n- ${ author }`,
    W: 80,
  });

  res.send({ cow });
});


server.get('/hello', (req, res, next) => {
    res.send(`
    <html>
    <head></head>
    <body>
      <h3>Hello!</h3>
    </body>
    </html>
    `)
});

const axios = require('axios');





server.listen(3000, () => {
  console.log('I am listening...');
});
