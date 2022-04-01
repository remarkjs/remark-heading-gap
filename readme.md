# remark-heading-gap

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[remark][]** plugin to adjust the gap between headings in markdown.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(remarkHeadingGap[, options])`](#unifieduseremarkheadinggap-options)
*   [Examples](#examples)
    *   [Example: blank lines around first/last headings](#example-blank-lines-around-firstlast-headings)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin that lets you change the gap
(number of blank lines) between headings and surrounding text when formatting
markdown.

**unified** is a project that transforms content with abstract syntax trees
(ASTs).
**remark** adds support for markdown to unified.
This is a remark plugin that configures the markdown serializer
(`remark-stringify`).

## When should I use this?

This project is useful when you want to adjust the gap around headings when
formatting markdown.
For example, when you want two blank lines before headings with a rank of 2
(`## Like so`).
From personal experience, adding extra blank lines helps visualize breaks in
sections, especially when quickly scanning documentation.
The default when serializing markdown with `remark-stringify` is to always
but a single blank line between blocks (headings, paragraphs, lists, code, etc).

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install remark-heading-gap
```

In Deno with [`esm.sh`][esmsh]:

```js
import remarkHeadingGap from 'https://esm.sh/remark-heading-gap@5'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import remarkHeadingGap from 'https://esm.sh/remark-heading-gap@5?bundle'
</script>
```

## Use

Say we have a markdown file `example.md` that looks as follows:

```markdown
# remark-heading-gap
## Example
## API
### `unified().use(remarkHeadingGap[, options])`
## Contributing
```

And our module `example.js` contains:

```js
import {read} from 'to-vfile'
import {remark} from 'remark'
import remarkHeadingGap from 'remark-heading-gap'

main()

async function main() {
  const file = await remark()
    .use(remarkHeadingGap)
    .process(await read('example.md'))

  console.log(String(file))
}
```

Now running `node example.js` yields:

```markdown
# remark-heading-gap


## Example


## API

### `unified().use(remarkHeadingGap[, options])`


## Contributing
```

## API

This package exports no identifiers.
The default export is `remarkHeadingGap`.

### `unified().use(remarkHeadingGap[, options])`

adjust the gap between headings in markdown.

###### `options.{1, 2, 3, 4, 5, 6}`

Define heading ranks to gaps (`Record<1 | 2 | 3 | 4 | 5 | 6, Gap>`, default:
`{2: {before: 2, after: 1}}`).
`Gap` is defined as `{before?: number, after?: number}`.
There are no blank lines added if a heading is the first or last child of the
document, list item, or block quote.

For example, pass `{1: {before: 2, after: 2}}` to add two blank lines before and
after the main heading.
You can also set values to `0` to not add blank lines.

## Examples

### Example: blank lines around first/last headings

This example shows that there are no blank lines added before the first and
after the last heading in a container.
Assuming we had `example.md` from before and changed it to contain this:

```markdown
# Alpha

Bravo charlie.

> ## Delta
>
> Echo foxtrott.
>
> ## Golf
```

Then configuring this plugin in `example.js` like so:

```diff
@@ -6,7 +6,10 @@ main()

 async function main() {
   const file = await remark()
-    .use(remarkHeadingGap)
+    .use(remarkHeadingGap, {
+      1: {before: 3, after: 3},
+      2: {before: 2, after: 2}
+    })
     .process(String(await read('example.md')))

   console.log(String(file))
```

Then when running `node example.js` we’d get:

```markdown
# Alpha



Bravo charlie.

> ## Delta
>
>
> Echo foxtrott.
>
>
> ## Golf
```

## Types

This package is fully typed with [TypeScript][].
It exports `Options` and `Gap` types, which specify the interfaces of the
accepted options.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

This plugin works with `remark-stringify` version 9+ (`remark` version 13+).
Version 3 of this plugin worked with `remark-stringify` version 8- (`remark`
version 12-).

## Security

Use of `remark-heading-gap` does not involve **[rehype][]** (**[hast][]**) or
user content so there are no openings for [cross-site scripting (XSS)][xss]
attacks.

## Related

*   [`remarkjs/remark-normalize-headings`](https://github.com/remarkjs/remark-normalize-headings)
    — make sure there is a single top level heading in a document by adjusting
    heading ranks accordingly

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

[esmsh]: https://esm.sh

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: http://beneb.info

[remark]: https://github.com/remarkjs/remark

[unified]: https://github.com/unifiedjs/unified

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[typescript]: https://www.typescriptlang.org

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast
