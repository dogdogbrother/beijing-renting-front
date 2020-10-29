// import { useState } from 'react';
import Head from 'next/head'
import Header from '../layout/header'
import Main from '../layout/main'

export default function Home() {
  // const [test, setTest] = useState(1234)
  return (
    <div>
      <Head>
        <title>公益租房群</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>
        我是简介,梅梅的群
      </Main>
    </div>
  )
}
