// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const external = ['react', 'react-dom', 'd3'];

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.js',     format: 'cjs', sourcemap: true },
      { file: 'dist/index.esm.js', format: 'esm', sourcemap: true }
    ],
    external,
    plugins: [resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' })]
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external,
    plugins: [dts()]
  }
];
