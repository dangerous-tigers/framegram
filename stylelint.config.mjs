/** @type {import('stylelint').Config} */

export default {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'no-descending-specificity': null,
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
    'keyframes-name-pattern': '^[a-z][a-zA-Z0-9]+$',
    'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
  },
};
