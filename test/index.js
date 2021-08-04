import fs from 'fs'
import path from 'path'
import test from 'tape'
import {remark} from 'remark'
import remarkHeadingGap from '../index.js'

const base = path.join('test', 'fixtures')

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
      remark()
        .use(remarkHeadingGap, options)
        .processSync(spec.fixture)
        .toString(),
      spec.expected,
      name
    )
  })

  t.end()
})
