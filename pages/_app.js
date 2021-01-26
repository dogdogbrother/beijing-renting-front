import 'antd/dist/antd.css';
import { useEffect } from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux';
import store from '../config/dva';
import '../styles/globals.css'
import http from '../http/http'
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    http.get("/user/info").then(({username, id, collectHouse}) => {
      // 已登录处理, 未登录不处理
      if (username) {
        store.dispatch({
          type: "user/setStatus",
          payload: {
            loginStatus: true,
            username,
            id,
            collectHouse
          }
        })
      }
    })
  }, [])
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
