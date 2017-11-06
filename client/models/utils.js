export function padInt (num) {
  return `${num}`.padStart(2, '0')
}

export function secondsToString (num) {
  const seconds = num % 60
  const minutes = ((num - seconds) / 60) % 60
  const hours = Math.floor(num / 3600)

  return [hours, minutes, seconds].map(padInt).join(':')
}

export function stringToSeconds (string) {
  const blocks = string.split(':').reverse()
  if (blocks.length > 3 || blocks.some(x => x.length > 2)) {
    throw new Error('Incorrect Time Input')
  }

  const seconds = parseInt(blocks[0], 10)
  if (seconds > 59 || seconds < 0) {
    throw new Error('Incorrect Time Input')
  }

  let minutes = 0
  if (blocks[1]) {
    minutes = parseInt(blocks[1], 10)
    if (minutes > 59 || minutes < 0) {
      throw new Error('Incorrect Time Input')
    }
  }

  let hours = 0
  if (blocks[2]) {
    hours = parseInt(blocks[2], 10)
    if (hours < 0) {
      throw new Error('Incorrect Time Input')
    }
  }

  return seconds + 60 * minutes + 3600 * hours
}
