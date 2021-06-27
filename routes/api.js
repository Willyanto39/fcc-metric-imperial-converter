'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  const convertHandler = new ConvertHandler();
  
  app.get('/api/convert', function (req, res) {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    
    if (!initNum && ! initUnit) {
      return res.send('invalid number and unit');
    } else if (!initNum) {
      return res.send("invalid number");
    } else if (!initUnit) {
      return res.send("invalid unit");
    }
    
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });
};
