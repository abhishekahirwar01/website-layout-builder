// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/website-layout-builder/", // Make sure this matches your repo name
  plugins: [react()],
});
