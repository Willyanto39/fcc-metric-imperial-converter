function ConvertHandler() {
  
  this.getNum = function(input) {
    const numbers = input.replace(/[a-z|A-Z|\ ]+/, '');
    
    if (numbers === '') {
      return 1;
    }
    
    const splitNumbers = numbers.split('/');

    if (splitNumbers.length > 2) {
      return undefined;
    }

    if (isNaN(splitNumbers[0])) {
      return undefined;
    }

    const num1 = Number(splitNumbers[0]);
    
    if (splitNumbers.length === 2) {
      /**
       * On input such as '5/kg', String.split('/') will return ['5', ''] 
       * and Number('') returns 0 therefore isNaN() will never be true.
       */
      if (splitNumbers[1] === '') {
        return undefined;
      }

      const num2 = Number(splitNumbers[1]);

      if (isNaN(num2)) {
        return undefined;
      }

      return num1 / num2;
    }

    return num1;
  };
  
  this.getUnit = function(input) {
    const lowerCaseUnit = input.replace(/[\d|\.|\/|\ ]+/, '').toLowerCase();

    switch (lowerCaseUnit) {
      case 'kg':
        return 'kg';
      case 'lbs':
        return 'lbs';
      case 'l':
        return 'L';
      case 'gal':
        return 'gal';
      case 'km':
        return 'km';
      case 'mi':
        return 'mi';
      default:
        return undefined;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    const lowerCaseUnit = initUnit.toLowerCase();

    switch (lowerCaseUnit) {
      case 'kg':
        return 'lbs';
      case 'lbs':
        return 'kg';
      case 'l':
        return 'gal';
      case 'gal':
        return 'L';
      case 'km':
        return 'mi';
      case 'mi':
        return 'km';
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function(unit) {
    const lowerCaseUnit = unit.toLowerCase();

    switch(lowerCaseUnit) {
      case 'kg':
        return 'kilograms';
      case 'lbs':
        return 'pounds';
      case 'l':
        return 'liters';
      case 'gal':
        return 'gallons';
      case 'km':
        return 'kilometers';
      case 'mi':
        return 'miles';
      default:
        // should not be possible to reach this
        return undefined;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    const lowerCaseUnit = initUnit.toLowerCase();
    let result;
    
    switch(lowerCaseUnit) {
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'gal':
        result = initNum * galToL;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      default:
        // should not be possible to reach this
        result = undefined;
    }
    
    // result.toFixed(5) returns string
    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
