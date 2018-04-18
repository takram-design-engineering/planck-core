// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import chalk from 'chalk'
import express from 'express'
import SauceConnectLauncher from 'sauce-connect-launcher'
import Saucelabs from 'saucelabs'

import pkg from '../package.json'

const saucelabs = new Saucelabs({
  username: process.env.SAUCE_USERNAME,
  password: process.env.SAUCE_ACCESS_KEY
})

function startServer (port) {
  return new Promise((resolve, reject) => {
    const app = express()
    app.use(express.static('./'))
    const server = app.listen(port)
    server.on('listening', () => {
      resolve(server)
    })
    server.on('error', error => {
      reject(error)
    })
  })
}

function createTunnel (port) {
  return new Promise((resolve, reject) => {
    SauceConnectLauncher({
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      logger: console.log
    }, (error, tunnel) => {
      if (error) {
        reject(error)
        return
      }
      resolve(tunnel)
    })
  })
}

function startTests (data) {
  return new Promise((resolve, reject) => {
    saucelabs.send({
      method: 'POST',
      path: ':username/js-tests',
      data
    }, (error, response) => {
      if (error) {
        reject(error)
        return
      }
      resolve(response['js tests'].map(id => {
        return { id }
      }))
    })
  })
}

function updateTestStatus (tests) {
  return new Promise((resolve, reject) => {
    saucelabs.send({
      method: 'POST',
      path: ':username/js-tests/status',
      data: {
        'js tests': tests.map(test => test.id)
      }
    }, (error, response) => {
      if (error) {
        reject(error)
        return
      }
      resolve(response['js tests'].map(status => {
        const test = tests.find(test => test.id === status.id)
        const platform = status.platform.join(' ')
        if (test.status !== status.status && status.status) {
          console.log(chalk.gray(`${platform}: ${status.status}`))
        }
        const completed = !!status.result || status.status === 'test error'
        if (test.completed !== completed && completed) {
          console.log(chalk.gray(`${platform}: test completed`))
        }
        return Object.assign({}, test, status, { completed })
      }))
    })
  })
}

function stopTests (tests) {
  return Promise.all(tests.map(test => {
    const id = test.job_id
    if (!id || id === 'job not ready') {
      return Promise.resolve()
    }
    return new Promise((resolve, reject) => {
      saucelabs.stopJob(id, {}, (error, response) => {
        if (error) {
          reject(error)
          return
        }
        if (response) {
          const platform = test.platform.join(' ')
          console.error(chalk.red(`${platform}: interrupted`))
        }
        resolve(response)
      })
    })
  })).then(results => {
    return tests.filter((test, index) => !results[index])
  })
}

describe('', function () {
  this.timeout(1200000)

  const { framework, platforms } = pkg.saucelabs

  let server
  let tunnel
  let tests

  before(async () => {
    const port = 8080
    try {
      server = await startServer(port)
      tunnel = await createTunnel()
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
    tests = await startTests({
      platforms,
      framework,
      name: pkg.name,
      build: `${pkg.version} (${Date.now()})`,
      url: `http://localhost:${port}/test/`,
      idleTimeout: 30
    })
  })

  // Wait for all of the tests to finish
  before(done => {
    const poll = async () => {
      tests = await updateTestStatus(tests)
      const completed = tests.every(test => test.completed)
      if (completed) {
        done()
      } else {
        setTimeout(() => poll(), 5000)
      }
    }
    poll()
  })

  platforms.forEach(platform => {
    describe(platform.join(' '), done => {
      it('passes', done => {
        const test = tests.find(test => {
          return test.platform.every((part, index) => part === platform[index])
        })
        if (!test) {
          done(new Error('Could not retrieve test result'))
        } else if (!test.result) {
          done(new Error('Error before or while testing'))
        } else if (test.result.failures !== 0) {
          done(new Error(test.result.failures, 'tests failed'))
        } else {
          done()
        }
      })
    })
  })

  // Wait for all of the incomplete tests to stop
  after(done => {
    tests = tests.filter(test => !test.completed)
    const poll = async () => {
      tests = await updateTestStatus(tests)
      tests = tests.filter(test => !test.completed)
      tests = await stopTests(tests)
      if (tests.length === 0) {
        done()
      } else {
        setTimeout(() => poll(), 5000)
      }
    }
    poll()
  })

  after(done => {
    if (tunnel) {
      tunnel.close()
    }
    if (server) {
      server.close()
    }
    process.exit(0)
  })
})
