class CandidateValidator {

    validate(candidate) {

        this.validateName(candidate);
        this.validateEmails(candidate);
        this.validatePhones(candidate);
        this.validateSkills(candidate);

        return candidate;
    }

    validateName(candidate) {

        if (!candidate.fullName || candidate.fullName.trim() === "") {

            candidate.errors.push({
                field: "fullName",
                value: candidate.fullName,
                message: "Candidate name is missing."
            });

        }

    }

    validateEmails(candidate) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        candidate.emails.forEach(email => {

            if (!emailRegex.test(email)) {

                candidate.errors.push({
                    field: "email",
                    value: email,
                    message: "Invalid email format."
                });

            }

        });

    }

    validatePhones(candidate) {

        const phoneRegex = /^[+]?[0-9\s-]{10,15}$/;

        candidate.phones.forEach(phone => {

            if (!phoneRegex.test(phone)) {

                candidate.errors.push({
                    field: "phone",
                    value: phone,
                    message: "Invalid phone number."
                });

            }

        });

    }

    validateSkills(candidate) {

        if (!Array.isArray(candidate.skills)) {

            candidate.errors.push({
                field: "skills",
                value: candidate.skills,
                message: "Skills should be an array."
            });

        }

    }

}

export default CandidateValidator;