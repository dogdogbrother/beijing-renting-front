import Link from 'next/link'
import styled from './style.module.scss'

const Header = () => {
  return (
    <div className={styled.wrapper}>
      <ul>
        <li>
          <Link href="/">简介</Link>
        </li>
        <li>
          <Link href="/renting">租房点我</Link>
        </li>
        <li>
          <Link href="/landlord">房东点我</Link>
        </li>
        <li>
          <Link href="/admin">管理员点我</Link>
        </li>
      </ul>
    </div>
  )
}

export default  Header