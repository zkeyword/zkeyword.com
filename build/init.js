const fs = require('fs')
const path = require('path')
const url = require('url')
let str = `export const url = '${process.env.NODE_ZKEYWORD_URL}'
export const host = '${url.parse(process.env.NODE_ZKEYWORD_URL).host}'
`
fs.writeFileSync(path.join(__dirname, '../src/server/utils/config.ts'), str)
