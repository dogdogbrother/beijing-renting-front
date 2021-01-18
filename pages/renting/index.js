import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import http from '../../http/http'
import Styled from './style.module.scss'
import { SearchOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { getGaodeSite } from '../../http/api'
import HousList from './components/houseList'
const CheckboxGroup = Checkbox.Group;
/**
 * @param {array} districts  是从高德API申请过来的地区列表
 */
const Renting = ({districts}) => {
  const [placeList, setPlaceList] = useState([])  // 输入提醒的列表数据
  const searchRef = useRef()
  const [loading, setLoading] = useState(false) 
  // districts 和 community 负责渲染的城区和街道列表,他们都有一个唯一值 adcode .
  // 我们就拿 adcode 作为搜索条件精准查找,mysql字段也有 adcode 的
  const [community, setCommunity] = useState([])  // 点击地区后，拿到的街道数据
  const [searchData, setSearchData] = useState({
    adcode: undefined, // 城区参数
    community: undefined, // 街道参数
  })
  const [selectCommunity, setSelectCommunity] = useState("")  // 点击街道后，拿到的center数据
  // const
  const [selectTab, setSelectTab] = useState(0)
  const [houseList, setHouseList] = useState({count: 0, list: []})
  const toSearch = (item) => {
    searchRef.current.value = item.name
    setPlaceList([])
  }
  const checkOptions = ["0-1500","1500-2500","2500-3500","3500-4500","4500+"]
  useEffect(() => {
    onSearch()
  }, [searchData])
  const onInput = async (e) => {
    setPlaceList(await getGaodeSite(e.target.value))
  }
  const debounce = (func, ms = 1000) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, ms)
    }
  }
  const debounceTask = debounce(onInput, 1000)
  function onSearch(){
    setLoading(true)
    http.get("/house/list", {params: {
      pageSize: 10,
      pageNum: 1,
      ...searchData
    }}).then(data => {
      setHouseList({
        count: data.count || 0,
        list: data.list || []
      })
      setLoading(false)
    }).catch(() => setLoading(false))
  }
  function getDistrictTag(district) {
    return <span 
             onClick={() => {
                if (loading) return
                setCommunity(district.districts)
                setSearchData({...searchData, adcode: district.adcode, community: undefined})
             }} 
             key={district.adcode}
             className={community[0]?.adcode === district.adcode ? Styled.activeTag : ""}>
             {district.name}
           </span>
  }
  return (
    <>
      <header className={Styled.searchHeadr}>
        <section className={Styled.searchBox}>
          <input 
            placeholder="可以输入地区/小区名"
            onInput={debounceTask}
            ref={searchRef}/>
          <div>
            <SearchOutlined style={{fontSize: '20px', color: '#888'}} />
          </div>
          <ul className={Styled.placeList}>
            {placeList.map(place => {
              return <li key={place.id} onClick={() => toSearch(place)}>{place.name}</li>
            })}
          </ul>
        </section>
      </header>
      <nav className={Styled.nav}>
        <div className={Styled.navItem}>
          <label className={Styled.label}>城区</label>
          <div className={Styled.choice}>{districts.map(district => getDistrictTag(district))}</div>
        </div>
        {
          community.length ? <div className={Styled.navItem} >
            <label className={Styled.label}>街道</label>
            <div className={Styled.choice}>
              {community.map(district => (
                <span 
                  key={district.center} 
                  onClick={() => {
                    if (loading) return
                    setSelectCommunity(district.center)
                    setSearchData({...searchData, community: district.name})
                  }}
                  className={selectCommunity === district.center ? Styled.activeTag : ""}
                >{district.name}</span>
              ))}
            </div>
          </div> : null
        }
        <div className={Styled.navItem}>
          <label className={Styled.label}>方式</label>
          <div className={Styled.choice}>
            <span>不限</span>
            <span>整租</span>
            <span>合租</span>
          </div>
        </div>
        <div className={Styled.navItem}>
          <label className={Styled.label}>租金</label>
          <CheckboxGroup options={checkOptions} />
        </div>
      </nav>
      <div className={Styled.searchResult}>
        <p>已为您找到 <span>{houseList.count}</span> 套租房</p>
        <i>清空条件</i>
      </div>
      <ul className={Styled.tabs}>
        <li className={selectTab === 0 ? Styled.activeTab : ""}>最近上发布</li>
        <li className={selectTab === 1 ? Styled.activeTab : ""}>价格</li>
        <li className={selectTab === 2 ? Styled.activeTab : ""}>面积</li>
      </ul>
      <HousList houseList={houseList.list} />
    </>
  )
}
export async function getStaticProps() {
  const { data } = await axios.get(`http://restapi.amap.com/v3/config/district`, {params: {
    key: "4fb4ccdb42fc6d32764e91a17b805776",
    keywords: "010",
    subdistrict: "2"
  }})
  return {
    props: {
      districts: data.districts.slice(2)  // 过滤掉头两位数据的原因是高德返回的是北京市区和北京城区，是不需要的 
    }
  }
}
export default Renting