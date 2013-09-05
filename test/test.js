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
});