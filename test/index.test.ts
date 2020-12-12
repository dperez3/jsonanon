import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('jsonanon', () => {
  test
  .stdout()
  .do(() => cmd.run(['test/testJson.json']))
  .it('prints something', ctx => {
    expect(ctx.stdout).to.contain('new')
  })

  // test
  // .stdout()
  // .do(() => cmd.run(['thismuhfile']))
  // .it('prints out thismuhfile', ctx => {
  //   expect(ctx.stdout).to.throw('thismuhfile')
  // })
})
