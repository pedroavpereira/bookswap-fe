import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,     
    coverage: {
      provider: 'v8', // You can use 'v8' or 'istanbul'
      reporter: ['text', 'json', 'html'], // Outputs coverage in text, json, and html formats
    },
  },
});
