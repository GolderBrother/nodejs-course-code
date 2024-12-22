import NpmPackage from './npmPackage.js';
// import { getLatestSemverVersion, getLatestVersion, getNpmInfo, getNpmLatestSemverVersion, getNpmRegistry, getVersions } from './versionUtils.js';
import path from 'node:path';

async function main() {
    const pkg = new NpmPackage({
        targetPath: path.join(import.meta.dirname, '../aaa'),
        // name: 'create-vite',
        name: '@babel/core'
    });

    // 如果这个包安装过，就 update 更新版本，否则 install 安装这个版本。
    if(await pkg.exists()) {
        pkg.update();
    } else {
        pkg.install();
    }

    console.log(await pkg.getPackageJSON())
}

main();