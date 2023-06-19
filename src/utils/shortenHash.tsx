export const shortenHash = (hash: string = '', charLength: number = 6, postCharLength?: number) => {
  if (postCharLength) {
    return hash.slice(0, charLength) + '...' + hash.slice(hash.length - postCharLength, hash.length)
  }

  return hash.slice(0, charLength)
}
