module.exports = app => {
  const { router, controller } = app
  const auth = app.middleware.auth()
  router.get('/', auth, controller.hello.index)
  router.post('/login', controller.login.index)
  router.post('/addUser', auth, controller.login.addUser)
  router.get('/user/list', auth, controller.user.list)
  router.get('/user/getUserInfoByToken', auth, controller.user.getUserInfoByToken)

  // kanban
  router.get('/kanban/list', auth, controller.kanban.list)
  router.post('/kanban/moveTask', auth, controller.kanban.moveTask)
  router.post('/kanban/addTask', auth, controller.kanban.addTask)
  router.post('/kanban/deleteTask', auth, controller.kanban.deleteTask)

  // note
  router.get('/note/listNote', auth, controller.note.listNote)
  router.get('/note/getBooks', auth, controller.note.getBooks)
  router.get('/note/getNoteById', auth, controller.note.getNoteById)
}
