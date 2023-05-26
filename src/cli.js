const yargs = require("yargs");
const requireDir = require("require-dir");
const get = require("lodash.get");
const assert = require("assert");
const helpers = require("./lib/helpers");

const commands = requireDir("./commands");

module.exports = function (_argv) {
  const yargv = yargs(_argv);
  const argv = yargv
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
    .usage("Usage: $0 <command> [options]")
    .help();

  for (const cmd in commands) {
    const Command = get(commands, cmd);
    const command = new Command({ cwd: process.cwd() });
    yargv.command(
      cmd,
      command.description,
      command.configure.bind(command),
      command.handler.bind(command)
    );
  }
  yargv.parse().argv;
};

function previousHandler(argv, yargv) {
  const { _, ...options } = argv;
  const [cmd, ...args] = _;
  try {
    assert(cmd in commands);
  } catch (error) {
    helpers.error(`Unrecognized command '${cmd}'`);
    return yargv.showHelp();
  }
  const Command = get(commands, cmd);
  const command = new Command({ options, cwd: process.cwd() });
  command.exec(args);
}
