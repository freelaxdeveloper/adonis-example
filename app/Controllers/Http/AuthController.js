'use strict'

class AuthController {

  /**
   *
   * @param auth
   * @param request
   * @param response
   * @returns {Promise<void|Route>}
   */
  async login ({ auth, request, response }) {
    const { email, password } = request.all()
    await auth.attempt(email, password)

    return response.route('users.index');
  }

  /**
   *
   * @param auth
   * @param response
   * @returns {Promise<void|Route>}
   */
  async logout ({ auth, response }) {
    await auth.logout();

    return response.route('users.index');
  }
}

module.exports = AuthController
