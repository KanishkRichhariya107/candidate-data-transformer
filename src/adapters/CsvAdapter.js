import BaseAdapter from "./BaseAdapter.js";
import Candidate from "../models/Candidate.js";
class CSVAdapter extends BaseAdapter {
    extract(row) {
        return row;
    }
    buildCandidate(row) {
        const candidate = new Candidate();
        candidate.fullName = row.Name || null;
        if (row.Email) 
        {
            candidate.emails.push(row.Email);
        }
        if (row.Phone) 
        {
            candidate.phones.push(row.Phone);
        }
        if (row.Location) 
        {
            candidate.location = row.Location;
        }
        if (row.Skills) 
        {
            candidate.skills = row.Skills.split(",").map(skill => skill.trim());
        }
        return candidate;
    }
}

export default CSVAdapter;