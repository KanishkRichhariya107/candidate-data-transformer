class EntityResolver {
    isSameCandidate(candidate1, candidate2) {
        if (
            candidate1.emails.some(email =>
                candidate2.emails.includes(email)
            )
        ) {
            return true;
        }
        if (
            candidate1.phones.some(phone =>
                candidate2.phones.includes(phone)
            )
        ) {
            return true;
        }

        return false;
    }

}
export default EntityResolver;