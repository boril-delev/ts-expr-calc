import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        conditions: ["development"],
    },
    ssr: {
        resolve: {
            conditions: ["development"],
        },
    },
    test: {
        include: ["tests/**/*.test.ts"],
        passWithNoTests: true,
        coverage: {
            include: ["src/**/*.ts"],
        },
    },
});
