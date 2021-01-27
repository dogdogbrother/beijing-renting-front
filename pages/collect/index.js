import { useEffect, useState } from 'react'
import http from '../../http/http'
import Styled from './style.module.scss'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
const Collect = () => {
  const dispatch = useDispatch()
  const [collect, setCollect] = useState([])
  useEffect(() => {
    getCollect()
  }, [])
  function onCancelCollect(houseId) {
    http.delete(`/collect/${houseId}`).then(() => {
      getCollect()
    })
  }
  function getCollect() {
    http.get("/collect").then(data => {
      dispatch({
        type: "user/setStatus",
        payload: {
          collectHouse: data.map(item => item.houseId)
        }
      })
      setCollect(data)
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