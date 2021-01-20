import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from './style.module.scss'
import Search from './component/search'
import LoginForm from './component/loginForm'
import Modal from '../../components/modal'

const Home = () => {
  const [showLogin, setShowLogin] = useState(false)
  const { loginStatus } = useSelector(state => state.user)
  return (
    <div className={styled.wrapper}>
      <div className={styled.view}>
        <header>
          <h3>梅梅公益</h3>
          <ul>
            <li><Link href="/renting?searchKey">租房</Link></li>
            <li><Link href="/publish">发布房源</Link></li>
            {
              loginStatus
              ? <li>个人中心</li>
              : <li onClick={() => setShowLogin(true)}>登录/注册</li>
            }
          </ul>
        </header>
        <section className={styled.main}>
          <p>一句温暖的文案</p>
          <Search />
        </section>
      </div>
      <Modal show={showLogin} close={() => setShowLogin(false)} title="登录/注册">
        <LoginForm close={() => setShowLogin(false)}/>
      </Modal>
    </div>
  )
}
export default Home