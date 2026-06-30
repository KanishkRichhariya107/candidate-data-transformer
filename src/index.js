import Pipeline from "./pipeline/Pipeline.js";
import fs from "fs";

const pipeline = new Pipeline();
const result = await pipeline.process("./input/candidates.csv","./input/Kanishk_Richhariya_Resume.pdf");
console.dir(result, { depth: null });
fs.writeFileSync(
    "./output/result.json",
    JSON.stringify(result, null, 2)
);

console.log("✅ Output saved to output/result.json");