export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  const formatter = new Intl.DateTimeFormat('en-EN', options)
  const formattedDate = formatter.format(date)

  return formattedDate
}