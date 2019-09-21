const pro = process.env.NODE_ENV == 'production'
const dev = process.env.NODE_ENV == 'dev'

import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import livereload from 'live-server'

dev && livereload.start({ file: 'index.html', watch: ['dist/playground.js'] })

export default [
    {
      input: 'src/index.js',
      output: {
        file: 'dist/index.js',
        format: 'es'      
      },
      plugins: [
        babel(),
        resolve(),
        commonjs(),
        terser()
      ]
    },
    {
      input: 'src/playground.js',
      output: {
        file: 'dist/playground.js',
        format: 'es'      
      },
      plugins: [
        babel(),
        resolve(),
        commonjs(),
        terser()
      ]
    }
]