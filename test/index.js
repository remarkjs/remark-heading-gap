const fs = require('fs')
const path = require('path')
const test = require('tape')
const remark = require('remark')
const plugin = require('../dist/index.js')

const base = path.join(__dirname, 'fixtures')

const specs = {}

fs.readdirSync(base).forEach((contents) => {
  const parts = contents.split('.')
  if (!specs[parts[0]]) {
    specs[parts[0]] = {}
  }

  specs[parts[0]][parts[1]] = fs.readFileSync(
    path.join(base, contents),
    'utf-8'
  )
})

test('remark-heading-gap', (t) => {
  Object.keys(specs).forEach((name) => {
    const spec = specs[name]
    let options

    if (name === 'three-zero') {
      options = {3: {before: 0, after: 0}}
    }

    t.deepEqual(
      remark().use(plugin, options).processSync(spec.fixture).toString(),
      spec.expected,
      name
    )
  })

  t.end()
})
