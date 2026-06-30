class Candidate {
    constructor() {

        this.id = null;
        this.source=null;
        this.fullName = null;
        this.emails = [];
        this.phones = [];
        this.location = null;
        this.skills = [];
        this.education = [];
        this.experience = [];
        this.socialProfiles = {
            github: null,
            linkedin: null
        };
        this.audit = {
            confidence: {},
            provenance: {},
            resolution: {}
        };
        this.errors = [];
    }
}

export default Candidate;