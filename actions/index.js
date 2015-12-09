const githubService = require('../services/github_service')

module.exports = {
  home: (req, res) => {
    res.render('pages/index')
  },
  github: (req, res) => {
    res.redirect(githubService.GITHUB_AUTH_URL())
  },
  githubCallback: (req, res) => {
    const user = githubService.getUserFromGithub(req.query.code)

    user
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })

    res.render('pages/index')
  }
}
