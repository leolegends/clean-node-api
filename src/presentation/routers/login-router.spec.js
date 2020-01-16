const LoginRouter = require('./login-router')
// const MissingParamError = require('../helpers/missing-param-error')
function MakeSut () {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
  return {
    sut, authUseCaseSpy
  }
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const { sut } = new MakeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    // expect(httpResponse.statusCode).toEqual(new MissingParamError('password'))
  })
  test('Should return 400 if no password is provided', () => {
    const { sut } = new MakeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    // expect(httpResponse.statusCode).toEqual(new MissingParamError('email'))
  })
  test('Should return 500 if no httpRequest is provided', () => {
    const { sut } = new MakeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 500 if no httpRequest has no body provided', () => {
    const { sut } = new MakeSut()
    const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should call AuthUseCase with correct params', () => {
    const { sut, authUseCaseSpy } = new MakeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }
    sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
  })
})
