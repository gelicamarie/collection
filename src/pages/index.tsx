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
  tokenID: string
  link: string
  // collectionName: string
  hidden: boolean
  // link: string
  // contractImage?: string
  contractAddress?: string
  // creatorName?: string
  // creatorAddress?: string
  description?: string
}

const getAssets = async ({ cursor }: { cursor?: string }) => {
  const chain = 'ethereum'
  const account = '0x0ec22E4c8A5aC71Df8ba792708E9638048C3ed87'

  const params = new URLSearchParams({
    limit: '8',
  })
  if (cursor) {
    params.append('next', cursor)
  }

  const res = await fetch(`https://api.opensea.io/api/v2/chain/${chain}/account/${account}/nfts?${params.toString()}`, {
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
  if (!nft.image) return
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
          contractAddress={nft.contractAddress}
          description={nft.description}
        />
      </Link>
    </div>
  )
}

const tempFilterImages = (nfts: NFT[]) => {
  //remove ipfs images  or anything with api.apiflash.com
  const filter = ['https://ipfs.io', 'api.apiflash.com', 'bravanft.io']
  return nfts.filter((nft) => {
    return !filter.some((f) => nft.image.includes(f))
  })
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

  const assets = data?.pages?.map((page) => page?.nfts).flat()
  const nfts: NFT[] | undefined = assets?.map((token: any) => {
    return {
      id: token.identifier,
      name: token.name,
      image: token.image_url,
      tokenID: token.identifier,
      contractAddress: token.contract,
      link: token.opensea_url,
      hidden: !!token.is_disabled || !!token.is_nsfw,
      description: token.description,
    }
  })

  //filter out ipfs for now - TODO: handle ipfs images
  const filteredNFTs = tempFilterImages(nfts || []).filter((nft) => !nft.hidden)

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
                loadMore()
              }}
              data={filteredNFTs}
              useWindowScroll
              itemContent={(index, item) => {
                return renderItemContent({ i: index, nft: item })
              }}
              listClassName="grid justify-center content-center items-center grid-cols-2 gap-y-8 gap-x-1 sm:gap-y-4 sm:gap-x-24 w-full grid-rows-[auto] relative px-4 lg:px-0
              [&_.virtuoso-grid-item]:flex [&_.virtuoso-grid-item]:sm:min-h-[88vh]  even:[&_.virtuoso-grid-item]:items-end  odd:[&_.virtuoso-grid-item]:items-start "
              components={{ Footer: () => memoizedFooter }}
            />
          </div>
        </div>
      </main>
    </>
  )
}
