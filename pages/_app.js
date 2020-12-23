import '../styles/globals.css'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>公益租房群</title>
      <link rel="icon" href="/favicon.ico" />
      <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=4fb4ccdb42fc6d32764e91a17b805776"></script> 
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
