import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import boundariesPlugin from 'eslint-plugin-boundaries'

export default tseslint.config(
  { ignores: ['**/dist/**', '**/node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      import: importPlugin,
      boundaries: boundariesPlugin,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      'boundaries/elements': [
        { type: 'app', pattern: ['ui-platform/App/*'] },
        { type: 'shared', pattern: ['ui-platform/Shared/*'] },
        { type: 'domain', pattern: ['domains/*'] },
      ],
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import/no-relative-packages': 'error',

      // Shared must not import from domains or app
      // Domains can only import from shared — cross-domain interaction is URL-driven
      // App can import from everything
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: { type: 'app' }, allow: { to: { type: ['app', 'shared', 'domain'] } } },
            { from: { type: 'domain' }, allow: { to: { type: 'shared' } } },
            { from: { type: 'shared' }, allow: { to: { type: 'shared' } } },
          ],
        },
      ],

      // Prevent deep imports into packages — force use of barrel index.ts
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@rpeng/billing/*', '@rpeng/inventory/*', '@rpeng/shared/*'],
              message: 'Import from the package root only (e.g., "@rpeng/billing"), not from internal paths.',
            },
          ],
        },
      ],
    },
  },
)
