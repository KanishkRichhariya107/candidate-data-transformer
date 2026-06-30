import sourcePriority from "../config/sourcePriority.js";

class ConflictResolver {

resolve(value1, value2, candidate1, candidate2) {

    if (!value1 && !value2) {
        return {
            value: null,
            source: null,
            reason: "missing"
        };
    }

    if (!value1) {
        return {
            value: value2,
            source: candidate2.source,
            reason: "single_source"
        };
    }

    if (!value2) {
        return {
            value: value1,
            source: candidate1.source,
            reason: "single_source"
        };
    }

    if (value1 === value2) {
        return {
            value: value1,
            source: "both",
            reason: "matched"
        };
    }

    const priority1 = sourcePriority[candidate1.source];
    const priority2 = sourcePriority[candidate2.source];

    if (priority1 < priority2) {
        return {
            value: value1,
            source: candidate1.source,
            reason: "source_priority"
        };
    }

    return {
        value: value2,
        source: candidate2.source,
        reason: "source_priority"
    };
}
}

export default ConflictResolver;