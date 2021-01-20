
import Styled from './style.module.scss'
import Link from 'next/link'

const HousList = (props) => {
  const { houseList } = props
  return <ul className={Styled.roomBox}>
    {
      (houseList || []).map(house => <li key={house.id}>
        <Link href={`/room/${house.id}`} key={house.id}>
          <img src={house.picture.url} />
        </Link>
        <div className={Styled.roomInfo}>
          <div className={Styled.roomDes}>     
            <Link href={`/room/${house.id}`}><h4>{house.locationName}</h4></Link>
            <div className={Styled.roomDetail}>
              <span>{house.district}</span>
              <span>56㎡</span>
              <span>南</span>
            </div>
            <div className={Styled.roomTagBox}>
              {
                house.tag.map(tag => <span key={tag.id}>{tag.name}</span>)
              }
            </div>
          </div>
          <p className={Styled.price}><span>{house.rental}</span>元/月</p>
        </div>
      </li>)
    }
  </ul>
}

export default HousList