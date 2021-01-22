'use strict'

class UpdateUser {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email',
      username: 'required'
    }
  }
}

module.exports = UpdateUser
