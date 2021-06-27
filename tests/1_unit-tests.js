const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Test getNum()', function() {
    test('Whole Number Input', function(done) {
      const num = convertHandler.getNum('5kg');

      assert.equal(num, 5);
      done();
    });

    test('Decimal Input', function(done) {
      const num = convertHandler.getNum('5.6kg');

      assert.equal(num, 5.6);
      done();
    });

    test('Fractional Input', function(done) {
      const num = convertHandler.getNum('6/4kg');

      assert.equal(num, 6 / 4);
      done();
    });

    test('Fractional Input with Decimal', function(done) {
      const num = convertHandler.getNum('5.0/2.0kg');

      assert.equal(num, 5.0 / 2.0);
      done();
    });

    test('Double Fraction Input', function(done) {
      const num = convertHandler.getNum('3/7.2/4kg');

      assert.isUndefined(num);
      done();
    });

    test('No Numerical Input', function(done) {
      const num = convertHandler.getNum('kg');

      assert.equal(num, 1);
      done();
    });
  });

  suite('Test convertHandler.getUnit()', function() {
    test('For Each Valid Unit Inputs', function(done) {
      const inputs = ['KG', 'LBS', 'l', 'GAL', 'KM', 'MI'];
      const outputs = ['kg', 'lbs', 'L', 'gal', 'km', 'mi'];

      inputs.map(function(unit, index) {
        const result = convertHandler.getUnit(unit);
        assert.equal(result, outputs[index]);
      });

      done();
    });

    test('Invalid Unit Input', function(done) {
      const unit = convertHandler.getUnit('3cm');

      assert.isUndefined(unit, 'Unit is not undefined');
      done();
    });
  });

  suite('Test convertHandler.getReturnUnit()', function(done) {
    test('For Each Valid Unit Inputs', function(done) {
      const inputs = ['kg', 'lbs', 'L', 'gal', 'km', 'mi'];
      const outputs = ['lbs', 'kg', 'gal', 'L', 'mi', 'km'];

      inputs.map(function(unit, index) {
        const output = convertHandler.getReturnUnit(unit);

        assert.equal(output, outputs[index]);
      });

      done();
    });
  });

  suite('Test convertHandler.spellOutUnit', function() {
    test('For Each Valid Unit Inputs', function(done) {
      const inputs = ['kg', 'lbs', 'L', 'gal', 'km', 'mi'];
      const outputs = ['kilograms', 'pounds', 
        'liters', 'gallons', 'kilometers', 'miles'];

      inputs.map(function(unit, index) {
        const output = convertHandler.spellOutUnit(unit);

        assert.equal(output, outputs[index]);
      });

      done();
    });
  });

  suite('Test convertHandler.convert()', function(done) {
    test('Convert gal to L', function(done) {
      const result = convertHandler.convert(1, 'gal');

      assert.approximately(result, 3.78541, 0.1);
      done();
    });

    test('Convert L to gal', function(done) {
      const result = convertHandler.convert(3.78541, 'L');

      assert.approximately(result, 1, 0.1);
      done();
    });

    test('Convert mi to km', function(done) {
      const result = convertHandler.convert(1, 'mi');

      assert.approximately(result, 1.60934, 0.1);
      done();
    });

    test('Convert km to mi', function(done) {
      const result = convertHandler.convert(1.60934, 'km');

      assert.approximately(result, 1, 0.1);
      done();
    });

    test('Convert lbs to kg', function(done) {
      const result = convertHandler.convert(1, 'lbs');

      assert.approximately(result, 0.453592, 0.1);
      done();
    });

    test('Convert kg to lbs', function(done) {
      const result = convertHandler.convert(0.453592, 'kg');

      assert.approximately(result, 1, 0.1);
      done();
    });
  });
});