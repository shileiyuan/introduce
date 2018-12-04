const Service = require('egg').Service
const fs = require('fs-extra')
const ROOT = '/Users/ysl/Storage/Quiver.qvlibrary/'

class NoteService extends Service {
  async listNote() {
    const bookMap = {}
    const rootStr = await fs.readFile(ROOT + 'meta.json')
    const structure = JSON.parse(rootStr).children
    for (const item of structure) {
      const bookPath = ROOT + item.uuid + '.qvnotebook/'
      const bookInfoStr = await fs.readFile(bookPath + 'meta.json')
      const bookInfo = JSON.parse(bookInfoStr)
      let notesName = await fs.readdir(bookPath)
      notesName = notesName.filter(name => name !== 'meta.json')
      const noteMap = {}
      for (const name of notesName) {
        const notePath = bookPath + name + '/'
        const noteMeta = await fs.readFile(notePath + 'meta.json')
        const noteContent = await fs.readFile(notePath + 'content.json')
        const noteId = name.split('.')[0]
        noteMap[noteId] = {
          ...JSON.parse(noteMeta),
          ...JSON.parse(noteContent)
        }
      }
      bookMap[item.uuid] = {
        name: bookInfo.name,
        notes: {
          noteIds: notesName.map(name => name.split('.')[0]),
          ...noteMap
        }
      }
    }
    return bookMap
  }

  async getBooks() {
    const list = []
    const rootStr = await fs.readFile(ROOT + 'meta.json')
    const structure = JSON.parse(rootStr).children
    for (const item of structure) {
      const bookPath = ROOT + item.uuid + '.qvnotebook/'
      const bookInfoStr = await fs.readFile(bookPath + 'meta.json')
      const bookInfo = JSON.parse(bookInfoStr)
      let notesName = await fs.readdir(bookPath)
      notesName = notesName.filter(name => name !== 'meta.json')
      const notes = []
      for (const name of notesName) {
        const notePath = bookPath + name + '/'
        const noteMetaStr = await fs.readFile(notePath + 'meta.json')
        const noteMeta = JSON.parse(noteMetaStr)
        noteMeta.createTime = noteMeta.created_at
        noteMeta.updateTime = noteMeta.updated_at
        delete noteMeta.created_at
        delete noteMeta.updated_at
        notes.push(noteMeta)
      }
      const book = { uuid: item.uuid, name: bookInfo.name, notes }
      list.push(book)
    }
    return list
  }

  async getNoteById(bookId, noteId) {
    const path = ROOT + bookId + '.qvnotebook/' + noteId + '.qvnote/content.json'
    // const err = fs.access(path)
    // if(err) return null
    try {
      const note = await fs.readFile(path)
      return JSON.parse(note)
    } catch (error) {
      return null
    }
  }
}

module.exports = NoteService
