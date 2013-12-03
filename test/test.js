describe('Custom Validation Methods', function(){
  var methods = require('custom-validation');
  var chai = require('chai');
  chai.should();

  it('should validate if a username is a customer number or an email address', function(){
    methods.username('foo@foo.com').should.be.true;
    methods.username('fooatfoo.com').should.be.false;
    methods.username('12345678').should.be.true;
    chai.assert( methods.username('') === undefined);
    chai.assert( methods.username(null) === undefined);
    chai.assert( methods.username(undefined) === undefined);
  });

  it('should validate a date of birth', function(){
    methods.dateofbirth('01/10/1980').should.be.true;
    methods.dateofbirth('1/10/1980').should.be.true;
    methods.dateofbirth('10/1/1980').should.be.true;
    methods.dateofbirth('01101980').should.be.false;
    methods.dateofbirth('32/10/1980').should.be.false;
    methods.dateofbirth('01/13/1980').should.be.false;
    methods.dateofbirth('01/31/1980').should.be.false;
    methods.dateofbirth('01/10/80').should.be.false;
    methods.dateofbirth('01/march/1980').should.be.false;
    chai.assert( methods.dateofbirth('') === undefined);
    chai.assert( methods.dateofbirth(null) === undefined);
    chai.assert( methods.dateofbirth(undefined) === undefined);
  });

  it('should validate that a person is over a particular age', function(){
    var fn = methods.olderThan(18);
    fn('01/01/1980').should.be.true;
    fn('01/01/2000').should.be.false;
    fn('01012000').should.be.false;
    fn('992000').should.be.true;
  });

  it('should validate that a person is under a particular age', function(){
    var fn = methods.youngerThan(18);
    fn('01/01/1980').should.be.false;
    fn('01/01/2000').should.be.true;
    fn('01012000').should.be.true;
    fn('992000').should.be.false;
  });

  it('should validate an international phone number', function(){
    methods.intlPhone('+61-555-555-555').should.be.true;
    methods.intlPhone('+61 555 555 555').should.be.true;
    methods.intlPhone('61 555 555 555').should.be.true;
    methods.intlPhone('+61-555-eggplant').should.be.false;
    methods.intlPhone('+eggplant-61-555').should.be.false;
    methods.intlPhone('string').should.be.false;
  });

  it('should remove digits from a string', function(){
    methods.splitNumber('+61-555-555-555').should.equal('61555555555');
    methods.splitNumber('61 555 555 555').should.be.equal('61555555555');
    methods.splitNumber('(*>_61 555-+=555 555\}{}~').should.be.equal('61555555555');
    methods.splitNumber('eggplant').should.be.equal("");
  });

  it('should validate that an entry is alphabetic only (allowing spaces, apostophes and hyphens)', function(){
    methods.alphabetic('Terry').should.be.true;
    methods.alphabetic('Terr-y').should.be.true;
    methods.alphabetic("Ter'ry").should.be.true;
    methods.alphabetic('Ter ry').should.be.true;
    methods.alphabetic('1Terry').should.be.false;
    methods.alphabetic('!Terry').should.be.false;
    methods.alphabetic('! Terry').should.be.false;
    methods.alphabetic('Terry@').should.be.false;
  });

  /**
   * http://en.wikipedia.org/wiki/Telephone_numbers_in_Australia#Geographic_numbers_2
   */
  it('should validate an Australian phone number', function(){

    // Using the split method above
    var val1 = "024999 6677 string";
    var val2 = "uity( )+0400222345";
    var val3 = "61 24st ring";
    methods.australianPhoneNumber(methods.splitNumber(val1)).should.be.true;
    methods.australianPhoneNumber(methods.splitNumber(val2)).should.be.true;
    methods.australianPhoneNumber(methods.splitNumber(val3)).should.be.false;

    // validate 49997878
    methods.australianPhoneNumber('39996677').should.be.true;
    methods.australianPhoneNumber('19996677').should.be.false;
    methods.australianPhoneNumber('29996677').should.be.false;
    methods.australianPhoneNumber('3999667').should.be.false;
    methods.australianPhoneNumber('399966777').should.be.false;
    methods.australianPhoneNumber('3w996677').should.be.false;

    // validate 0249997878
    methods.australianPhoneNumber('0249996677').should.be.true;
    methods.australianPhoneNumber('024999667').should.be.false;
    methods.australianPhoneNumber('02499966777').should.be.false;
    methods.australianPhoneNumber('0219996677').should.be.false;
    methods.australianPhoneNumber('0229996677').should.be.false;
    methods.australianPhoneNumber('1219996677').should.be.false;
    methods.australianPhoneNumber('4229996677').should.be.false;
    methods.australianPhoneNumber('02w9996677').should.be.false;

    // validate 61249997878
    methods.australianPhoneNumber('61249996677').should.be.true;
    methods.australianPhoneNumber('6124999667').should.be.false;
    methods.australianPhoneNumber('612499966777').should.be.false;
    methods.australianPhoneNumber('62249996677').should.be.false;
    methods.australianPhoneNumber('71249996677').should.be.false;
    methods.australianPhoneNumber('6124999w677').should.be.false;

    // validate 0422999787
    methods.australianPhoneNumber('0400222345').should.be.true;
    methods.australianPhoneNumber('040022234').should.be.false;
    methods.australianPhoneNumber('04002223444').should.be.false;
    methods.australianPhoneNumber('1400222345').should.be.false;
    methods.australianPhoneNumber('0400w22345').should.be.false;

    chai.assert( methods.australianPhoneNumber('') === undefined);
    chai.assert( methods.australianPhoneNumber(null) === undefined);
    chai.assert( methods.australianPhoneNumber(undefined) === undefined);
  });
});