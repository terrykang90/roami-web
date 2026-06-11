import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// tsconfig의 "@/*" → "./src/*" alias를 vitest에도 반영 (Next는 자체 처리).
export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
