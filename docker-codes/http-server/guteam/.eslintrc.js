module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
        'import/extensions': [
            'error',
            {
              js: 'never',
              jsx: 'never',
              ts: 'never',
              tsx: 'never',
            }
          ],
          'react/jsx-filename-extension': [
                'error',
            {
              extensions: ['.jsx', '.tsx'],
            }
          ],
          'react/react-in-jsx-scope': 'off',
          'no-void': [
                'error',
                {
                  allowAsStatement: true,
                }
              ]
  },
  settings: {
        'import/resolver': {
          // typescript: { project: './' },
          node: {
            paths: ['src'],
            extensions: ['.js', '.jsx', '.ts', '.tsx']
          }
        }
  
  }
};
