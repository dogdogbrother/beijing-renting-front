import 'antd/dist/antd.css';
import Head from 'next/head'
import { Provider } from 'react-redux';
import store from '../config/dva';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>公益租房群</title>
      <link rel="icon" href="/favicon.ico" />
      <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=4fb4ccdb42fc6d32764e91a17b805776"></script> 
    </Head>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
}

export default MyApp
