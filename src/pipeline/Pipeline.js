import fs from "fs";
import csv from "csv-parser";
import CSVAdapter from "../adapters/CSVAdapter.js";
import CandidateValidator from "../validators/CandidateValidator.js";
import CandidateNormalizer from "../normalizers/CandidateNormalizer.js";
class Pipeline {
    constructor() {
        this.csvAdapter = new CSVAdapter();
        this.validator = new CandidateValidator();
        this.normalizer = new CandidateNormalizer();
    }
    processCSV(filePath) {
        return new Promise((resolve, reject) => {
            const candidates = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", (row) => {
                    const candidate =this.csvAdapter.buildCandidate(this.csvAdapter.extract(row));

                    const validatedCandidate =this.validator.validate(candidate);
                        
                    const normalizedCandidate =this.normalizer.normalize(validatedCandidate);

                    candidates.push(candidate);
                })
                .on("end", () => {
                    resolve(candidates);
                })
                .on("error", reject);
        });
    }
}
export default Pipeline;