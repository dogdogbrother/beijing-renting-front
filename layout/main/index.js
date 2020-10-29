import styled from './style.module.scss'

const Main = (props) => {
  return (
    <main className={styled.main}>
      {props.children}
    </main>
  )
}

export default Main