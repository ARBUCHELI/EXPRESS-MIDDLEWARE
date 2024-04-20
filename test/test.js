console.log = function() {};
const fs = require('fs');
const expect = require('chai').expect;
const Structured = require('structured');

describe('', function() {
  const code = fs.readFileSync('app.js', 'utf8');
  it('', function() {
    const logMatcher = /app\.(get|post|put|delete)\([\s\S]+?logRequest\(([\s\S]+?)\)/g;
    const codeMatches = code.match(logMatcher);
    expect(codeMatches.length, 'Did you use logRequest at the beginning of all the route callbacks?').to.equal(7);

    const shouldNotMatchStructGet = function() {
      app.$method(_, (req, res, next) => {
        console.log('GET Request Received');
      });
    };

    const shouldNotMatchStructPut = function() {
      app.$method(_, (req, res, next) => {
        console.log('PUT Request Received');
      });
    };

    const shouldNotMatchStructPost = function() {
      app.$method(_, (req, res, next) => {
        console.log('POST Request Received');
      });
    };

    const shouldNotMatchStructDelete = function() {
      app.$method(_, (req, res, next) => {
        console.log('DELETE Request Received');
      });
    };

    const shouldNotMatch = [
      Structured.match(code, shouldNotMatchStructGet),
      Structured.match(code, shouldNotMatchStructPut),
      Structured.match(code, shouldNotMatchStructPost),
      Structured.match(code, shouldNotMatchStructDelete),
    ].every(response => response !== false);

    expect(shouldNotMatch, 'Did you remove all the redundant `console.log` statements?').to.be.false;
    
  });
});