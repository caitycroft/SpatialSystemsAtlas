import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // SparkJS and @react-three/fiber must share ONE copy of three, or Spark's
  // splat objects fail R3F's instanceof checks and render nothing.
  resolve: {
    dedupe: ["three", "@react-three/fiber", "react", "react-dom"],
  },
  optimizeDeps: {
    include: ["three", "@react-three/fiber", "@react-three/drei"],
  },
});
