export const formatTimeString = (timeString: string): string => {
  const date = new Date(timeString)
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

export enum LocalStorageKeys {
  TICKET = 'ticket',
}
