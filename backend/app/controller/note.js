const Controller = require('egg').Controller

class NoteCtrl extends Controller {
  async listNote() {
    const data = await this.ctx.service.note.listNote()
    this.ctx.body = {
      success: true,
      data
    }
  }

  async getBooks() {
    const data = await this.ctx.service.note.getBooks()
    this.ctx.body = {
      success: true,
      data
    }
  }

  async getNoteById() {
    const { bookId, noteId } = this.ctx.request.query
    const data = await this.ctx.service.note.getNoteById(bookId, noteId)
    if (!data) {
      this.ctx.body = {
        success: false,
        msg: '路径不存在'
      }
    } else {
      this.ctx.body = {
        success: true,
        data
      }
    }
  }
}

module.exports = NoteCtrl
