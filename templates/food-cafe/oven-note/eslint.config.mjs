import {defineConfig,globalIgnores} from 'eslint/config';
import vitals from 'eslint-config-next/core-web-vitals';
import ts from 'eslint-config-next/typescript';
export default defineConfig([...vitals,...ts,globalIgnores(['.next/**','out/**','next-env.d.ts']),{rules:{'@next/next/no-img-element':'off'}}]);
