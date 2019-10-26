import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';


function stopDynamicImport() {
    return {
        name: 'stop-dynamic-import', // this name will show up in warnings and errors
        resolveDynamicImport(source) {
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
        stopDynamicImport(),
        commonjs(),
        terser(),
    ]
}