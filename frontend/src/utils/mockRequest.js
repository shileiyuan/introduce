import MockAdapter from 'axios-mock-adapter'
import request from './request'

const mockRequest = new MockAdapter(request, { delayResponse: 500 })

export default mockRequest
