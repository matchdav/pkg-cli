const yargs = require("yargs");
const requireDir = require("require-dir");
const get = require("lodash.get");
const assert = require("assert");
const helpers = require("./lib/helpers");

const commands = requireDir("./commands");

module.exports = function (_argv) {
  const argv = require("minimist")(_argv);
  const yargv = yargs(_argv);
  yargv
    .options({
      verbose: {
        alias: "v",
        describe: "Verbose output",
        type: "boolean",
      },
      debug: {
        describe: "Debug output",
        type: "boolean",
      },
    })
    .help();
  const { _, ...options } = argv;
  const [cmd, ...args] = _;
  try {
    assert(cmd in commands);
  } catch (error) {
    helpers.error(`Unrecognized command '${cmd}'`);
    helpers.log(`Allowed commands: ${Object.keys(commands).join(", ")}`);
    process.exit(1);
  }
  const Command = get(commands, cmd);
  const command = new Command({ options, cwd: process.cwd() });
  command.exec(args);
};
