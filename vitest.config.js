import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8', // Correct, 'v8' is one of the valid providers
      reporter: ['text', 'json', 'html'], // Correct, these are valid reporters
      all: true, // Optional: Ensures all files are included in coverage, even if not tested
      include: ['src/**/*.js', 'src/**/*.jsx'], // Optional: Specify files to include in coverage
      exclude: ['node_modules', 'tests', 'dist'], // Optional: Exclude files/folders from coverage
    },
  },
});
