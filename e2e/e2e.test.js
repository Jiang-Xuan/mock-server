/* eslint-env jest */

const path = require('path')
const fs = require('fs')
const md5 = require('md5')
const request = require('supertest')
const { app, config, search, clearRequestsData } = require('../app')

describe('mock server', () => {
  afterEach(() => {
    clearRequestsData()
  })
  it('当 configResponse 配置式, 返回配置的响应 1', async () => {
    // arrange
    config.configResponse({
      body: {
        foo: 'foo'
      }
    })

    // act
    const response = await request(app)
      .get('/api/v1/images?param=1')

    // assert
    expect(response.body).toEqual({ foo: 'foo' })
  })

  it('当 configResponse 配置式, 返回配置的响应 2', async () => {
    // arrange
    config.configResponse({
      body: {
        bar: 'bar'
      }
    })

    // act
    const response = await request(app)
      .get('/api/v1/images?param=1')

    // assert
    expect(response.body).toEqual({ bar: 'bar' })
  })

  it('当发起任何请求的时候, 需要返回允许跨域的头', async () => {
    // act
    const response = await request(app)
      .get('/api/v1/images?param=1')
    // assert
    expect(response.header['access-control-allow-origin']).toEqual('*')
    expect(response.header['access-control-allow-headers']).toEqual('*')
    expect(response.header['access-control-allow-methods']).toEqual('post, get, options')
  })

  describe('搜索 request', () => {
    afterEach(() => {
      clearRequestsData()
    })
    it('当传入 { path: \'/api/v1/images\' } 参数时, 返回请求地址为 \'/api/v1/images\' 的请求细节(path, method, query)', async () => {
      // arrange
      await request(app)
        .get('/api/v1/images?params1=1&params2=2')
      // act
      const requests = search({ path: '/api/v1/images' })
      // assert
      expect(requests).toEqual(
        [{ path: '/api/v1/images', method: 'GET', query: { params1: '1', params2: '2' } }]
      )
    })
    it('当传入 { path: \'/api/v1/bar\' } 参数时, 返回请求地址为 \'/api/v1/bar\' 的请求细节(path, method, query)', async () => {
      // arrange
      await request(app)
        .post('/api/v1/bar?params4=4&params5=5')
      // act
      const requests = search({ path: '/api/v1/bar' })
      // assert
      expect(requests).toEqual(
        [{ path: '/api/v1/bar', method: 'POST', query: { params4: '4', params5: '5' } }]
      )
    })
  })

  it('判断 multiple/form-data 类的请求', async () => {
    // arrange
    const filePath = path.resolve(__dirname, './png.png')
    await request(app)
      .post('/api/v1/images')
      .attach('images', filePath)
    // act
    const requests = search({ path: '/api/v1/images' })
    expect(
      md5(requests[0].files[0].buffer)
    ).toEqual(
      md5(fs.readFileSync(filePath))
    )
  })
})
