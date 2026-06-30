import fs from "fs";
import csv from "csv-parser";
import CSVAdapter from "../adapters/CSVAdapter.js";
import ResumeAdapter from "../adapters/ResumeAdapter.js";
import CandidateValidator from "../validators/CandidateValidator.js";
import CandidateNormalizer from "../normalizers/CandidateNormalizer.js";
import EntityResolver from "../core/EntityResolver.js";
import MergeEngine from "../core/MergeEngine.js";
import ConfidenceEngine from "../core/ConfidenceEngine.js";
import ProjectionEngine from "../core/ProjectionEngine.js";
import outputConfig from "../config/outputConfig.json" with { type: "json" };
class Pipeline {

    constructor() {

        this.csvAdapter = new CSVAdapter();
        this.resumeAdapter = new ResumeAdapter();
        this.validator = new CandidateValidator();
        this.normalizer = new CandidateNormalizer();
        this.entityResolver = new EntityResolver();
        this.mergeEngine = new MergeEngine();
        this.confidenceEngine = new ConfidenceEngine();
        this.projectionEngine = new ProjectionEngine();

    }

    async process(csvFilePath, resumeFilePath) {
        
        const csvCandidates = await this.processCSV(csvFilePath);
        if (csvCandidates.length === 0) {
            throw new Error("No candidates found in CSV.");
        }

        const resumeText = await this.resumeAdapter.extract(resumeFilePath);

        let resumeCandidate = this.resumeAdapter.buildCandidate(resumeText);
        this.validator.validate(resumeCandidate);
        this.normalizer.normalize(resumeCandidate);

for (const csvCandidate of csvCandidates) {
        this.validator.validate(csvCandidate);
        this.normalizer.normalize(csvCandidate);
    const sameCandidate =
        this.entityResolver.isSameCandidate(
            csvCandidate,
            resumeCandidate
        );

    if (sameCandidate) {

        let mergedCandidate =
            this.mergeEngine.merge(
                csvCandidate,
                resumeCandidate
            );

        mergedCandidate =
            this.confidenceEngine.assign(
                mergedCandidate
            );

const projectedCandidate =
    this.projectionEngine.project(
        mergedCandidate,
        outputConfig
    );

return {
    matched: true,
    candidate: projectedCandidate
};
    }

}

return {
    matched: false,
    candidates: [
        resumeCandidate,
        ...csvCandidates
    ]
};
    }

    processCSV(filePath) {

        return new Promise((resolve, reject) => {
            const candidates = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", (row) => {
                    let candidate =
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