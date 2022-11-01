import { defineConfig } from 'vite'
import path from 'path';
import checker from 'vite-plugin-checker'

export default defineConfig({
    plugins: [checker({ typescript: true })],
    resolve: {
        alias: {
            "@app": path.resolve(__dirname, './src')
        }
    }
})