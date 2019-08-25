module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jquery': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'sourceType': 'module'
  },
  'rules': {
    'no-console': 1,
    'indent': ['error', 2, {
      'VariableDeclarator': {
        'var': 2,
        'let': 2,
        'const': 3
      }
    }],
    'block-scoped-var': 'error',
    'consistent-return': 'error',
    'dot-notation': 'error',
    'eqeqeq': 'error',
    'no-empty-function': 'error',
    'no-global-assign': 'error',
    'no-multi-spaces': 'error',
    'no-self-compare': 'error',
    'vars-on-top': 'error',
    'strict': ['error', 'global'],
    'global-require': 'error',
    'handle-callback-err': 'error',
    'no-mixed-requires': 'error',
    'no-new-require': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': 'error',
    'brace-style': 'error',
    'camelcase': 'error',
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'func-name-matching': 'error',
    'key-spacing': [2, {
      'singleLine': {
        'beforeColon': false,
        'afterColon': true
      }
    }],
    'keyword-spacing': 'error',
    'line-comment-position': ['error', {
      'position': 'above'
    }],
    'lines-around-comment': ['error', {
      'beforeBlockComment': true,
      'beforeLineComment': false,
      'allowBlockStart': true,
      'allowObjectStart': true,
      'allowArrayStart': true
    }],
    'lines-around-directive': ['error', 'always'],
    'new-cap': 'error',
    'new-parens': 'error',
    'newline-per-chained-call': ['error', {
      'ignoreChainWithDepth': 4
    }],
    'no-inline-comments': 'error',
    'no-lonely-if': 'error',
    'no-mixed-operators': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-assign': 'error',
    'no-multiple-empty-lines': ['error', {
      'max': 2,
      'maxEOF': 1
    }],
    'no-nested-ternary': 'error',
    'no-new-object': 'error',
    'no-plusplus': ['error', {
      'allowForLoopAfterthoughts': true
    }],
    'no-tabs': 'error',
    'no-trailing-spaces': 'error',
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': ['error', 'below'],
    'object-curly-spacing': 'off',
    'object-property-newline': 'error',
    'operator-assignment': ['error', 'always'],
    'operator-linebreak': ['error', 'none'],
    'quote-props': ['error', 'consistent'],
    'quotes': ['error', 'single', {
      'avoidEscape': true
    }],
    'semi': ['error', 'always'],
    'semi-spacing': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': ['error', 'always', {
      'block': {
        'exceptions': ['-']
      }
    }],
    'template-tag-spacing': 'error',
    'arrow-body-style': 0,
    'arrow-spacing': 'error',
    'no-confusing-arrow': 'error',
    'no-const-assign': 'error',
    'no-duplicate-imports': 'error',
    'prefer-const': 'error',
    'object-shorthand': 'error',
    'no-var': 'error'
  }
};
