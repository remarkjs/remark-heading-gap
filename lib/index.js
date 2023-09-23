/// <reference types="remark-stringify" />

/**
 * @typedef {import('mdast').Heading} Heading
 * @typedef {import('mdast').Root} Root
 *
 * @typedef {import('unified').Processor<undefined, undefined, undefined, Root>} Processor
 */

/**
 * @typedef Gap
 *   Gap between a heading.
 * @property {number | null | undefined} [after]
 *   Blank lines after a heading.
 * @property {number | null | undefined} [before]
 *   Blank lines before a heading.
 *
 * @typedef {Partial<Record<Rank, Gap | null | undefined>>} Options
 *   Configuration;
 *
 * @typedef {Heading['depth']} Rank
 *   Heading rank.
 */

/** @type {Readonly<Options>} */
const defaults = {2: {before: 2}}

/**
 * Adjust the gap between headings.
 *
 * There are no blank lines added if a heading is the first or last child of
 * the document, list item, or block quote.
 * For example, pass `{1: {before: 2, after: 2}}` to add two blank lines before
 * and after the main heading.
 * You can also set values to `0` to not add blank lines.
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
export default function remarkHeadingGap(options) {
  // @ts-expect-error: TS is wrong about `this`.
  // eslint-disable-next-line unicorn/no-this-assignment
  const self = /** @type {Processor} */ (this)
  const data = self.data()
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = [])
  const gaps = {...defaults, ...options}

  toMarkdownExtensions.push({
    join: [
      (left, right) => {
        if (left.type === 'heading') {
          return Math.max(
            size(left, 'after'),
            left.type === right.type ? size(right, 'before') : 0
          )
        }

        if (right.type === 'heading') {
          return size(right, 'before')
        }
      }
    ]
  })

  /**
   * @param {Heading} node
   * @param {'after' | 'before'} field
   * @returns {number}
   */
  function size(node, field) {
    const depth = node.depth
    const gap = depth in gaps ? gaps[depth] : {}
    return gap && field in gap ? gap[field] || 0 : 1
  }
}
