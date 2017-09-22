const rollup = require('rollup')
const vue = require('rollup-plugin-vue')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const eslint = require('rollup-plugin-eslint')
const uglify = require('rollup-plugin-uglify')
const postcss = require('rollup-plugin-postcss')
const compList = require('./components')
const minify = require('uglify-es').minify

compList.forEach(item => {
  let vueSettings = {}
  if (item.css) {
    vueSettings = {
      css: item.css,
      scss: {
        outputStyle: item.min ? 'compressed' : 'expanded'
      }
    }
  }
  var plugins = [
    eslint({
      throwError: true,
      exclude: 'node_modules/**'
    }),
    postcss(),
    vue(vueSettings),
    resolve({
      extensions: ['.js', '.vue']
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    })
  ]
  if (item.min) plugins.push(uglify({}, minify))

  rollup.rollup({
    input: item.entry,
    plugins
  }).then(bundle => {
    bundle.write({
      format: item.type,
      name: item.name,
      file: item.dist
    })
  }).catch((e) => {
    console.log(e)
    process.exit(1)
  })
})
