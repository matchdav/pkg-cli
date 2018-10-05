const {Command, flags} = require('@oclif/command')

class SetCommand extends Command {
  async run() {
    const {flags, args} = this.parse(SetCommand)
  }
}
SetCommand.strict = false

SetCommand.description = `Set package.json field
...
e.g. pkg set publishConfig.registry $(npm config get @myorg:registry)
`

SetCommand.flags = {
  write: flags.string({char: 'w', description: 'modify package.json in-place'}),
}

module.exports = SetCommand
