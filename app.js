const express = require('express')
const http = require('http')
const stopabble = require('stoppable')
const multer = require('multer')

const expressApp = express()

let response = {}

let requestsData = []

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

const search = ({ path }) => {
  let result = requestsData
  if (path) {
    result = requestsData.filter((requestData) => {
      return requestData.path === path
    })
  }

  return result.map((item) => ({ path: item.path, query: item.query, method: item.method, files: item.files }))
}

const upload = multer()

expressApp.all('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', 'post, get, options')
  next()
}, upload.array('images'), (req, res, next) => {
  requestsData.push(req)
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
  },
  search,
  clearRequestsData: () => {
    requestsData = []
  }
}
