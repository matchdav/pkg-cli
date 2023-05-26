const path = require("path");
const helpers = require("./helpers");
const sortKeys = require("sort-keys");

module.exports = class PackageCommand {
  configure(yargs) {
    return yargs;
  }
  mapArgs(args) {
    const [_, ...keys] = args._;
    return [...keys];
  }
  async handler(yargs) {
    const args = this.mapArgs(yargs);
    return this.exec(args);
  }
  description = "";
  constructor(options) {
    this.options = { ...options };
    this.cwd = path.resolve(process.cwd(), (options && options.cwd) || "");
    this.pkg = {
      filename: path.join(this.cwd, "package.json"),
      data: helpers.readJSON(path.join(this.cwd, "package.json")),
    };
  }
  async exec(args) {
    const result = await this.run(args);
    if (this.readonly) {
      return this.log(result);
    }
    if (result) {
      this.log(result);
    }
    this.pkg.data = sortKeys(this.pkg.data);
    const { name, version, description, ...meta } = this.pkg.data;
    helpers.writeJSON(this.pkg.filename, {
      name,
      version,
      description,
      ...meta,
    });
  }
  log(...args) {
    helpers.log(...args);
  }
  error(...args) {
    helpers.error(...args);
  }
  run() {
    throw new Error("Not implemented.");
  }
};
