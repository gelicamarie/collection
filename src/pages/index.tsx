import Head from 'next/head'
import clsx from 'clsx'
import { useQuery } from 'react-query'
import { Card } from '@/components/Card'
import Link from 'next/link'

type NFT = {
  id: string
  name: string
  image: string
  collectionName: string
  hidden: boolean
  tokenID: string
  link: string
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
      link: token.external_link,
    }
  })

  function randomizeArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

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
          <div className="grid justify-center content-center items-center grid-cols-2 gap-y-4 gap-x-20 w-full grid-rows-[auto] relative">
            {!!nfts &&
              !loading &&
              randomizeArray(nfts).map((nft: NFT, i) => {
                if (nft.hidden || !nft.image || !nft.link) return
                const index = i + 1
                return (
                  <div
                    key={`${nft.id}-${nft.image}`}
                    className={clsx(
                      'flex justify-center odd:items-start even:items-end md:min-h-[80vh]  ',
                      index === 1 && '!justify-end ',
                      index % 3 === 0 && 'odd:justify-start ',
                      index % 5 === 0 && 'odd:justify-start',
                    )}
                  >
                    <Link href={nft.link} target="_blank">
                      <Card img={nft.image} name={nft.name} />
                    </Link>
                  </div>
                )
              })}
          </div>
        </div>
      </main>
    </>
  )
}
