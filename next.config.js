const withStylus = require('@zeit/next-stylus')
const obj = withStylus({cssModules: false})
obj.distDir = '.next'
module.exports = obj