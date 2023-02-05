const fs = require('fs');
const xml2js = require('xml2js');

module.exports = async (req, res) => {
  fs.readFile(__dirname + '/backend_xml_responce.xml', 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
      throw err;
    }

    xml2js.parseString(
      data,
      {
        attrNameProcessors: [xml2js.processors.firstCharLowerCase],
        attrValueProcessors: [xml2js.processors.parseBooleans],
      },
      (err, result) => {
        if (err) {
          res.statusCode = 500;
          res.end('Internal Server Error');
          throw err;
        }

        const offers = result.SearchResult.Offers[0].Item;
        const airports = result.SearchResult.References[0].Airports[0].Item;
        const airlines = result.SearchResult.References[0].Airlines[0].Item;

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        switch (req.url) {
          case '/offers':
            res.writeHead(200);
            res.end(JSON.stringify(offers));
            break;
          case '/airports':
            res.writeHead(200);

            res.end(JSON.stringify(airports));
            break;
          case '/flights':
            res.writeHead(200);
            res.end(JSON.stringify(airlines));

            break;
          case '/':
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Server is running' }));

            break;
          default:
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Resource not found' }));
        }
      }
    );
  });
};
