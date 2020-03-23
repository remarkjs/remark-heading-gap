const blank = '\n'

const defaults = {
  2: {before: blank, after: ''}
}

export default function (options) {
  const gaps = {...defaults, ...options}
  const {visitors} = this.Compiler.prototype
  const {heading} = visitors

  visitors.heading = headingGap

  function headingGap(node) {
    const gap = gaps[node.depth] || {}

    return (gap.before || '') + heading.call(this, node) + (gap.after || '')
  }
}
