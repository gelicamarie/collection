import React from 'react'
import Head from 'next/head'
import clsx from 'clsx'
import { useInfiniteQuery, useQuery } from 'react-query'
import { Card } from '../components/Card'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { shortenHash } from '@/utils/shortenHash'
import { HeadingInfo } from '@/components/HeadingInfo'
import { ETHERSCAN_API_KEY, OPENSEA_API_KEY } from '@/utils/env'
import { VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso'
type NFT = {
  id: string
  name: string
  image: string
  collectionName: string
  hidden: boolean
  tokenID: string
  link: string
  contractImage?: string
  contractAddress?: string
  creatorName?: string
  creatorAddress?: string
}

const getAssets = async ({ cursor }: { cursor?: string }) => {
  const params = new URLSearchParams({
    owner: '0x0ec22E4c8A5aC71Df8ba792708E9638048C3ed87',
    order_direction: 'desc',
    limit: '8',
    include_orders: 'false',
  })

  if (cursor) params.append('cursor', cursor)

  const res = await fetch(`https://api.opensea.io/api/v1/assets?${params.toString()}`, {
    method: 'GET',
    headers: { accept: 'application/json', 'X-API-KEY': OPENSEA_API_KEY },
  })

  const data = await res.json()
  return data
}

const getLatestTxnTimeStamp = async () => {
  const params = new URLSearchParams({
    module: 'account',
    action: 'txlist',
    address: '0x0ec22E4c8A5aC71Df8ba792708E9638048C3ed87',
    startblock: '0',
    endblock: '99999999',
    page: '1',
    offset: '1',
    sort: 'desc',
    apikey: ETHERSCAN_API_KEY,
  })

  const res = await fetch(`https://api.etherscan.io/api?${params.toString()}`, {
    method: 'GET',
    headers: { accept: 'application/json' },
  })

  const data = await res.json()
  return data.result[0].timeStamp
}

export const getStaticProps: GetStaticProps = async () => {
  const initialNFTs = await getAssets({})
  const initialTxn = await getLatestTxnTimeStamp()
  return {
    props: {
      initialNFTs: initialNFTs,
      initialTxn: initialTxn,
    },
  }
}

const renderItemContent = ({ i, nft }: { i: number; nft: NFT }) => {
  if (nft.hidden || !nft.image || !nft.link) return
  const index = i + 1

  return (
    <div
      key={`${nft.id}-${nft.image}`}
      className={clsx(
        'flex justify-center h-full w-full',
        index === 1 && 'sm:!justify-end ',
        index % 3 === 0 && 'sm:odd:justify-start ',
        index % 5 === 0 && 'sm:odd:justify-start',
      )}
    >
      <Link href={nft.link} target="_blank">
        <Card
          nftImage={nft.image}
          name={nft.name}
          contractImage={nft.contractImage}
          contractAddress={nft.contractAddress}
          creatorName={nft.creatorName || shortenHash(nft.creatorAddress, 5, 4)}
        />
      </Link>
    </div>
  )
}
export default function Home({ initialNFTs, initialTxn }: { initialNFTs: any; initialTxn: any }) {
  const { data, isLoading: loading, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useInfiniteQuery({
    queryFn: (args) => {
      return getAssets({ cursor: args?.pageParam })
    },
    initialData: initialNFTs,
    getNextPageParam: (args) => {
      return args?.next
    },
    getPreviousPageParam: (args) => {
      return args?.previous
    },
    refetchOnWindowFocus: false,
  })

  const { data: txnData } = useQuery({
    queryKey: 'latestTxn',
    queryFn: () => {
      return getLatestTxnTimeStamp()
    },
    initialData: initialTxn,
  })

  const assets = data?.pages?.map((page) => page?.assets).flat()

  const nfts: NFT[] | undefined = assets?.map((token: any) => {
    return {
      id: token.id,
      name: token.name,
      image: token.image_url,
      collectionName: token.collection.name,
      hidden: token.hidden,
      tokenID: token.token_id,
      creator: token.creator?.user?.username,
      link: token.external_link,
      contractImage: token.asset_contract.image_url,
      contractAddress: token.asset_contract.address,
      creatorName: token.creator.user?.username,
      creatorAddress: token.creator.address,
    }
  })

  //remove nfts with no image, no link, or is hidden
  const filteredNFTs = nfts?.filter((nft) => nft.image && nft.link && !nft.hidden)

  const gridRef = React.useRef<VirtuosoGridHandle>(null)

  const loadMore = React.useCallback(() => {
    if (!hasNextPage) return
    fetchNextPage()
  }, [fetchNextPage, hasNextPage])

  const memoizedFooter = React.useMemo(() => <div className="w-full h-14" />, [])

  return (
    <>
      <Head>
        <title>NFT Gallery</title>
        <meta name="description" content="View NFTs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="twitter:creator" content="@0xgel" />
      </Head>
      <main className="flex w-full items-center justify-center my-10">
        <div className="flex flex-col w-full max-w-7xl mx-auto items-center">
          <div className="hidden lg:block bg-green-800 w-full max-w-lg max-h-[512px] mt-[10vw] aspect-square fixed rounded-md opacity-80" />
          <div className="flex flex-col gap-12 md:gap-28 w-full max-w-7xl mx-auto justify-center overflow-hidden">
            <HeadingInfo publicAddress="0x0ec22E4c8A5aC71Df8ba792708E9638048C3ed87" lastTxnTimestamp={txnData} />
            <VirtuosoGrid
              ref={gridRef}
              endReached={() => {
                console.log('end reached')
                loadMore()
              }}
              data={filteredNFTs}
              useWindowScroll
              itemContent={(index, item) => {
                return renderItemContent({ i: index, nft: item })
              }}
              listClassName="grid justify-center content-center items-center grid-cols-2 gap-y-8 gap-x-1 sm:gap-y-2 sm:gap-x-24 w-full grid-rows-[auto] relative px-4 lg:px-0
              [&_.virtuoso-grid-item]:flex [&_.virtuoso-grid-item]:sm:min-h-[100vh]  even:[&_.virtuoso-grid-item]:items-end  odd:[&_.virtuoso-grid-item]:items-start "
              components={{ Footer: () => memoizedFooter }}
            />
          </div>
        </div>
      </main>
    </>
  )
}
