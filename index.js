var type = require('type');
var methods = require('validation-methods');
var moment = require('moment');

/*
  These methods are the validation methods
  that are available in the forms. Addding a new
  validation method is as easy as exporting another
  function. The function must be lowercase as the
  backend likes to lower case all attributes on HTML
  elements so when we try to do validation via data
  attributes it will lowercase them.
 */

var patterns = {
  dateofbirth: /^\d{1,2}\/\d{1,2}\/\d{4}$/,
  alphabetic: /[a-zA-Z\-\']+/,
  intlPhone: /^[0-9\-\+ ]+$/,
};

/**
 * Username is a customer number or an email address
 * @param  {String} val
 * @return {Boolean}
 */
exports.username = function(val) {
  if( val ) {
    if(val.indexOf('@') === -1) {
      return methods.number(val);
    }
    else {
      return methods.email(val);
    }
  }
};

/**
 * Simple date format checker. Most of the forms
 * on the site use this style for dates.
 * @param  {String} val
 * @return {Boolean}
 */
exports.dateofbirth = function(val) {
  if(val) {
    return patterns.dateofbirth.test(val) && moment(val, 'DD/MM/YYYY').isValid();
  }
};

/**
 * Make sure a person is over an age
 * @param  {String} val
 * @param {Number} age The age to be over
 * @return {Boolean}
 */
exports.olderThan = function(age) {
  return function(val, data) {
    if(age) {
      var birthYear = moment(val, 'DD/MM/YYYY');
      return moment().diff(birthYear, 'years', true) >= age;
    }
  };
};

/**
 * Make sure a person is over an age
 * @param  {String} val
 * @param {Number} age The age to be over
 * @return {Boolean}
 */
exports.youngerThan = function(age) {
  return function(val, data) {
    if(age) {
      var birthYear = moment(val, 'DD/MM/YYYY');
      return moment().diff(birthYear, 'years', true) <= age;
    }
  };
};

/**
 * Check if a string is alphabetic (spaces and apostrophies included)
 * @param  {String} val
 * @return {Boolean}
 */
exports.alphabetic = function(val) {
  if(val) {
    return type(val) === 'string' && patterns.alphabetic.test(val);
  }
};

/**
 * Check is string matches internation phone pattern
 * @param  {String} val
 * @return string
 */
exports.intlPhone = function(val) {
  if(val) {
    return type(val) === 'string' && patterns.intlPhone.test(val);
  }
};

/**
 * Split a string and get any numbers
 * @param  {String} val
 * @return string
 */
exports.splitNumber = function(val){
  if(val){
    var split = /\d+/g;
    var arr = val.match(split);
    var str = "";

    if (arr) {
      for(var i=0; i<arr.length; i++){
        str += arr[i];
      }
    }

    return str;
  }
}