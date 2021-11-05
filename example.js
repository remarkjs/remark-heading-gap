import {read} from 'to-vfile'
import {remark} from 'remark'
import remarkHeadingGap from './index.js'

main()

async function main() {
  const file = await remark()
    .use(remarkHeadingGap)
    .process(String(await read('example.md')))

  console.log(String(file))
}
