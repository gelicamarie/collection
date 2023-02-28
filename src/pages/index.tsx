import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import { useQuery } from 'react-query'

type NFT = {
  id: string
  name: string
  image: string
  collectionName: string
  hidden: boolean
}

export default function Home() {
  const options = {
    method: 'POST',
    headers: { accept: 'application/json' },
  }

  const getAssets = async () => {
    const res = await fetch(
      `https://api.opensea.io/api/v1/assets?owner=0x0ec22E4c8A5aC71Df8ba792708E9638048C3ed87`,
      options,
    )
    return res.json()
  }

  const { data, isLoading: loading } = useQuery('nfts', getAssets)

  const assets = data?.assets

  const nfts: NFT[] = assets?.map((token: any) => {
    return {
      id: token.id,
      name: token.name,
      image: token.image_url,
      collectionName: token.collection.name,
      hidden: token.hidden,
      tokenID: token.token_id,
      creator: token.creator?.user?.username,
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
          {!!nfts &&
            !loading &&
            nfts.map((nft: NFT) => {
              if (nft.hidden) return
              if (!nft.image) return

              return <Image key={nft.image} src={nft.image} alt={nft.name} height={150} width={150} />
            })}
        </div>
      </main>
    </>
  )
}
