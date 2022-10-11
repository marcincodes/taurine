import execa from 'execa';
import fs from 'node:fs';
import { oraPromise } from 'ora';

/**
 * This function is used to rename the binary with the platform specific postfix.
 * When `tauri build` is ran, it looks for the binary name appended with the platform specific postfix.
 */

async function moveBinaries() {
  let extension = '';

  if (process.platform === 'win32') {
    extension = '.exe'
  }

  const rustInfo = (await execa('rustc', ['-vV'])).stdout;
  const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];

  if (!targetTriple) {
    console.error('Failed to determine platform target triple')
  }

  fs.renameSync(
    `src-tauri/binaries/app${extension}`,
    `src-tauri/binaries/app-${targetTriple}${extension}`
  );
}

/**
 * This function is used to create bundle for server. `Pkg` is not supporting es module resolution
 * that we need to create typesafety within tRPC
 */
async function createBundle() {
  return execa('node_modules/.bin/esbuild', [
    './server', '--bundle', '--outfile=dist/server.js', '--platform=node'
  ]);
}

/**
 * This function is used to create single executable from server file and nodejs
 */
async function createServerPackage() {
  return execa('node_modules/.bin/pkg', ['package.json', '--output', 'src-tauri/binaries/app']);
}

async function main() {
  try {
    await createBundle();
    await createServerPackage();
    await moveBinaries();
  } catch (e) {
    throw e;
  }
}

oraPromise(main, { text: '[TAURINE] Building server...\n', successText: '[TAURINE] Done\n', failText: '[TAURINE] Cannot build server'});
