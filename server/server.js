const http = require('http');
const fs = require('fs');
const xml2js = require('xml2js');
const url = require('url');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
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

  fs.readFile(__dirname + '/backend_xml_responce.xml', 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
      throw err;
    }
    xml2js.parseString(data, (err, result) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        throw err;
      }
      console.log('OFFERS: ', result.SearchResult.Offers[0].Item);
      const offers = result.SearchResult.Offers[0].Item[0];
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(offers));
    });
  });
});

server.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
