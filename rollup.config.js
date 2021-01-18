import autoExternal from 'rollup-plugin-auto-external';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

const extensions = ['.ts', '.tsx'];

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/cjs/react-tablize.js',
            format: 'cjs'
        },
        {
            file: 'dist/es/react-tablize.js',
            format: 'es'
        }
    ],
    plugins: [
        autoExternal(),
        nodeResolve({
            extensions
        }),
        babel({
            extensions,
        })
    ]
};
