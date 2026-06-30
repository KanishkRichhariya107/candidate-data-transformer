class ProjectionEngine {

    project(candidate, config) {

        const output = {};

        for (const field of config.fields) {

            switch (field) {

                case "fullName":
                    output.fullName = candidate.fullName;
                    break;

                case "emails":
                    output.emails = candidate.emails;
                    break;

                case "phones":
                    output.phones = candidate.phones;
                    break;

                case "location":
                    output.location = candidate.location;
                    break;

                case "skills":
                    output.skills = candidate.skills;
                    break;

                case "education":
                    output.education = candidate.education;
                    break;

                case "experience":
                    output.experience = candidate.experience;
                    break;

                case "socialProfiles":
                    output.socialProfiles = candidate.socialProfiles;
                    break;

                case "audit":
                    output.audit = candidate.audit;
                    break;

            }

        }

        return output;

    }

}

export default ProjectionEngine;