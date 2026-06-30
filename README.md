# Candidate Data Transformer

A modular Node.js application that ingests candidate information from multiple heterogeneous data sources, transforms it into a canonical schema, resolves duplicate identities, merges conflicting information, assigns confidence scores, and produces a normalized JSON output.

---

## Features

- Multi-source candidate ingestion
  - CSV
  - Resume (PDF)
- Canonical candidate schema
- Data validation
- Data normalization
- Entity resolution
- Conflict resolution
- Provenance tracking
- Confidence scoring
- Runtime configurable output fields
- JSON export

---

## Project Structure

```
candidate-data-transformer/

├── input/
│   ├── candidates.csv
│   └── resume.pdf
│
├── output/
│   └── result.json
│
├── src/
│
│   ├── adapters/
│   │   ├── BaseAdapter.js
│   │   ├── CSVAdapter.js
│   │   └── ResumeAdapter.js
│   │
│   ├── config/
│   │   ├── confidenceRules.js
│   │   ├── outputConfig.js
│   │   └── sourcePriority.js
│   │
│   ├── core/
│   │   ├── EntityResolver.js
│   │   ├── MergeEngine.js
│   │   ├── ConflictResolver.js
│   │   ├── ConfidenceEngine.js
│   │   └── ProjectionEngine.js
│   │
│   ├── models/
│   │   └── Candidate.js
│   │
│   ├── normalizers/
│   │   └── CandidateNormalizer.js
│   │
│   ├── pipeline/
│   │   └── Pipeline.js
│   │
│   ├── validators/
│   │   └── CandidateValidator.js
│   │
│   └── index.js
│
├── package.json
└── README.md
```

---

# System Architecture

```
CSV File
        \
         \
          ---> CSV Adapter ------
                                 \
                                  \
Resume PDF ---> Resume Adapter ---> Validator
                                      |
                                      ▼
                                 Normalizer
                                      |
                                      ▼
                              Entity Resolver
                                      |
                                      ▼
                               Merge Engine
                                      |
                                      ▼
                           Conflict Resolver
                                      |
                                      ▼
                           Confidence Engine
                                      |
                                      ▼
                            Projection Engine
                                      |
                                      ▼
                               Output JSON
```

---

# Processing Pipeline

The application processes candidate information in the following order:

1. Read candidate data from CSV.
2. Read candidate resume from PDF.
3. Convert both inputs into a common Candidate object.
4. Validate mandatory fields and formats.
5. Normalize data into a canonical representation.
6. Determine whether both records belong to the same person.
7. Merge records according to source priority.
8. Record provenance and conflict resolution details.
9. Assign confidence scores.
10. Generate configurable JSON output.

---

# Canonical Candidate Schema

Each candidate is transformed into the following structure:

```json
{
  "fullName": "",
  "emails": [],
  "phones": [],
  "location": "",
  "skills": [],
  "education": [],
  "experience": [],
  "socialProfiles": {},
  "audit": {}
}
```

---

# Merge Policy

When the same field exists in multiple sources:

- Resume is preferred over CSV.
- Duplicate values are removed.
- Arrays are merged.
- Provenance is preserved.
- Every conflict is recorded.

---

# Confidence Assignment

Confidence is determined using three factors:

- Source reliability
- Number of supporting sources
- Validation status

Example:

| Situation | Confidence |
|-----------|-----------:|
| Resume + CSV agree | High |
| Only Resume | Medium-High |
| Only CSV | Medium |
| Validation Error | Reduced |

---

# Runtime Configuration

The output schema can be configured without changing the source code.

Example:

```javascript
const outputConfig = {
    fields: [
        "fullName",
        "emails",
        "skills",
        "audit"
    ]
};
```

Only the selected fields are included in the final JSON.

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
cd candidate-data-transformer
```

Install dependencies:

```bash
npm install
```

---

# Input Files

Place the input files inside the `input` folder.

```
input/
    candidates.csv
    resume.pdf
```

---

# Running the Project

Run the project using:

```bash
node src/index.js
```

The application will:

- Read the CSV file
- Read the resume
- Process both sources
- Merge candidate information
- Generate the final output

The generated file will be available at:

```
output/result.json
```

---

# Example Output

```json
{
    "matched": true,
    "candidate": {
        "fullName": "John Doe",
        "emails": [
            "john@example.com"
        ],
        "skills": [
            "JavaScript",
            "React",
            "Node.js"
        ]
    }
}
```

---

# Future Improvements

- Support multiple resumes simultaneously.
- Extract hyperlinks directly from PDF annotations.
- Add REST API support.
- Add unit and integration tests.
- Support additional input sources such as LinkedIn and GitHub APIs.

---

# Author

**Kanishk Richhariya**

Jaypee Institute of Information Technology

B.Tech Computer Science

