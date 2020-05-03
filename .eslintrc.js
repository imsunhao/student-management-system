module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.vue'],
  },
  plugins: ['@typescript-eslint', 'jest', 'vue', 'unused-imports'],
  env: {
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended',
    'plugin:vue/essential',
  ],
  rules: {
    'no-case-declarations': 'off',
    'no-debugger': 'warn',
    'no-empty': 'warn',
    'no-prototype-builtins': 'off',
    'prefer-spread': 'off',
    'jest/no-disabled-tests': 'off',
    'jest/no-export': 'off',
    'jest/no-standalone-expect': 'off',
    'unused-imports/no-unused-imports-ts': 'warn',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/prefer-regexp-exec': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false }],
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // 有 plugin unused-imports
    '@typescript-eslint/no-misused-promises': 'off', // 耗时太长
    'vue/no-parsing-error': [
      'error',
      {
        'control-character-in-input-stream': false, // 有一些很神奇的 script 内的报错
      },
    ],
  },
  globals: {
    __webpack_require__: 'readonly',
  },
}
