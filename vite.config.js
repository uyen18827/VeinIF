import { defineConfig } from 'vite';
import strip from '@rollup/plugin-strip';
export default defineConfig({
    plugins: [
        {
            ...strip({
                include: [
                    '**/*.js',
                    '**/*.ts',
                ],
                functions: [
                    'console.*',
                ],
            }),
            apply: 'build',
        },
    ]
})