'use strict'

class StoreUser {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email|unique:users',
      password: 'required',
      username: 'required',
    }
  }
}

module.exports = StoreUser
