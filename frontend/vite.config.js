import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // important for exposing via ngrok
    allowedHosts: [
      "3752-157-33-205-199.ngrok-free.app", // your ngrok domain
    ],
  },
});
