import '@/styles/globals.css'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import type { AppProps } from 'next/app'

const link = new HttpLink({
  uri: 'https://api.zora.co/graphql',
})

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
