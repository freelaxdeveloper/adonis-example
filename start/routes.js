'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome');
Route.get('/', 'UserController.index');

Route.group(() => {
  Route.post('login', 'AuthController.login').as('auth.sign_in');

  Route.get('logout', 'AuthController.logout')
    .middleware(['auth']).as('auth.logout');

  Route.on('/login').render('auth.login')
    .as('login').middleware(['guest']);
}).prefix('auth');

Route.resource('users', 'UserController')
  .validator(new Map([
    [['users.store'], ['StoreUser']],
    [['users.update'], ['UpdateUser']],
  ]));

Route.group(() => {
  Route.get('/:id/destroy', 'UserController.destroy').as('destroy_get');
}).prefix('users').as('users');

