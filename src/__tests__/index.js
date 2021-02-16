import {readdirSync as directory, readFileSync as file} from 'fs'
import path from 'path'
import test from 'ava'
import remark from 'remark'
import plugin from '../index.js'

const base = path.join(__dirname, 'fixtures')

const specs = {}

directory(base).forEach((contents) => {
  const parts = contents.split('.')
  if (!specs[parts[0]]) {
    specs[parts[0]] = {}
  }

  specs[parts[0]][parts[1]] = file(path.join(base, contents), 'utf-8')
})

Object.keys(specs).forEach((name) => {
  const spec = specs[name]
  let options

  if (name === 'three-zero') {
    options = {3: {before: 0, after: 0}}
  }

  test(name, (t) => {
    t.deepEqual(
      remark().use(plugin, options).processSync(spec.fixture).toString(),
      spec.expected
    )
  })
})
