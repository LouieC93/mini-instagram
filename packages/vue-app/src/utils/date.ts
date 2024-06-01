export function getPublishDate(date: string) {
  if (date) {
    const publishDate = new Date(date)

    const now = new Date()
    const diff = now.getTime() - publishDate.getTime()

    if (diff < 1000 * 60) {
      const seconds = Math.floor(diff / 1000)
      return `${seconds} seconds ago`
    }

    if (diff < 1000 * 60 * 60) {
      const minutes = Math.floor(diff / (1000 * 60))
      return `${minutes} minutes ago`
    }
    if (diff < 1000 * 60 * 60 * 24) {
      const hours = Math.floor(diff / (1000 * 60 * 60))
      return `${hours} hours ago`
    }

    return `${publishDate.getFullYear()}-${('0' + (publishDate.getMonth() + 1)).slice(
      -2
    )}-${('0' + publishDate.getDate()).slice(-2)}`
  } else {
    return ''
  }
}
