import { useEffect, useState } from 'react'
import http from '../../http/http'
import Styled from './style.module.scss'
import { Button } from 'antd'
const Collect = () => {
  const [collect, setCollect] = useState([])
  useEffect(() => {
    http.get("/collect").then(data => {
      console.log(data);
      setCollect(data)
    })
  }, [])
  function onCancelCollect(houseId) {
    http.delete(`/collect/${houseId}`).then(data => {
      console.log(data);
      // dispatch({
      //   type: "user/setStatus",
      //   payload: {
      //     collectHouse: collectHouse.filter(item => item !== info.id)
      //   }
      // })
    })
  }
  return <div>
    <ul className={Styled.list}>
      {
        collect.map(item => <li key={item.id}>
          <img src={item.house.picture.url} />
          <p>{item.house.community} - {item.house.locationName}</p>
          <p>{item.house.nickname} - {item.house.phone}</p>
          <Button onClick={() => onCancelCollect(item.houseId)}>取消收藏</Button>
        </li>)
      }
    </ul>
  </div>
}

export default Collect