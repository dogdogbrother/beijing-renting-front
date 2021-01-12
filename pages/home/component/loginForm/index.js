import styled from './style.module.scss'
import { useState } from 'react'
import http from '../../../../http/http'
const LoginForm = (props) => {
  const { close } = props
  const [isLogin, setIsLogin] = useState(true) // true是登录,false是注册
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  })
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    affirmPassword: ""
  })
  const [verify, setVerify] = useState("")
  const formVerify = (val) => {
    const key = val ? loginForm : registerForm
    if (!key.username) return '用户名不能为空'
    if (key.username.length<2 || key.username.length>12) return '用户名长度应为2到12位'
    if (!key.password) return '密码不能为空'
    if (key.password.length<6 || key.username.length>12) return '密码长度应为6到12位'
    // 如果是注册的话,还要校验 确认密码 
    if (!val) {
      if (registerForm.affirmPassword !== registerForm.password) {
        return '两次密码输入不一致'
      }
    }
    return ''
  }
  function setLogin(e) {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
  }
  function setRegister(e) {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    })
  }
  // 登录时,要看是登录还是注册
  function submit() {
    const pass = formVerify(isLogin)
    setVerify(pass)
    if (pass) return 
    const URL_API = isLogin ? "/user/login" : "user/register"
    const postData = isLogin ? {...loginForm} : {...registerForm}
    http.post(URL_API, {...postData}).then(res => {
      console.log(res);
      close()
    })
    
  }
  function onSwitch() {
    setVerify("")
    setIsLogin(!isLogin)
  }
  return <section className={styled.formWrap}>
    {
      isLogin
      ?
      <section>
        <input placeholder="请输入用户名" name="username" onInput={setLogin} />
        <input placeholder="请输入密码" name="password" onInput={setLogin} />
      </section>
      :
      <section>
        <input placeholder="请输入用户名" name="username" onInput={setRegister}/>
        <input placeholder="请输入密码" name="password" onInput={setRegister}/>
        <input placeholder="请再次确认密码" name="affirmPassword" onInput={setRegister}/>
      </section>
    }
    <i>{verify}</i>
    <span onClick={onSwitch}>{isLogin ? "我要注册" : "去登录"}</span>
    <div onClick={submit}>{isLogin ? "登 录" : "注 册"}</div>
  </section>
}

export default LoginForm