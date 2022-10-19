const listCompatibleMinecraftVersions = require('./listCompatibleMinecraftVersions');
const process = require('process');
const cp = require('child_process');
const path = require('path');

test('throws invalid version', async () => {
  await expect(listCompatibleMinecraftVersions(123)).rejects.toThrow('version not a string');
});

test('throws malformed version', async () => {
  await expect(listCompatibleMinecraftVersions('1.19')).rejects.toThrow('major.minor.patch');
});

test('list for 1.7.10', async () => {
  const {versionWithoutPatch, versions} = await listCompatibleMinecraftVersions('1.6.4')
  expect(versionWithoutPatch).toBe('1.6');
  expect(versions).toStrictEqual(['1.6', '1.6.1', '1.6.2', '1.6.3', '1.6.4']);
});

test('list for 1.19.2', async () => {
  const {versionWithoutPatch, versions} = await listCompatibleMinecraftVersions('1.19.2')
  expect(versionWithoutPatch).toBe('1.19');
  expect(versions).toStrictEqual(['1.19', '1.19.1', '1.19.2']);
});

test('list for 1.19.3', async () => {
  const {versionWithoutPatch, versions} = await listCompatibleMinecraftVersions('1.19.3')
  expect(versionWithoutPatch).toBe('1.19');
  expect(versions).toStrictEqual(['1.19.3']);
});


// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_VERSION'] = '1.19.2';
  const ip = path.join(__dirname, 'index.js');
  const result = cp.execSync(`node "${ip}"`, {env: process.env}).toString();
  console.log(result);
})
