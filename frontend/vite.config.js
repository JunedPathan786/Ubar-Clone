import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // important for exposing via ngrok
    allowedHosts: [
      "d7d3-2409-4081-159f-1009-6d06-58c-f048-30a9.ngrok-free.app", // your ngrok domain
    ],
  },
});
