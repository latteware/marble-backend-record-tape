/* global describe, it, expect */

// This function takes a tape and build a mocha set of test
const testTape = (suiteName, tape, testFn) => {
  describe(`Suite: ${suiteName}`, function () {
    const tapeData = tape.loadSync()

    for (const record of tapeData.log) {
      it(`Test input ${JSON.stringify(record.input)}, should ${record.error ? 'fail' : 'give output'}`, async function () {
        let result, error
        try {
          result = await testFn(record.input)
        } catch (e) {
          error = e
        }

        if (record.output) {
          expect(error).to.equal(undefined)
          expect(record.output).to.deep.equal(result)
        }

        if (record.error) {
          expect(result).to.equal(undefined)
          expect(record.error).to.deep.equal(error.message)
        }
      })
    }
  })
}

module.exports = testTape