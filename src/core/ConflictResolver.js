import sourcePriority from "../config/sourcePriority.js";

class ConflictResolver {

    resolve(value1, value2, candidate1, candidate2) {

        // If only one value exists
        if (!value1) return value2;
        if (!value2) return value1;

        // If both are same
        if (value1 === value2) return value1;

        // Otherwise compare source priority
        const priority1 = sourcePriority[candidate1.source];
        const priority2 = sourcePriority[candidate2.source];

        return priority1 < priority2 ? value1 : value2;
    }

}

export default ConflictResolver;