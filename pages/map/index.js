import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import http from '../../http/http'
import Styled from './style.module.scss'
const Map = () => {
  const { query } = useRouter()
  let searchKey = undefined
  let map = undefined
  const houseMap = new Object()
  const [houseList, setHouseList] = useState([])
  useEffect(() => {
    if (!query.searchKey && query.searchKey !== "") return
    searchKey = query.searchKey
    map = new AMap.Map('container', {
      zoom:11, //级别
      center: [116.397428, 39.90923], //中心点坐标
    });
    getMarkData(0)
  }, [query.searchKey])
  function getMarkData(start) {
    // 接口带3参数,会返回数组和next,next为true,再+50申请
    http.get("/house/mark", {params: {
      start,
      end: start + 50,
      searchKey
    }}).then(({list, next}) => { // data 格式为{ next: true | false, list: [] }
      // 房子坐标的展示有个问题,因为有可能是一个坐标下有多个房子,但是其实只能展示一个点.
      // 所以要先遍历,用location作为key值,只记录一个坐标
      const insertList = []
      list.forEach(({location}) => {
        if (houseMap[location]) {
          houseMap[location]++
        } else {
          houseMap[location] = 1
          insertList.push(location)
        }
      });
      const markerList = insertList.map(location => {
        const marker = new AMap.Marker({
          position: new AMap.LngLat(...location.split(",").map(loc => Number(loc))),
          title: '北京',
          extData: location
        });
        marker.on('click', (ev) => {
          // ev.target.w.extData 就是坐标点的 location,用来做搜索
          http.get("/house/info", {params: {
            location: ev.target.w.extData
          }}).then(data => {
            setHouseList(data)
          })
        });
        return marker
      })
      // 将创建的点标记添加到已有的地图实例
      map.add(markerList);
      if (next) getMarkData(start + 50)
    })
  }
  return <div className={Styled.wrap}>
    <div className={Styled.houseCard}>
      <ul>
        {
          houseList.map(house => <li key={house.id}>
            <img src={house.picture.url} />
            <div>
              <p>区:{house.district}</p>
              <p>地址:{house.locationName}</p>
              <p>价格:{house.rental}元</p>
              <p>联系方式:{house.phone}</p>
              <p>介绍:{house.describe}</p>
            </div>
          </li>)
        }
      </ul>
    </div>
    <div className={Styled.mapBox} id="container" style={{height: "100vh"}}></div>
  </div>
}

export default Map