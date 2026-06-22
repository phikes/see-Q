import { defineConfig } from 'vite'
import react, { reactCompilerPreset  } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [
        reactCompilerPreset(),
      ],
      plugins: [
        [
          "formatjs",
          {
            "idInterpolationPattern": "[sha512:contenthash:base64:6]",
            "ast": true

          }
        ]
      ]
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
