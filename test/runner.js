// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* global BUNDLER */

import mocha from 'mocha'

if (BUNDLER !== 'webpack') {
  mocha.setup('bdd')

  window.addEventListener('load', event => {
    const runner = mocha.run()
    const results = []

    runner.on('end', () => {
      window.mochaResults = runner.stats
      window.mochaResults.reports = results
    })

    runner.on('fail', (test, error) => {
      const titles = []
      let current = test
      while (current.parent.title) {
        titles.push(current.parent.title)
        current = current.parent
      }
      titles.reverse()
      results.push({
        name: test.title,
        results: false,
        message: error.message,
        stack: error.stack,
        titles
      })
    })
  }, false)
}
