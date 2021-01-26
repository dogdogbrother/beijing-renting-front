import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from './style.module.scss'
import Search from './component/search'
import LoginForm from './component/loginForm'
import Modal from '../../components/modal'
import { Popover, message } from 'antd'
import { useDispatch } from 'react-redux'

const Home = () => {
  const [showLogin, setShowLogin] = useState(false)
  const { loginStatus, username } = useSelector(state => state.user)
  const [waitRoute, setWaitRoute] = useState("")  // 记录带跳转的路由信息
  const dispatch = useDispatch()
  function logOut() {
    localStorage.removeItem("token")
    dispatch({type: "user/setLogOut"})
    message.success("已退出登录");
  }
  const content = (
    <ul className={styled.popover}>
      <li onClick={() => alert("还没开发")}>我的出租</li>
      <li onClick={() => Router.push("/collect")}>我的收藏</li>
      <li onClick={logOut}>退出登录</li>
    </ul>
  );
  function toPublish() {
    if (loginStatus) {
      Router.push("/publish")
    } else {
      // 如果没有登录就让他登录
      message.warning("先登录才能发布房源");
      setShowLogin(true)
      setWaitRoute("/publish")
    }
  }
  function loginSuccess() {
    setShowLogin(false)
    if (waitRoute) {
      Router.push("/publish")
    }
  }
  return (
    <div className={styled.wrapper}>
      <div className={styled.view}>
        <header>
          <h3>梅梅公益</h3>
          <ul>
            <li><Link href="/renting">租房</Link></li>
            <li onClick={toPublish}>发布房源</li>
            {
              loginStatus
              ? <Popover placement="bottom" content={content} trigger="click">
                  <li>{username}</li>
                </Popover>
              : <li onClick={() => setShowLogin(true)}>登录/注册</li>
            }
          </ul>
        </header>
        <section className={styled.main}>
          <p>一句温暖的文案</p>
          <Search />
        </section>
      </div>
      <Modal show={showLogin} close={() => {setWaitRoute(""); setShowLogin(false)}} title="登录/注册">
        <LoginForm success={loginSuccess}/>
      </Modal>
    </div>
  )
}
export default Home