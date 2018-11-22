# remark-heading-gap

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Chat][chat-badge]][chat]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]

heading-gap support, without needing spaces, for [**remark**][remark].


## Installation

[npm][]:

```bash
npm install remark-heading-gap
```


## Example

Say we have a markdown file, `example.md`, that looks as follows:

```markdown
# remark-heading-gap

## Example

## API

### `remark.use(headingGap[, options])`

## Contributing
```

And our script, `example.js`, contains:

```javascript
const fs = require('fs')
const remark = require('remark')
const gap = require('remark-heading-gap')

const result = remark()
  .use(gap)
  .processSync(fs.readFileSync('example.md'))
  .toString()

console.log(result)
```

Now, running `node example` yields:

```markdown
# remark-heading-gap


## Example


## API

### `remark.use(headingGap[, options])`


## Contributing
```


## API

### `remark.use(headingGap[, options])`

remark-heading-gap ensures that automatically generated Markdown follows your
own rules for newlines in between section headings.
From personal experience, adding extra newlines helps to visualise breaks in
sections, especially when quickly scanning documentation.

#### `options.{1, 2, 3, 4, 5, 6}`

Pass a gap (Object, default: `{before: '\n', after: ''}` for `options.2`,
`{before: '', after: ''}` for all others)
Customise the gap that appears for up to 6 levels of heading; for example,
pass `{1: {before: '\n', after: '\n'}}` to double the gap for the first heading.
Note that both `before` and `after` accept a custom string so you can specify
`\r\n` instead if you choose; or add other presentational markers.


## Contribute

See [`contributing.md` in `remarkjs/remark`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.


## License

[MIT][license] © [Ben Briggs][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-heading-gap.svg

[build]: https://travis-ci.org/remarkjs/remark-heading-gap

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-heading-gap.svg

[coverage]: https://codecov.io/github/remarkjs/remark-heading-gap

[downloads-badge]: https://img.shields.io/npm/dm/remark-heading-gap.svg

[downloads]: https://www.npmjs.com/package/remark-heading-gap

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[license]: license

[author]: http://beneb.info

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/remarkjs/remark

[contributing]: https://github.com/remarkjs/remark/blob/master/contributing.md

[coc]: https://github.com/remarkjs/remark/blob/master/code-of-conduct.md
