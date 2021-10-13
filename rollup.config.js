/**
 * Bundle style files
 */
import postcss from 'rollup-plugin-postcss';

// import sass from 'rollup-plugin-sass';

// import scss from 'rollup-plugin-scss'

import autoprefixer from 'autoprefixer'

/**
 * transpile newer JS code for older JS browsers
 */
import babel from 'rollup-plugin-babel'; 

/**
 * Merges the enumerable properties of two or more objects deeply 
 */ 
import merge from 'deepmerge'; 

/**
 * Generate the config for SPA projects -  
 * 
 * inject the rollup output into a single index.html file, 
 * generate a service worker and load polyfills using feature detection
 */
import { createSpaConfig } from '@open-wc/building-rollup';

/**
 * Copy files and folders, with glob support
 */
import copy from 'rollup-plugin-copy';

/**
 * Load third party modules from node_modules
 */
import resolve from 'rollup-plugin-node-resolve';

/**
 * Transpile CommonJS to newer JS
 */
import commonjs from 'rollup-plugin-node-resolve';

/**
 * Minify generated es bundle
 */
import { terser } from 'rollup-plugin-terser';

/**
 * Convert .json files to ES6 modules
 */
import json from '@rollup/plugin-json';

// PostCSS plugins
/**
 * Allow Sass-Style variables
 */
import simplevars from 'postcss-simple-vars';

/**
 * Allows rules to be nested
 */
import nested from 'postcss-nested';

/**
 * Bundle of plugins that enables the most
 * current CSS syntax
 */
import cssnext from 'postcss-cssnext';

/**
 * Compresses and minifies CSS output, what UglifyJS is to JavaScript
 */
import cssnano from 'cssnano';

import path from 'path'

/**
 * Minify generated bundle
 */
// import uglify from 'rollup-plugin-uglify';


// import typescript from 'rollup-plugin-typescript2';

// import pkg from './package.json';
// import { eslint } from 'rollup-plugin-eslint';

// const inputClass = 'src/index.ts';
const inputHTML = './index.html';

// const typescriptPluginArgs = {
//   typescript: require('typescript'),
// };

; 
/**
 * Use to create a SPA (Single Page App), which
 * injects the rollup output into a single index.html file
 * 
 * If not creating a SPA, you can use createBasicConfig to set up regular JS to JS bundling.
 */
const baseConfig = createSpaConfig({
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false
});
 
export default merge(baseConfig, 
  {
    /**
     * any <script type="module"> inside will be bundled by rollup
     */
    input: inputHTML,
    output: {
      sourceMap: true
    },
    plugins: [
      copy({
        targets: [{ src: 'assets/**/*', dest: './dist/assets' }], // copy everything from assets folder
        flatten: false, // set flatten to false to preserve folder structure
      }),
      postcss({
        minimize: true,
        extract: path.resolve('dist/assets/main.css'),
        plugins: [
          autoprefixer(),
          simplevars(),
          nested(),
          cssnext({ warnForDuplicates: false, }),
          cssnano(),
        ],
        extensions: ['.css']
      }), 
      resolve({
        jsnext: true, // packages trying to ease the transition to newer JS
        main: true, // looks for the main file
        browser: true, // compile for the browser
      }),
      babel({
        babelrc: true,
        exclude: 'node_modules/**' // don't transpile someone else's code
      }),
      // replace({ // need to look into this more - this isn't actually doing anything right now
      //   ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      // }),
      // (process.env.NODE_ENV === 'production' && uglify()), // uglify for production mode
      terser(),
      commonjs(),
      json(),
      // scss(),
    //   sass({
    //     processor: css => postcss([autoprefixer({/**options here */})])
    //         .process(css)
    //         .then(result => result.css)
    // })
      // eslint({
      //   exclude: [
      //     'src/styles/**'
      //   ]
      // })
    ]
  }
);

// export default
//   [
//     {
//       input: inputClass,
//       output: 
//       [
//         {
//           file: pkg.module,
//           format: 'esm',
//           sourcemap: true,
//         }
//       ],
//       plugins: 
//       [
//         typescript({
//           ...typescriptPluginArgs,
//           tsconfig: './tsconfig.esm.json',
//         }),
//       ],
//     },
//     {
//       input: inputClass,
//       output: 
//       [
//         {
//           file: pkg.main,
//           format: 'cjs',
//           sourcemap: true,
//         }
//       ],
//       plugins: 
//       [
//         typescript({
//           ...typescriptPluginArgs,
//           tsconfig: './tsconfig.cjs.json',
//         }),
//       ]
//     }
//   ];
