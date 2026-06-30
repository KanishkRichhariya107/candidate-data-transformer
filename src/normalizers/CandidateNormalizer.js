import skillMappings from "../config/skillMappings.js";

class CandidateNormalizer {
    normalize(candidate) {
        this.normalizeName(candidate);
        this.normalizeEmails(candidate);
        this.normalizePhones(candidate);
        this.normalizeSkills(candidate);
        return candidate;
    }
    normalizeName(candidate) {
        if(candidate.fullName){
            candidate.fullName = candidate.fullName
                .trim()
                .replace(/\s+/g, " ");
        }
    }
    normalizeEmails(candidate){
        candidate.emails = candidate.emails.map(email =>
            email.trim().toLowerCase()
        );
    }
    normalizePhones(candidate){
        candidate.phones = candidate.phones.map(phone =>
            phone.replace(/[\s-]/g, "")
        );
    }
    normalizeSkills(candidate) {
    candidate.skills = [
        ...new Set(
            candidate.skills.map(skill => {
                const normalizedSkill = skill.trim().toLowerCase();
                return skillMappings[normalizedSkill] || skill.trim();
            })
        )
    ];

}
}

export default CandidateNormalizer;