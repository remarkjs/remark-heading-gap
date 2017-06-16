// Say our script, `example.js`, looks as follows:
var fs = require('fs');
var remark = require('remark');
var gap = require('./dist/index.js');

var markdown = fs.readFileSync('example.md')

var result = remark().use(gap).processSync(markdown);

console.log(result);

// And our markdown markdown file, `example.md`:
console.log('markdown', String(markdown));

// Now, running `node example` yields:
console.log('markdown', String(result));
