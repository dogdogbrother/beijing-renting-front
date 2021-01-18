import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Styled from './style.module.scss'
import { Carousel, Tag } from 'antd';
import http from '../../../http/http'

const Room = () => {
  const router = useRouter()
  const { id } = router.query
  const [info, setInfo] = useState({
    picture: [],
    tag: []
  })
  useEffect(() => {
    if (!id) return
    http.get(`/house/info/${id}`).then(info => {
      console.log(info);
      setInfo(info)
    })
  }, [id])
  return <main className={Styled.roomWrap}>
    <h2>{info.community}·{info.locationName}</h2>
    <small>房屋编号: {info.id}</small>
    <div className={Styled.roomView}>
      <Carousel style={{width: "500px"}} autoplay={true} effect="fade">
        {
          info.picture.map(item => {
            return <div key={item.id} className={Styled.item}>
              <div style={{backgroundImage: `url(${item.url})`}}></div>
            </div>
          })
        }
      </Carousel>
    </div>
    <div>
      <p>房东信息:</p>
      <p>{info.nickname}, 联系电话{info.phone}</p>
    </div>
    <div>
      <p>标签:</p>
      {
        info.tag.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)
      }
    </div>
    <div>
      <p>房间信息:</p>
      <p>{info.describe}</p>
      <p>价格: {info.rental}</p>
      <p>详细地址: {info.district}-{info.community}-{info.address}</p>
    </div>
  </main>
}
export default Room