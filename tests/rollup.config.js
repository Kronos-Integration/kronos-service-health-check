import multiEntry from 'rollup-plugin-multi-entry';

export default {
  input: 'tests/**/*-test.js',
  output: {
    file: 'build/bundle-test.js',
    format: 'cjs',
    sourcemap: true
  },
  external: ['ava', 'kronos-service', 'model-attributes', 'kronos-endpoint'],
  plugins: [multiEntry()]
};