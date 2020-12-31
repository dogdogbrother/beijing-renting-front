import Link from 'next/link'
import styled from './style.module.scss'
import Search from './component/search'

const Home = () => {
  return (
    <div className={styled.wrapper}>
      <div className={styled.view}>
        <header>
          <h3>梅梅公益</h3>
          <ul>
            <li><Link href="/renting">租房</Link></li>
            <li><Link href="/publish">发布房源</Link></li>
            <li>登录/注册</li>
          </ul>
        </header>
        <section className={styled.main}>
          <p>一句温暖的文案</p>
          <Search />
        </section>
      </div>
    </div>
  )
}

export default Home