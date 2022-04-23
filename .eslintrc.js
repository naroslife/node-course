module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['standard'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'linebreak-style': 0,
        indent: ['error', 4],
        'comma-dangle': ['error', 'only-multiline'],
        'space-before-function-paren': 0,
    },
}
