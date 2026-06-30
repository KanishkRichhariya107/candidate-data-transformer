import confidenceRules from "../config/confidenceRules.js";

class ConfidenceEngine {

    assign(candidate) {

        candidate.audit.confidence = {

            fullName: this.calculateConfidence(
                candidate.audit.provenance.fullName,
                candidate.audit.resolution.fullName,
                candidate.errors,
                "fullName"
            ),

            emails: this.calculateConfidence(
                candidate.audit.provenance.emails,
                null,
                candidate.errors,
                "email"
            ),

            phones: this.calculateConfidence(
                candidate.audit.provenance.phones,
                null,
                candidate.errors,
                "phone"
            ),

            location: this.calculateConfidence(
                candidate.audit.provenance.location,
                candidate.audit.resolution.location,
                candidate.errors,
                "location"
            ),

            skills: this.calculateConfidence(
                candidate.audit.provenance.skills,
                null,
                candidate.errors,
                "skills"
            ),

            education: this.calculateConfidence(
                candidate.audit.provenance.education,
                null,
                candidate.errors,
                "education"
            ),

            experience: this.calculateConfidence(
                candidate.audit.provenance.experience,
                null,
                candidate.errors,
                "experience"
            ),

            github: this.calculateConfidence(
                candidate.audit.provenance.github,
                candidate.audit.resolution.github,
                candidate.errors,
                "github"
            ),

            linkedin: this.calculateConfidence(
                candidate.audit.provenance.linkedin,
                candidate.audit.resolution.linkedin,
                candidate.errors,
                "linkedin"
            )

        };

        return candidate;
    }

    calculateConfidence(sources = [], resolution, errors, field) {

        if (!sources || sources.length === 0)
            return 0;

        let confidence = Math.max(
            ...sources.map(source => confidenceRules[source] || 0)
        );

        // Bonus if multiple sources support the field
        if (sources.length > 1)
            confidence += 0.03;

        // Bonus if values matched exactly
        if (resolution && resolution.reason === "matched")
            confidence += 0.02;

        // Slight penalty if a conflict had to be resolved
        if (resolution && resolution.reason === "source_priority")
            confidence -= 0.10;

        
        if (resolution && resolution.reason === "single_source")
            confidence -= 0.05;

        
        const hasError = errors.some(
            error => error.field === field
        );

        if (hasError)
            confidence -= 0.20;

        confidence = Math.max(0, Math.min(1, confidence));

        return Number(confidence.toFixed(2));
    }

}

export default ConfidenceEngine;