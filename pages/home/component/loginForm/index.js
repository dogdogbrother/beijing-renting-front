import styled from './style.module.scss'

const LoginForm = () => {
  return <section className={styled.formWrap}>
    <input placeholder="请输入用户名"/>
    <input placeholder="请输入密码"/>
    <div>登 录</div>
  </section>
}

export default LoginForm