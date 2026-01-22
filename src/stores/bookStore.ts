import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Book } from '@/interfaces'

function createBookFromVolume(item: any): Book {
  const volumeInfo = item.volumeInfo || {}

  let isbn = ''
  if (volumeInfo.industryIdentifiers) {
    const isbn13 = volumeInfo.industryIdentifiers.find((id) => id.type === 'ISBN_13')
    const isbn10 = volumeInfo.industryIdentifiers.find((id) => id.type === 'ISBN_10')
    isbn = isbn13?.identifier || isbn10?.identifier || ''
  }

  return {
    id: item.id,
    title: volumeInfo.title || 'Без названия',
    authors: volumeInfo.authors || ['Автор не указан'],
    description: volumeInfo.description,
    publishedDate: volumeInfo.publishedDate,
    pageCount: volumeInfo.pageCount,
    categories: volumeInfo.categories,
    language: volumeInfo.language,
    thumbnail: volumeInfo.imageLinks?.thumbnail,
    previewLink: volumeInfo.previewLink,
    isbn,
  }
}
export const useBookStore = defineStore('bookStore', () => {
  const books = ref<Record<string, Book>>({})

  const find = (key: string) => books.value[key]

  function addBook(item) {
    const book = createBookFromVolume(item)
    if (!books.value[book.id]) {
      books.value[book.id] = book
    } else {
      console.warn(`Книга с id ${book.id} уже существует`)
    }
  }

  function addBooks(data, isUpdate: boolean) {
    if (isUpdate) {
      this.clean()
    }
    try {
      const items = data?.items || []
      for (const item of items) {
        addBook(item)
      }
    } catch (e) {
      return {
        success: false,
        error: e,
      }
    }
  }
  function clean() {
    books.value = {}
  }

  return { books, addBooks, clean, find }
})
