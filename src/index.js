import Pipeline from "./pipeline/Pipeline.js";
import ResumeAdapter from "./adapters/ResumeAdapter.js";

const pipeline = new Pipeline();
const candidates = await pipeline.processCSV("./input/candidates.csv");
const adapter = new ResumeAdapter();
const text = await adapter.extract("./input/Kanishk_Richhariya_Resume.pdf");
const candidate = adapter.buildCandidate(text);

console.log(candidate);
console.log(candidates);
