var remark = require('remark');
var gap = require('./dist/index.js');

var markdown = '# remark-heading-gap\n\n## Example\n\n## API\n\n### remark.use(gap, [options])\n\n## Contributing';

var result = remark().use(gap).processSync(markdown);

// Output:
console.log('md', result.contents);
