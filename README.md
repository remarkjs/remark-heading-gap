# [remark]-heading-gap [![Build Status](https://travis-ci.org/ben-eb/remark-heading-gap.svg?branch=master)][ci] [![NPM version](https://badge.fury.io/js/remark-heading-gap.svg)][npm] [![Dependency Status](https://gemnasium.com/ben-eb/remark-heading-gap.svg)][deps]

> Adjust the gap between headings.


## Install

With [npm](https://npmjs.org/package/remark-heading-gap) do:

```
npm install remark-heading-gap
```


## Example

```javascript
var remark = require('remark');
var gap = require('remark-heading-gap');
var markdown = '# remark-heading-gap\n\n## Example\n\n## API\n\n### remark.use(gap, [options])\n\n## Contributing';
var result = remark.use(gap).process(markdown);
```

Output:

```md
# remark-heading-gap


## Example


## API

### remark.use(gap, [options])


## Contributing
```


## API

remark-heading-gap ensures that automatically generated Markdown follows your
own rules for newlines in between section headings. From personal experience,
adding extra newlines helps to visualise breaks in sections, especially when
quickly scanning documentation.

### remark.use(gap, [options])

#### options

##### `1|2|3|4|5|6`

Type: `object`
Default: `{before: '', after: ''}` (_except_ `2`, where `before` is `\n`)

Customise the gap that appears for up to 6 levels of heading; for example,
pass `{1: {before: '\n', after: '\n'}}` to double the gap for the first heading.
Note that both `before` and `after` accept a custom string so you can specify
`\r\n` instead if you choose; or add other presentational markers.


## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.


## License

MIT © [Ben Briggs](http://beneb.info)

[ci]: https://travis-ci.org/ben-eb/remark-heading-gap

[deps]: https://gemnasium.com/ben-eb/remark-heading-gap

[npm]: http://badge.fury.io/js/remark-heading-gap

[remark]: https://github.com/wooorm/remark
