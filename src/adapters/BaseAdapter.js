class BaseAdapter {
    extract() {
        throw new Error("extract() method must be implemented.");
    }

    buildCandidate() {
        throw new Error("buildCandidate() method must be implemented.");
    }
}

export default BaseAdapter;