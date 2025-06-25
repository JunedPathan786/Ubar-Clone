import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // important for exposing via ngrok
    allowedHosts: [
      "c58f-2409-4081-159f-1009-388d-4b96-bf37-22bc.ngrok-free.app", // your ngrok domain
    ],
  },
});
