const BaseCommand = require('../lib/command')
const helpers = require('../lib/helpers')
const set = require('lodash.set')

module.exports = class Command extends BaseCommand { 
    run(args){
        const pairs = helpers.chunkArray(args, 2)
        try {
            pairs.forEach(pair => {
                const [key, value] = pair;
                set(this.pkg.data, key, value)
            });
        } catch (e) {
            console.error({e})
        }
    }
}