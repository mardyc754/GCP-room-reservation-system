import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tsconfigPaths()],
    preview: {
      port: 3000,
      strictPort: true,
    },
    define: {
      "process.env.BACKEND_BASE_URL": JSON.stringify(env.BACKEND_BASE_URL),
    },
    server: {
      port: 3000,
      strictPort: true,
      host: "0.0.0.0",
    },
  };
});
