import fs from "node:fs";
import fse from "fs-extra";
import path from "node:path";
import ora from "ora";
// @ts-ignore
import npminstall from "npminstall";

import { getLatestVersion, getNpmRegistry } from "./versionUtils.js";

export interface NpmPackageOptions {
  name: string;
  targetPath: string;
}

class NpmPackage {
  name: string;
  version: string = "";
  targetPath: string;
  storePath: string;

  constructor(options: NpmPackageOptions) {
    this.name = options.name;
    this.targetPath = options.targetPath;
    this.storePath = path.resolve(options.targetPath, "node_modules");
  }

  async prepare() {
    if (!fs.existsSync(this.targetPath)) {
      fs.mkdirSync(this.targetPath);
    }
    const latestVersion = await getLatestVersion(this.name);
    this.version = latestVersion;
  }

  get npmFilePath() {
    return path.resolve(
      this.storePath,
        // 如果是包 @xxx/xxx 的包，目录是这样的，最外层目录包名中的 / 会被替换为 +
        // @xxx/xxx => @xxx+xxx
      `.store/${this.name.replace("/", "+")}@${this.version}/node_modules/${
        this.name
      }`
    );
  }

  getLatestVersion() {
    return getLatestVersion(this.name);
  }

  /**
   * 判断这个目录是否存在，从而判断包又没有安装
   * @returns 
   */
  async exists() {
    await this.prepare();
    return fs.existsSync(this.npmFilePath);
  }

  async getPackageJSON() {
    if (await this.exists()) {
      return fse.readJSONSync(path.resolve(this.npmFilePath, "package.json"));
    }
    return null;
  }

  async install() {
    const spinner = ora("正在安装包...").start();
    try {
      await this.prepare();
      const res = await npminstall({
        root: this.targetPath,
        pkgs: [{ name: this.name, version: this.version }],
        registry: getNpmRegistry(),
      });
      spinner.stop();
      return res;
    } catch (error) {
      spinner.fail(`安装包失败: ${JSON.stringify(error)}`);
    }
  }
  
  async update() {
    const spinner = ora("正在更新包...").start();
    try {
      await this.prepare();
      const latestVersion = await getLatestVersion(this.name);
      const res = await npminstall({
        root: this.targetPath,
        pkgs: [{ name: this.name, version: latestVersion }],
        registry: getNpmRegistry(),
      });
      spinner.stop();
      return res;
    } catch (error) {
      spinner.fail(`更新包失败: ${JSON.stringify(error)}`);
    }
  }
}

export default NpmPackage;