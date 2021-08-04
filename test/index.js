/**
 * @typedef {import('../index.js').Options} Options
 */

import fs from 'node:fs'
import path from 'node:path'
import test from 'tape'
import {remark} from 'remark'
import remarkHeadingGap from '../index.js'

const own = {}.hasOwnProperty

const base = path.join('test', 'fixtures')

/** @type {Record<string, Record<string, string>>} */
const specs = {}
const files = fs.readdirSync(base)
let index = -1

while (++index < files.length) {
  const contents = files[index]
  const parts = contents.split('.')

  if (!specs[parts[0]]) {
    specs[parts[0]] = {}
  }

  specs[parts[0]][parts[1]] = fs.readFileSync(
    path.join(base, contents),
    'utf-8'
  )
}

test('remark-heading-gap', (t) => {
  /** @type {string} */
  let name

  for (name in specs) {
    if (own.call(specs, name)) {
      const spec = specs[name]
      /** @type {Options|undefined} */
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
    }
  }

  t.end()
})
