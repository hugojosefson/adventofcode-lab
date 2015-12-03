export default path => {
    try {
        return require(path);
    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            return undefined;
        } else {
            throw err;
        }
    }
}