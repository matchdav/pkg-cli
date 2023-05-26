const BaseCommand = require("../lib/command");
const helpers = require("../lib/helpers");
const set = require("lodash.set");
const get = require("lodash.get");
const sortKeys = require("sort-keys");
module.exports = class Command extends BaseCommand {
  get readonly() {
    return false;
  }
  run(args) {
    const pairs = helpers.chunkArray(args, 2);
    const scripts = get(this.pkg.data, "scripts", {});
    try {
      pairs.forEach((pair) => {
        const [key, value] = pair;
        set(scripts, key, value);
      });
      sortKeys(scripts);
      set(this.pkg.data, "scripts", scripts);
      return { scripts };
    } catch (e) {
      this.error({ e });
    }
  }
};
