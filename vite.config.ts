import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      "styled-components": 'src/styled-components',
      config: 'src/config',
      pages: 'src/pages',
      containers: 'src/containers',
      router: 'src/router',
      components: 'src/components',
      assets: 'src/assets',
      helpers: 'src/helpers',
      hooks: 'src/hooks',
      contexts: 'src/contexts',
      types: 'src/types',
      utils: 'src/utils',
    }
  }
})
