import { api } from './api'
import { useBookStore } from './stores/bookStore'

let lastReqParams: object | undefined = undefined
let lastIndex = 0
const maxResults = 20

async function cashIncrement(params: object) {
  if (deepEqual(params, lastReqParams)) {
    lastIndex += maxResults
    return false
  } else {
    lastReqParams = params
    lastIndex = 0
    return true
  }
}

export const useBookSearch = async (params: object) => {
  const bookStore = useBookStore()

  const isUpdate = deepEqual(params, lastReqParams)

  if (!isUpdate) {
    lastReqParams = { ...params }
    lastIndex = 0
  } else {
    lastIndex += maxResults
  }

  const searchParams = {
    ...params,
    maxResults,
    startIndex: lastIndex,
  }

  try {
    const data = await api.search(searchParams)

    if (!data || !data.items) {
      if (!isUpdate) {
        bookStore.clean()
      }
      return
    }

    bookStore.addBooks(data, !isUpdate)
  } catch (error) {
    console.error('Ошибка поиска:', error)
    alert('Не удалось загрузить книги')
  }
}

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true

  if (a == null || b == null) return a === b

  if (typeof a !== 'object' || typeof b !== 'object') return a === b

  if (Array.isArray(a) !== Array.isArray(b)) return false

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!keysB.includes(key)) return false
    if (!deepEqual(a[key], b[key])) return false
  }

  return true
}
