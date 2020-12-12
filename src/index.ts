import {Command, flags} from '@oclif/command'
import * as path from 'path'
import {convertJsonFile} from './converter'

class Jsonanon extends Command {
  static description = 'Turn your json into anonymous C# objects.';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    // force: flags.boolean({char: 'f'}),
  }

  static args = [
    {
      name: 'file',
      required: true,
      description: 'Path to json file.',
      parse: path.resolve,
    },
  ]

  async run() {
    try {
      const {args} = this.parse(Jsonanon)
      const file = args.file

      this.log(`Converting "${file}"...`)

      const anon = await convertJsonFile(file)

      this.log('Done. anon says...')
      this.log(anon)
    } catch (error) {
      this.error(error)
    }
  }
}

export = Jsonanon
