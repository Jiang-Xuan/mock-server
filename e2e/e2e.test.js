/* eslint-env jest */

const request = require('supertest')
const { app, config } = require('../app')

describe('mock server', () => {
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
})
