const {Command, flags} = require('@oclif/command')

class GetCommand extends Command {
  async run() {
    const {flags, args} = this.parse(GetCommand)
    this.log(args)
  }
  static get strict() {
    return false
  }
}

GetCommand.args = [{name: 'key'}]

GetCommand.strict = false

GetCommand.description = `Get package.json field(s)
...
`

GetCommand.flags = {
  json: flags.string({char: 'j', description: 'output as json'}),
}

module.exports = GetCommand
