/* eslint-env jest */

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

  describe('搜索 response', () => {
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
})
