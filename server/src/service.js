const fs = require('fs');
const xml2js = require('xml2js');

module.exports = async (_req, res) => {
  fs.readFile(__dirname + '/backend_xml_responce.xml', 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
      throw err;
    }

    const options = {
      valueProcessors: [
        xml2js.processors.parseNumbers,
        xml2js.processors.firstCharLowerCase,
        xml2js.processors.parseBooleans,
      ],
    };

    xml2js.parseString(
      data,
      // { firstCharLowerCase: true, parseNumbers: true, parseBooleans: true },
      // options,
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
        // console.log('OFFERS: ', result.SearchResult.Offers.Item);
        const offers = result.SearchResult.Offers[0].Item;
        // const offers = result.SearchResult.Offers.Item;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify(offers));
      }
    );
  });
};
