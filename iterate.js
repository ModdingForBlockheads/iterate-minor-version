let iterateMinorVersion = async function (version) {
    if (typeof version !== 'string') {
        throw new Error('version not a string');
    }
    const versionParts = version.split('.');
    if (versionParts.length !== 3) {
        throw new Error('version must be in the format major.minor.patch');
    }
    const major = versionParts[0];
    const minor = versionParts[1];
    const patch = versionParts[2];
    const minorOnly = major + '.' + minor;
    const versions = [minorOnly];
    for (let i = 1; i <= patch; i++) {
        versions.push(`${major}.${minor}.${i}`);
    }
    return {
        minorOnly,
        versions
    }
};

module.exports = iterateMinorVersion;
