const {Command, flags} = require('@oclif/command')

class ScriptCommand extends Command {
  async run() {
    const {flags} = this.parse(ScriptCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /home/mcd/projects/pkg-cli/src/commands/script.js`)
  }
}

ScriptCommand.description = `Describe the command here
...
Extra documentation goes here
`

ScriptCommand.flags = {
  list: flags.string({char: 'l', description: 'list keys only'}),
}

module.exports = ScriptCommand
