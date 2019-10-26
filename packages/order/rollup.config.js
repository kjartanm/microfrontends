import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

function stopDynamicImport () {
    return {
      name: 'stop-dynamic-import', 
      resolveDynamicImport ( source ) {
        return false
      }
    };
  }

export default {
    input: 'src/index.js',
    output: {
        file: 'public/order.app.js',
        format: 'esm'
    },
    plugins: [
        stopDynamicImport (),
         replace({
            "process.env.NODE_ENV": "'production'"
        }),
        resolve({
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                'vuex$': 'vuex/dist/vuex.esm.js'
            },
            extensions: ['*', '.js', '.vue', '.json']
        }),
        vue(/* options */),
        commonjs(),
        terser(),
    ]
}