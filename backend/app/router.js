module.exports = app => {
  const { router, controller } = app
  const auth = app.middleware.auth()
  router.get('/', auth, controller.hello.index)
  router.post('/login', controller.login.index)
  router.post('/addUser', auth, controller.login.addUser)
}
