const BaseCommand = require("../lib/command");
const get = require("lodash.get");
const set = require("lodash.set");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const semver = require("semver");
module.exports = class Command extends BaseCommand {
  async info(pkg, ...fields) {
    const { stdout } = await exec(`npm view ${pkg} ${fields.join(" ")} -j`);
    return JSON.parse(stdout);
  }
  async run(filters) {
    let filter = ".";
    const deps = {
      ...this.pkg.data.dependencies,
    };
    const updates = {};
    if (filters.length === 1) {
      filter = filters[0].concat(".*");
    }
    const re = new RegExp(filter);
    const results = await Promise.all(
      Object.keys(this.pkg.data.dependencies)
        .filter((id) => re.test(id))
        .map((id) => this.info(id, "dist-tags", "name"))
    );

    results.forEach((result) => {
      const current = deps[result.name].replace("^", "");
      const target = deps[result.name];
      const distTags = result["dist-tags"] || {};
      if ("latest" in distTags) {
        if (semver.compare(distTags.latest, current)) {
          updates[result.name] = `can update to ${distTags.latest}`;
        }
      }
    });
    return { updates };
  }
  get readonly() {
    return true;
  }
};
