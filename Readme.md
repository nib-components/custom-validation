# custom-validation

  Custom validation methods

## Installation

    $ component install nib-components/custom-validation

## API

    var methods = require('custom-validation');
    methods.dateofbirth('24/12/1900'); // true
    methods.olderThan('24/12/2000', 50); // false

## License

  MIT
