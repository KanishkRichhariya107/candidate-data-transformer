import Candidate from "../models/Candidate.js";
import ConflictResolver from "./ConflictResolver.js";

class MergeEngine {
    constructor() {
        this.conflictResolver = new ConflictResolver();
    }
    merge(candidate1, candidate2) {

        const merged = new Candidate();

        merged.fullName = this.conflictResolver.resolve(
            candidate1.fullName,
            candidate2.fullName,
            candidate1,
            candidate2
        );

        merged.location = this.conflictResolver.resolve(
            candidate1.location,
            candidate2.location,
            candidate1,
            candidate2
        );

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

        merged.socialProfiles = {

        github: this.conflictResolver.resolve(
            candidate1.socialProfiles.github,
            candidate2.socialProfiles.github,
            candidate1,
            candidate2
        ),
        linkedin: this.conflictResolver.resolve(
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