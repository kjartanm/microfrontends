import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
//import replace from 'rollup-plugin-replace';
import svg from 'rollup-plugin-svg';


function stopDynamicImport () {
    return {
      name: 'stop-dynamic-import', // this name will show up in warnings and errors
      resolveDynamicImport ( source ) {
        return false
      }
    };
  }
  

export default {
    input: 'src/index.js',
    output: {
        file: 'public/login.app.js',
        format: 'esm'
    },
    plugins: [
        resolve(),
        stopDynamicImport (),
        commonjs(),
        svg()
    ]
}