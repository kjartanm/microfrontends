import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;
function stopDynamicImport() {
	return {
		name: 'stop-dynamic-import', // this name will show up in warnings and errors
		resolveDynamicImport(source) {
			return false
		}
	};
}
export default [
	{
		input: 'src/index.js',
		output: {
			sourcemap: true,
			format: 'esm',
			name: 'app',
			file: 'public/profile.app.js'
		},
		plugins: [
			stopDynamicImport (),
			svelte({
				// enable run-time checks when not in production
				dev: !production,
			}),
			resolve({
				browser: true,
				dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
			}),
			commonjs(),
			production && terser()
		],
		watch: {
			clearScreen: false
		}
	}, {
		input: 'src/header.js',
		output: {
			sourcemap: true,
			format: 'esm',
			name: 'app',
			file: 'public/header.app.js'
		},
		plugins: [
			stopDynamicImport (),
			svelte({
				// enable run-time checks when not in production
				dev: !production,
			}),
			resolve({
				browser: true,
				dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
			}),
			commonjs(),
			terser()
		],
		watch: {
			clearScreen: false
		}
	},
]
