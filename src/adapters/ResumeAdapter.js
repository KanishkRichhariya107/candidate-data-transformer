import fs from "fs";
import pdf from "pdf-parse-new";

import BaseAdapter from "./BaseAdapter.js";
import Candidate from "../models/Candidate.js";

class ResumeAdapter extends BaseAdapter {

    async extract(filePath) {

        const buffer = fs.readFileSync(filePath);

        const data = await pdf(buffer);

        return data.text;

    }

    buildCandidate(text){

    const candidate = new Candidate();

    const sections = this.splitIntoSections(text);

    candidate.fullName = this.extractName(sections);

    candidate.emails = this.extractEmails(text);

    candidate.phones = this.extractPhones(text);

    candidate.skills = this.extractSkills(sections);

    candidate.education = this.extractEducation(sections);

    candidate.experience = this.extractExperience(sections);

    candidate.socialProfiles.github =
        this.extractGithub(text);

    candidate.socialProfiles.linkedin =
        this.extractLinkedIn(text);
        candidate.source = "resume";

    return candidate;

}
    splitIntoSections(text) {
    const sections = {};
    const headings = [
        "education",
        "experience",
        "skills",
        "projects",
        "certifications",
        "achievements"
    ];
    let currentSection = "header";
    sections[currentSection] = [];
    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);
    for (const line of lines) {
        const normalized = line.toLowerCase();
        if (headings.includes(normalized)) {
            currentSection = normalized;
            sections[currentSection] = [];
        }
        else {
            sections[currentSection].push(line);
        }
    }
    return sections;
}

extractName(sections){

    if(!sections.header)
        return null;

    return sections.header[0] || null;

}

    extractEmails(text){
        const matches = text.match(
        /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g
    );

    return matches ? [...new Set(matches)] : [];
    }

    extractPhones(text){
            const matches = text.match(
        /(?:\+91[\s-]?)?[6-9]\d{9}/g
    );

    return matches ? [...new Set(matches)] : [];
    }

extractSkills(sections) {

    if (!sections.skills)
        return [];

    const skills = [];

    for (const line of sections.skills) {

        const cleaned = line.includes(":")
            ? line.split(":")[1]
            : line;

        cleaned
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean)
            .forEach(skill => skills.push(skill));

    }

    return [...new Set(skills)];

}

extractEducation(sections){

    if(!sections.education)
        return [];

    return sections.education;

}

extractExperience(sections){

    if(!sections.experience)
        return [];

    return sections.experience;

}

extractGithub(text) {

    const match = text.match(
        /(https?:\/\/)?(www\.)?github\.com\/[^\s]+/i
    );

    return match ? match[0] : null;

}
extractLinkedIn(text) {

    const match = text.match(
        /(https?:\/\/)?(www\.)?linkedin\.com\/[^\s]+/i
    );

    return match ? match[0] : null;

}
}

export default ResumeAdapter;