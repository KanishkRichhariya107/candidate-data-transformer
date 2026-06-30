import fs from "fs";
import csv from "csv-parser";
import CSVAdapter from "../adapters/CSVAdapter.js";
class Pipeline {
    constructor() {
        this.csvAdapter = new CSVAdapter();
    }
    processCSV(filePath) {
        return new Promise((resolve, reject) => {
            const candidates = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", (row) => {
                    const candidate =
                        this.csvAdapter.buildCandidate(
                            this.csvAdapter.extract(row)
                        );
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