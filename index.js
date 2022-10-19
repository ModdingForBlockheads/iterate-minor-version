const core = require('@actions/core');
const listCompatibleMinecraftVersions = require('./listCompatibleMinecraftVersions');

async function run() {
  try {
    const version = core.getInput('version');
    core.info(`Listing compatible patch versions of ${version} ...`);

    const {versionWithoutPatch, versions} = await listCompatibleMinecraftVersions(version);

    core.setOutput('versionWithoutPatch', versionWithoutPatch);
    core.setOutput('versions', versions);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
