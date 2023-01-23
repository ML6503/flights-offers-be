const service = require('./service');

module.exports = (req, res) => {
  console.log('we are in controller and method', req.method);

  switch (req.method) {
    case 'GET':
      service(req, res);
      break;

    default:
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.write('No Response');
      res.end();
  }
};
