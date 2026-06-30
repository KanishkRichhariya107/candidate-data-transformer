import Candidate from "../models/Candidate.js";
import ConflictResolver from "./ConflictResolver.js";

class MergeEngine {
    constructor() {
        this.conflictResolver = new ConflictResolver();
    }

    collectSources(value1, value2, candidate1, candidate2) {
        const sources = [];
        if (value1) {
            sources.push(candidate1.source);
        }
        if (value2) {
            sources.push(candidate2.source);
        }
        return [...new Set(sources)];
    }

    collectArraySources(array1, array2, candidate1, candidate2) {

        const sources = [];

        if (array1.length) {
            sources.push(candidate1.source);
        }

        if (array2.length) {
            sources.push(candidate2.source);
        }

        return [...new Set(sources)];
    }
    merge(candidate1, candidate2) {

        const merged = new Candidate();

    const fullNameResult = this.conflictResolver.resolve(
        candidate1.fullName,
        candidate2.fullName,
        candidate1,
        candidate2
    );

    merged.fullName = fullNameResult.value;
    merged.audit.resolution.fullName = fullNameResult;

    const locationResult = this.conflictResolver.resolve(
        candidate1.location,
        candidate2.location,
        candidate1,
        candidate2
    );

    merged.location = locationResult.value;
    merged.audit.resolution.location = locationResult;

        merged.emails = [
            ...new Set([
                ...candidate1.emails,
                ...candidate2.emails
            ])
        ];

        merged.phones = [
            ...new Set([
                ...candidate1.phones,
                ...candidate2.phones
            ])
        ];

        merged.skills = [
            ...new Set([
                ...candidate1.skills,
                ...candidate2.skills
            ])
        ];

        merged.education = [
            ...candidate1.education,
            ...candidate2.education
        ];

        merged.experience = [
            ...candidate1.experience,
            ...candidate2.experience
        ];
        const githubResult = this.conflictResolver.resolve(
    candidate1.socialProfiles.github,
    candidate2.socialProfiles.github,
    candidate1,
    candidate2
);
const linkedinResult = this.conflictResolver.resolve(
    candidate1.socialProfiles.linkedin,
    candidate2.socialProfiles.linkedin,
    candidate1,
    candidate2
);

       merged.socialProfiles = {
    github: githubResult.value,
    linkedin: linkedinResult.value
};

merged.audit.resolution.github = githubResult;
merged.audit.resolution.linkedin = linkedinResult;

merged.audit.provenance = {

    fullName: this.collectSources(
        candidate1.fullName,
        candidate2.fullName,
        candidate1,
        candidate2
    ),

    emails: this.collectArraySources(
        candidate1.emails,
        candidate2.emails,
        candidate1,
        candidate2
    ),

    phones: this.collectArraySources(
        candidate1.phones,
        candidate2.phones,
        candidate1,
        candidate2
    ),

    location: this.collectSources(
        candidate1.location,
        candidate2.location,
        candidate1,
        candidate2
    ),

    skills: this.collectArraySources(
        candidate1.skills,
        candidate2.skills,
        candidate1,
        candidate2
    ),

    education: this.collectArraySources(
        candidate1.education,
        candidate2.education,
        candidate1,
        candidate2
    ),

    experience: this.collectArraySources(
        candidate1.experience,
        candidate2.experience,
        candidate1,
        candidate2
    ),

    github: this.collectSources(
        candidate1.socialProfiles.github,
        candidate2.socialProfiles.github,
        candidate1,
        candidate2
    ),

    linkedin: this.collectSources(
        candidate1.socialProfiles.linkedin,
        candidate2.socialProfiles.linkedin,
        candidate1,
        candidate2
    )

};
        return merged;
    }

}

export default MergeEngine;