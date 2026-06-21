export function compactDate(value?: string) {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat('th-TH', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function truncate(value: string, length = 44) {
  if (!value) return ''
  return value.length > length ? `${value.slice(0, length)}...` : value
}
