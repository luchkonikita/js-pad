const Sequelize = require('sequelize')
const db = require('../db/index')

module.exports = db.define('user', {
  githubId: {
    type: Sequelize.INTEGER,
    field: 'github_id',
    allowNull: false
  },
  githubLogin: {
    type: Sequelize.STRING,
    field: 'github_login',
    allowNull: false
  },
  githubAvatarUrl: {
    type: Sequelize.STRING,
    field: 'github_avatar_url',
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
