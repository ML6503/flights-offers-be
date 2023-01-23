const http = require('http');

const url = require('url');
const controller = require('./controller');

const app = () => {
  const PORT = process.env.PORT || 8080;

  const server = http.createServer(async (req, res) => {
    console.log('req method', req.method);

    req.query = new URL(req.url, `http://${req.headers.host}`);

    try {
      controller(req, res);
    } catch (e) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.write(`Error on server controller: ${e}`);
      res.end();
    }

    req.on('error', (err) => {
      console.error(err);

      res.statusCode = 400;
      res.end('Bad Request');
      return;
    });

    res.on('error', (err) => {
      console.error(err);
      return;
    });
  });

  server.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
  });
};

app();
