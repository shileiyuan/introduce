module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.hello.index)
  router.post('/login', controller.login.index)
  router.post('/addUser', controller.login.addUser)
}
