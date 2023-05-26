const BaseCommand = require("../lib/command");
const get = require("lodash.get");
const set = require("lodash.set");
module.exports = class Command extends BaseCommand {
  run(args) {
    if (args.length === 1) {
      return get(this.pkg.data, args[0]);
    }
    const collector = {};
    for (const arg of args) {
      set(collector, arg, get(this.pkg.data, arg));
    }
    return collector;
  }
  get readonly() {
    return true;
  }
};
