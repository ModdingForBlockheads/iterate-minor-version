const core = require('@actions/core');
const iterateMinorVersion = require('./iterate');

async function run() {
  try {
    const version = core.getInput('version');
    core.info(`Listing prior patches in minor version of ${version} ...`);

    const {minorOnly, versions} = await iterateMinorVersion(version);

    core.setOutput('minorOnly', minorOnly);
    core.setOutput('versions', versions);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
