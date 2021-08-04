/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Heading} Heading
 * @typedef {Heading['depth']} Depth
 * @typedef {import('mdast-util-to-markdown').Options} Extension
 *
 * @typedef {Partial<Record<Depth, {before?: number, after?: number}>>} Options
 */

/** @type {Options} */
const defaults = {2: {before: 2}}

/**
 * Plugin to adjust the gap between headings.
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function remarkHeadingGap(options = {}) {
  const data = this.data()
  const gaps = {...defaults, ...options}
  /** @type {Extension} */
  const headingGap = {
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
  }

  const extensions = /** @type {Extension[]} */ (
    // Other extensions
    /* c8 ignore next 2 */
    data.toMarkdownExtensions
      ? data.toMarkdownExtensions
      : (data.toMarkdownExtensions = [])
  )

  extensions.push(headingGap)

  /**
   * @param {Heading} node
   * @param {'before'|'after'} field
   * @returns {number}
   */
  function size(node, field) {
    const depth = node.depth
    const gap = depth in gaps ? gaps[depth] : {}
    return gap && field in gap ? gap[field] || 0 : 1
  }
}
