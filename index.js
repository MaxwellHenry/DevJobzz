console.log("Hello, world!");

const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.static('public'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.post('/job-search', (req, res) => {
    res.send({
      searchData: req.body,
      status: "PENDING",
    })
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

server.listen(3000, () => {
  console.log('I am listening...');
});
