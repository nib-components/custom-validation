# custom-validation

[![Build Status](https://travis-ci.org/nib-components/custom-validation.png?branch=master)](https://travis-ci.org/nib-components/custom-validation)

  Custom validation methods

## Installation

    $ component install nib-components/custom-validation

## API

    var methods = require('custom-validation');
    methods.dateofbirth('24/12/1900'); // true
    methods.olderThan('24/12/2000', 50); // false

## License

  MIT
