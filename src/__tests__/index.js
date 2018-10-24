import {readdirSync as directory, readFileSync as file} from 'fs'
import {join} from 'path'
import test from 'ava'
import remark from 'remark'
import plugin from '..'

const base = join(__dirname, 'fixtures')

const specs = directory(base).reduce((tests, contents) => {
  const parts = contents.split('.')
  if (!tests[parts[0]]) {
    tests[parts[0]] = {}
  }
  tests[parts[0]][parts[1]] = file(join(base, contents), 'utf-8')
  return tests
}, {})

Object.keys(specs).forEach(name => {
  const spec = specs[name]
  test(name, t => {
    t.deepEqual(
      remark()
        .use(plugin)
        .processSync(spec.fixture)
        .toString(),
      spec.expected
    )
  })
})
