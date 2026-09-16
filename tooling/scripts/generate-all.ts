import { runPipeline } from "../compiler/src/pipeline";

runPipeline()
  .then(() => {
    console.log("🎉 All packages and generated outputs built successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("💥 Build pipeline failed:", err);
    process.exit(1);
  });
