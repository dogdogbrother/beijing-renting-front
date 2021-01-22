import { useState, useRef } from 'react'
import styled from './style.module.scss'
import { getGaodeSite } from '../../../../http/api'
import Router from 'next/router'

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
  function onSearch() {
    Router.push({
      pathname: "renting",
      query: {
        searchKey: searchRef.current.value
      }
    })
  }
  function toMap() {
    Router.push({
      pathname: "map",
      query: {
        searchKey: searchRef.current.value
      }
    })
  }
  return (
    <div className={styled.searchBox}>
      <input 
        placeholder="可以输入小区/商家/地区进行搜索"
        onInput={debounceTask}
        ref={searchRef}
        ></input>
        <div className={styled.mapIcon} onClick={toMap}>
          <i></i>
          <span>地图</span>
        </div>
      <div className={styled.searchBtn} onClick={onSearch}>开始找房</div>
      <ul className={styled.placeList}>
        {placeList.map(place => {
          return <li key={place.id} onClick={() => toSearch(place)}>{place.name}</li>
        })}
      </ul>
    </div>
  )
}
export default Search