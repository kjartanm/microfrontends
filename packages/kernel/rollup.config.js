import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
    input: 'src/index.js',
    output: {
        file: 'public/kernel.js',
        format: 'esm'
    },
    plugins: [
        replace({
            "process.env.NODE_ENV": "'production'"
        }),
        resolve(),
        commonjs()
    ]
}