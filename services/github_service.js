const request = require('request')
const querystring = require('querystring')

const GITHUB_AUTH_URL = () => {
  return 'https://github.com/login/oauth/authorize?' + querystring.stringify({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.GITHUB_REDIRECT_URL
  })
}

const GITHUB_TOKEN_URL = () => {
  return 'https://github.com/login/oauth/access_token'
}

const GITHUB_TOKEN_PARAMS = (code) => {
  return {
    form: {
      code: code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET
    }
  }
}

const GITHUB_USER_URL = (accessToken) => {
  return 'https://api.github.com/user?' + querystring.stringify({
    access_token: accessToken
  })
}

const GITHUB_REQUEST_HEADERS = () => {
  return {
    'User-Agent': process.env.GITHUB_APP_NAME
  }
}

function getUserFromGithub(code) {
  return new Promise((resolve, reject) => {
    request.post(GITHUB_TOKEN_URL(), GITHUB_TOKEN_PARAMS(code), (err, response, body) => {
      if (err) { reject(err) }

      const accessToken = querystring.parse(body).access_token
      const options = {
        url: GITHUB_USER_URL(accessToken),
        headers: GITHUB_REQUEST_HEADERS()
      }

      request.get(options, (err, response, body) => {
        if (err) { reject(err) }
        resolve(body)
      })
    })
  })
}

module.exports = {
  GITHUB_AUTH_URL: GITHUB_AUTH_URL,
  getUserFromGithub: getUserFromGithub
}
