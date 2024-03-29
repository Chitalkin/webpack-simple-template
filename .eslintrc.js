module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        // enable additional rules
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'prettier/prettier': ['error', { singleQuote: true }],
    },
};
