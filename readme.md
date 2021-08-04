# remark-heading-gap

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to adjust the gap between headings.

## Important!

This plugin is affected by the new parser in remark
([`micromark`](https://github.com/micromark/micromark),
see [`remarkjs/remark#536`](https://github.com/remarkjs/remark/pull/536)).
Use version 3 while you’re still on remark 12.
Use version 4 for remark 13+.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install remark-heading-gap
```

## Use

Say we have a Markdown file, `example.md`, that looks as follows:

```markdown
# remark-heading-gap

## Example

## API

### `remark.use(headingGap[, options])`

## Contributing
```

And our module, `example.js`, contains:

```js
import fs from 'node:fs'
import {remark} from 'remark'
import remarkHeadingGap from 'remark-heading-gap'

const result = remark()
  .use(remarkHeadingGap)
  .processSync(fs.readFileSync('example.md'))
  .toString()

console.log(result)
```

Now, running `node example` yields:

```markdown
# remark-heading-gap


## Example


## API

This package exports no identifiers.
The default export is `remarkHeadingGap`.

### `unified().use(remarkHeadingGap[, options])`


## Contributing
```

## API

### `remark().use(headingGap[, options])`

Adjust the gap between headings.
Ensures that automatically generated Markdown follows your own rules for blank
lines between section headings.
From personal experience, adding extra newlines helps to visualize breaks in
sections, especially when quickly scanning documentation.

#### `options.{1, 2, 3, 4, 5, 6}`

Pass a gap (Object, default: `{before: 2, after: 1}` for `options.2`,
`{before: 1, after: 1}` for all others)
Customize the gap that appears for up to 6 levels of heading; for example, pass
`{1: {before: 2, after: 2}}` to add two blank lines before and after the first
heading.
You can also set values to `0`, to not add a blank line.
There are no blank lines added if a heading is the first or last child of the
document, list item, or block quote.

## Security

Use of `remark-heading-gap` does not involve [**rehype**][rehype]
([**hast**][hast]) or user content so there are no openings for
[cross-site scripting (XSS)][xss] attacks.

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Ben Briggs][author]

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-heading-gap/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-heading-gap/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-heading-gap.svg

[coverage]: https://codecov.io/github/remarkjs/remark-heading-gap

[downloads-badge]: https://img.shields.io/npm/dm/remark-heading-gap.svg

[downloads]: https://www.npmjs.com/package/remark-heading-gap

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-heading-gap.svg

[size]: https://bundlephobia.com/result?p=remark-heading-gap

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: http://beneb.info

[remark]: https://github.com/remarkjs/remark

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast
