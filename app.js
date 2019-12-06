const express = require('express')
const http = require('http')
const stopabble = require('stoppable')

const expressApp = express()

let response = {}

const DEFAULT_PORT = 3500

let listenPort = DEFAULT_PORT

const config = {
  configResponse (configResponse) {
    response = configResponse
  },
  configListenPort (port) {
    listenPort = port
  }
}

expressApp.all('*', (req, res, next) => {
  res.send(response.body)
})

const stoppableServer = stopabble(http.createServer(expressApp), 0)

module.exports = {
  app: expressApp,
  config,
  DEFAULT_PORT: DEFAULT_PORT,
  start: async () => {
    return new Promise((resolve, reject) => {
      stoppableServer.listen(listenPort, () => {
        resolve()
      })
    })
  },
  close: async () => {
    return new Promise((resolve, reject) => {
      stoppableServer.close(() => {
        resolve()
      })
    })
  }
}
