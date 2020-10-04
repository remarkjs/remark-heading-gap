let warningIssued

const defaults = {2: {before: 2}}

export default function (options) {
  const data = this.data()
  const gaps = {...defaults, ...options}
  const headingGap = {join: [betweenHeading]}

  /* istanbul ignore next - old remark. */
  if (
    !warningIssued &&
    this.Compiler &&
    this.Compiler.prototype &&
    this.Compiler.prototype.visitors
  ) {
    warningIssued = true
    console.warn(
      '[remark-heading-gap] Warning: please upgrade to remark 13 to use this plugin'
    )
  }

  /* istanbul ignore next - other extensions */
  if (!data.toMarkdownExtensions) data.toMarkdownExtensions = []

  data.toMarkdownExtensions.push(headingGap)

  function betweenHeading(left, right) {
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

  function size({depth}, field) {
    return depth in gaps && field in gaps[depth] ? gaps[depth][field] : 1
  }
}
