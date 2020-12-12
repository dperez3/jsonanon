import {convertJsonFile, convertJsonValueToCSharpValue} from '../src/converter'

describe('blah', () => {
  it('can convert a simple object', () => {
    const simpleJson = {
      aNumber: 1,
      aString: 'string val',
      aDate: new Date(2020, 1, 1),
    }

    const output = convertJsonValueToCSharpValue(simpleJson)

    // eslint-disable-next-line no-console
    console.log(output)
  })

  it('can convert a complicated object', () => {
    const simpleJson = {
      aNumber: 1,
      aString: 'string val',
      aDate: new Date(2020, 1, 1),

      aStringDate: '6 Mar 17 21:22 UT',
      anObject: {
        subProp: 'subProp Value',
      },
      anArray: ['todo'],
    }

    const output = convertJsonValueToCSharpValue(simpleJson)

    // eslint-disable-next-line no-console
    console.log(output)
  })

  it('can convert a complicated json file', async () => {
    const output = await convertJsonFile('./test/testJson.json')

    // eslint-disable-next-line no-console
    console.log(output)
  })

  // default test setup should accomplish this.
  // Also, this can be easily and confidently tested by running...
  // `./bin/run abc`
  // ......
  // it('can auto run', async () => {
  //   function sleep(ms: number): Promise<void> {
  //     return new Promise(resolve => setTimeout(resolve, ms))
  //   }

  //   process.argv = [ './test/testJson.json' ]
  //   require('../src')

  //   await sleep(2000)
  // })
})
