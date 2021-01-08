import { useState, useRef } from 'react'
import Link from 'next/link'
import styled from './style.module.scss'
import { getGaodeSite } from '../../../../http/api'
const Search = () => {
  const [placeList, setPlaceList] = useState([])
  const searchRef = useRef()
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
  const toSearch = (item) => {
    searchRef.current.value = item.name
    setPlaceList([])
  }
  const debounceTask = debounce(onInput, 500)
  return (
    <div className={styled.searchBox}>
      <input 
        placeholder="可以输入小区/商家/地区进行搜索"
        onInput={debounceTask}
        ref={searchRef}
        ></input>
        <Link href="/map">
          <div className={styled.mapIcon}>
            <i></i>
            <span>地图</span>
          </div>
        </Link>
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