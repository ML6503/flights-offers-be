const fs = require('fs');
const xml2js = require('xml2js');

module.exports = async (req, res) => {
  // TODO  arrange  if or switch for req.url
  //case `/offers`
  // case `/airports`
  // case `/flights`
  console.log('we are in service');
  fs.readFile(__dirname + '/backend_xml_responce.xml', 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
      throw err;
    }

    xml2js.parseString(
      data,

      {
        attrNameProcessors: [
          xml2js.processors.firstCharLowerCase,
          // xml2js.processors.parseNumbers,
        ],
        attrValueProcessors: [xml2js.processors.parseBooleans],
      },
      (err, result) => {
        if (err) {
          res.statusCode = 500;
          res.end('Internal Server Error');
          throw err;
        }
        console.log('OFFERS: ', result.SearchResult.Offers[0].Item[0]);

        const offers = result.SearchResult.Offers[0].Item;
        const airports = result.SearchResult.References[0].Airports[0].Item;
        // Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
        // const encoding = Encoding.GetEncoding('windows-1251');
        // const encodedAirports = encoding.GetString(responseBytes);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        switch (req.url) {
          case '/offers':
            res.writeHead(200);
            res.end(JSON.stringify(offers));
            break;
          case '/airports':
            res.writeHead(200);
            // res.end('airports');
            res.end(JSON.stringify(airports));
            break;
          case '/flights':
            res.writeHead(200);
            res.end('flights');
            // res.end(JSON.stringify(flights));
            break;
          case '/':
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Server is running' }));
            // res.end(JSON.stringify(flights));
            break;
          default:
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Resource not found' }));
        }
      }
    );
  });
};
