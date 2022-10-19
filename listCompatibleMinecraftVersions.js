const incompatibleVersions = require('./versions');

let listCompatibleMinecraftVersions = async function (version) {
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
    const versionWithoutPatch = major + '.' + minor;
    let versions = [versionWithoutPatch];
    for (let i = 1; i <= patch; i++) {
        versions.push(`${major}.${minor}.${i}`);
    }
    if (incompatibleVersions[version]) {
        versions = versions.filter(it => !incompatibleVersions[version].includes(it));
    }

    return {
        versionWithoutPatch,
        versions
    }
};

module.exports = listCompatibleMinecraftVersions;
