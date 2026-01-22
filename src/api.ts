const API_URL = 'https://www.googleapis.com/books/v1/volumes'

async function search(params) {
  const searchParams = { ...params }
  const qParts = []

  if (searchParams.q) {
    qParts.push(searchParams.q)
    delete searchParams.q
  }

  const specialFields = ['inauthor', 'intitle', 'inpublisher', 'subject', 'isbn']
  for (const field of specialFields) {
    if (searchParams[field] != null) {
      qParts.push(`${field}:"${searchParams[field]}"`)
      delete searchParams[field]
    }
  }

  const finalQ = qParts.join(' ')
  if (finalQ) {
    searchParams.q = finalQ
  }

  const queryString = new URLSearchParams(searchParams).toString()
  const url = `${API_URL.trim()}?${queryString}`

  console.log(url)

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Ошибка при выполнении поиска:', error)
    throw error
  }
}

export const api = {
  search,
}
