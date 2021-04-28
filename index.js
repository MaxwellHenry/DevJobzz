console.log("Hello, world!");

// index.js
const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.static('public'));

// NEW
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
  
const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false })); 

// NEW
server.post('/job-search', (req, res) => {
    res.send({
      searchData: req.body,
      status: "PENDING",
    })
  });

// oh no, this is going to prevent us from hitting the static server
server.get('/', (req, res) => {
    // it's ok to omit next if you're not going to call it
  
    res.send({ message: 'boop' })
  });
  
  // sad static server
  server.use(express.static('public'));

server.listen(3000, () => {
  console.log('I am listening...');
});
