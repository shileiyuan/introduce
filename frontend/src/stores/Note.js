import { observable, action, runInAction } from 'mobx'
import request from '../utils/request'
import API from '../utils/API'

class Note {
  @observable article = {
    title: '',
    cells: [
      {
        data: ''
      }
    ]
  }
  @observable books = []

  @action getBooks = async () => {
    const response = await request.get(API.note_getBooks)
    runInAction(() => {
      if (response.success) {
        this.books = response.data
      }
    })
  }

  @action getNoteById = async (bookId, noteId) => {
    const response = await request.get(API.note_getNoteById, { params: { bookId, noteId } })
    runInAction(() => {
      if (response.success) {
        this.article = response.data
      }
    })
  }
}

export default new Note()
