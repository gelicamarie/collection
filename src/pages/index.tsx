import Head from 'next/head'
import { useQuery } from 'react-query'
import { Card } from '@/components/Card'

type NFT = {
  id: string
  name: string
  image: string
  collectionName: string
  hidden: boolean
}

export default function Home() {
  const options = {
    method: 'GET',
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
      <main className="flex w-full items-center justify-center my-10">
        <div className="flex w-full max-w-7xl mx-auto">
          <div className="grid justify-center content-center items-center grid-cols-2 gap-4 w-full ">
            {!!nfts &&
              !loading &&
              nfts.map((nft: NFT) => {
                if (nft.hidden) return
                if (!nft.image) return

                return <Card key={nft.image} img={nft.image} name={nft.name} />
              })}
          </div>
        </div>
      </main>
    </>
  )
}
