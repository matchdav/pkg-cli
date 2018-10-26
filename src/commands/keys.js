const GetCommand = require('./get');
const keys = require('lodash.keys');
const flat = require('flat');

module.exports = class Command extends GetCommand {
    run(args) {
        const result = flat(super.run(args) || {});
        return keys(result).join('\n');
    }
    get readonly() {
        return true;
    }
};