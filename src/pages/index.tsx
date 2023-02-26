import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useQuery, gql } from '@apollo/client'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })
const query = gql(/* GraphQL */ `
  query GetNFTs {
    tokens(
      networks: [{ network: ETHEREUM, chain: MAINNET }]
      pagination: { limit: 20 }
      where: { ownerAddresses: "gelica.eth" }
    ) {
      nodes {
        token {
          name
          collectionName
          tokenId
          metadata
        }
      }
    }
  }
`)

const IPFS_GATWAY = 'https://ipfs.io/ipfs/'

export default function Home() {
  const { data, loading } = useQuery(query)

  const getTokenImage = ({ src }: { src: string }) => {
    const hashRegex = /(ipfs:\/\/(?:ipfs\/)?)(\w+)(.*)/
    const hashOnlyRegex = /(ipfs:\/\/)?(\w+)/

    if (!src.includes('ipfs:/')) return src

    if (hashRegex.test(src)) {
      return IPFS_GATWAY + src.replace(hashRegex, '$2$3')
    } else if (hashOnlyRegex.test(src)) {
      return IPFS_GATWAY + src.replace(hashOnlyRegex, '$2')
    } else {
      return src
    }
  }

  const tokenData = data?.tokens.nodes.map((node) => node.token).filter((token) => !!token.metadata?.image)

  const tokens = tokenData?.map((token, i) => {
    const tokenId = token.name ? token.name : token.collectionName ? token.collectionName : `token-${i}`

    return {
      id: `${tokenId.replace(/[\s\u00A0]/g, '')}-${token.tokenId}`,
      tokenName: token.name,
      collectionName: token.collectionName,
      img: getTokenImage({
        src: token.metadata.image,
      }),
      other: token.metadata.image,
    }
  })
  return (
    <>
      <Head>
        <title>NFT Gallery</title>
        <meta name="description" content="View NFTs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
          {!!tokens &&
            !loading &&
            tokens.map((token) => {
              console.log({
                name: token.tokenName,
                img: token.img,
                other: token.other,
              })
              return (
                token?.img && <Image key={token.id} src={token.img} alt={token.tokenName} height={150} width={150} />
              )
            })}
        </div>
      </main>
    </>
  )
}
