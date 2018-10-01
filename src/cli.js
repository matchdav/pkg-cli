const requireDir = require('require-dir')
const get = require('lodash.get')
const assert = require('assert')

const commands = requireDir('./commands')

module.exports = function (_argv) {
    const argv = require('minimist')(_argv)
    const { _, ...options } = argv;
    const [cmd, ...args] = _;
    try {
        assert(cmd in commands)
    } catch (error) {
        console.error(`Unrecognized command '${cmd}'`)
        console.log(`Allowed commands: ${Object.keys(commands).join(', ')}`)
        throw error
    }
    const Command = get(commands, cmd)
    const command = new Command({ options, cwd: process.cwd() })
    command.exec(args)
}
