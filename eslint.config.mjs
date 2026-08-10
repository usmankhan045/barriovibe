import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/**
 * Flat config. eslint-config-next v16 ships flat-config arrays directly, so
 * there is no need for the FlatCompat shim that older setups required.
 */
const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**', 'assets/**', 'supabase/**'],
  },
];

export default config;
