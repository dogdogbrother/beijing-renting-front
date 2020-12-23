import { useState, useRef } from 'react'
import axios from 'axios'
import styled from './style.module.scss'

const Search = () => {
  const [placeList, setPlaceList] = useState([])
  const searchRef = useRef()
  const onInput = (e) => {
    const keywords = e.target.value
    axios.get("https://restapi.amap.com/v3/assistant/inputtips", {params: {
      key: "4fb4ccdb42fc6d32764e91a17b805776",
      keywords,
      city: "010",
      citylimit: true
    }}).then(res => {
      setPlaceList(res.data.tips)
    })
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
  const toSearch = (item) => {
    searchRef.current.value = item.name
    setPlaceList([])
  }
  const debounceTask = debounce(onInput, 1000)
  return (
    <div className={styled.searchBox}>
      <input 
        placeholder="可以输入小区/商家/地区进行搜索"
        onInput={debounceTask}
        ref={searchRef}
        ></input>
      <div className={styled.mapIcon}>
        <i></i>
        <span>地图</span>
      </div>
      <div className={styled.searchBtn}>开始找房</div>
      <ul className={styled.placeList}>
        {placeList.map(place => {
          return <li key={place.id} onClick={() => toSearch(place)}>{place.name}</li>
        })}
      </ul>
    </div>
  )
}
export default Search