import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import http from '../../http/http'
import Styled from './style.module.scss'
import { SearchOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { getGaodeSite } from '../../http/api'
import HousList from './component/houseList'
const CheckboxGroup = Checkbox.Group;
/**
 * @param {array} districts  是从高德API申请过来的地区列表
 */
const Renting = ({districts}) => {
  const CancelToken = axios.CancelToken
  let cancel = null  // 和上面的 CancelToken 控制取消请求,因为业务上有可能带有searchKey,也可能不带
  const router = useRouter()
  const [placeList, setPlaceList] = useState([])  // 输入提醒的列表数据
  const searchRef = useRef()
  const [loading, setLoading] = useState(false) 
  // districts 和 community 负责渲染的城区和街道列表,他们都有一个唯一值 adcode .
  // 我们就拿 adcode 作为搜索条件精准查找,mysql字段也有 adcode 的
  const [community, setCommunity] = useState([])  // 点击地区后，拿到的街道数据
  const [searchData, setSearchData] = useState({
    keywords: undefined,
    adcode: undefined, // 城区参数
    community: undefined, // 街道参数
    priceRange: undefined,
  })
  const [selectCommunity, setSelectCommunity] = useState("")  // 点击街道后，拿到的center数据
  const [selectTab, setSelectTab] = useState(0)
  const [houseList, setHouseList] = useState({count: 0, list: []})
  const toSearch = (item) => {
    searchRef.current.value = item.name
    setPlaceList([])
  }
  const checkOptions = ["0-1500","1500-2500","2500-4000","4500-6000","6000-10000"]
  useEffect(() => {
    onSearch()
  }, [searchData])
  useEffect(() => {
    if (router.query.searchKey) {
      searchRef.current.value = router.query.searchKey
      cancel()
      onSearch()
    }
  }, [])
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
    // const searchKey = searchRef.current.value
    // if (searchKey) searchData.searchKey = searchKey
    http.get("/house/list", {
      cancelToken: new CancelToken((c) => {
        cancel = c
      }),
      params: {
        pageSize: 10,
        pageNum: 1,
        ...searchData
      }
  }).then(data => {
      setHouseList({
        count: data.count || 0,
        list: data.list || []
      })
      setLoading(false)
    }).catch(() => setLoading(false))
  }
  function resertCondition() {
    searchRef.current.value = ""
    setCommunity("")
    setSelectCommunity("")
    setSearchData({
      keywords: undefined,
      adcode: undefined, // 城区参数
      community: undefined, // 街道参数
      priceRange: undefined,
    })
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
  function onCheckPice(value) {
    if (loading) return
    let tmp = value
    if (searchData.priceRange && searchData.priceRange.length) {
      tmp = value.filter(item => {
        return searchData.priceRange !== item
      })
    }
    setSearchData({
      ...searchData,
      priceRange: tmp[0]
    })
  }
  function saveSearchKey() {
    setSearchData({
      ...searchData,
      keywords: searchRef.current.value
    })
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
            <SearchOutlined style={{fontSize: '20px', color: '#888'}} onClick={saveSearchKey} />
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
        {/* <div className={Styled.navItem}>
          <label className={Styled.label}>方式</label>
          <div className={Styled.choice}>
            <span>不限</span>
            <span>整租</span>
            <span>合租</span>
          </div>
        </div> */}
        <div className={Styled.navItem}>
          <label className={Styled.label}>租金</label>
          <CheckboxGroup options={checkOptions} value={[searchData.priceRange]} onChange={onCheckPice}/>
        </div>
      </nav>
      <div className={Styled.searchResult}>
        <p>已为您找到 <span>{houseList.count}</span> 套租房</p>
        <i onClick={resertCondition}>清空条件</i>
      </div>
      {
        houseList.length && <ul className={Styled.tabs}>
          <li className={selectTab === 0 ? Styled.activeTab : ""}>最近上发布</li>
          <li className={selectTab === 1 ? Styled.activeTab : ""}>价格</li>
          <li className={selectTab === 2 ? Styled.activeTab : ""}>面积</li>
        </ul>
      }
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