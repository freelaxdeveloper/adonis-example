'use strict'

const User = use('App/Models/User');

class UserController {

  /**
   *
   * @param view
   * @returns {Promise<Route|String>}
   */
  async index ({ view }) {
    const users = await User.all();

    return view.render('users.index', { users: users.toJSON() });
  }

  /**
   *
   * @param request
   * @param response
   * @param session
   * @returns {Promise<void|Route>}
   */
  async store ({ request, response, session }) {
    const data = request.only(['email', 'username', 'password']);

    const user = await User.create(data);
    session.flash({ message: 'Create user successful!' });

    return response.route('users.show', { id: user.id });
  }

  /**
   *
   * @param session
   * @param view
   * @param params
   * @param response
   * @returns {Promise<void|Route|Route|String>}
   */
  async edit ({ session, view, params, response }) {
    const user = await User.find(params.id);

    if (!user) {
      session.flash({ error: 'User not found!' });

      return response.route('users.index');
    }

    return view.render('users.edit', { user });
  }

  /**
   *
   * @param request
   * @param response
   * @param params
   * @param session
   * @returns {Promise<void|Route>}
   */
  async update ({ request, response, params, session }) {
    const data = request.only([
      'email',
      'username',
    ]);

    const user = await User.find(params.id);
    user.merge(data);
    await user.save();

    session.flash({ message: 'Update user successful!' });

    return response.route('users.edit', { id: user.id })
  }

  /**
   *
   * @param view
   * @returns {Route|String}
   */
  create ({ view }) {
    return view.render('users.create');
  }

  async show ({ view, params }) {
    const user = await User.find(params.id);

    return view.render('users.show', { user });
  }

  /**
   *
   * @param response
   * @param params
   * @param session
   * @returns {Promise<void|Route>}
   */
  async destroy ({ response, params, session }) {
    await User.query().where('id', params.id).delete();
    session.flash({ message: 'Remove user successful!' });

    return response.route('users.index');
  }
}

module.exports = UserController
