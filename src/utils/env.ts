export const OPENSEA_API_KEY = (() => {
  //should panic build
  if (!process.env.NEXT_PUBLIC_OPENSEA_KEY) {
    throw new Error('NEXT_PUBLIC_OPENSEA_KEY is not defined')
  }
  return process.env.NEXT_PUBLIC_OPENSEA_KEY
})()

export const ETHERSCAN_API_KEY = (() => {
  //should panic build
  if (!process.env.NEXT_PUBLIC_ETHERSCAN_KEY) {
    throw new Error('NEXT_PUBLIC_ETHERSCAN_KEY is not defined')
  }
  return process.env.NEXT_PUBLIC_ETHERSCAN_KEY
})()
