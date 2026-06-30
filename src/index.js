import Pipeline from "./pipeline/Pipeline.js";

const pipeline = new Pipeline();
const candidates = await pipeline.processCSV("./input/candidates.csv");
console.log(candidates);