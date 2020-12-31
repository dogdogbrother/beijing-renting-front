import { useState, useRef } from 'react'
import axios from 'axios'
import styled from './style.module.scss'
import { SearchOutlined } from '@ant-design/icons';

const Renting = () => {
  const [placeList, setPlaceList] = useState([])
  const searchRef = useRef()
  const toSearch = (item) => {
    searchRef.current.value = item.name
    setPlaceList([])
  }
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
  const debounceTask = debounce(onInput, 1000)
  return (
    <>
      <header className={styled.searchHeadr}>
        <section className={styled.searchBox}>
          <input 
            onInput={debounceTask}
            ref={searchRef}/>
          <div>
            <SearchOutlined style={{fontSize: '20px', color: '#888'}} />
          </div>
          <ul className={styled.placeList}>
            {placeList.map(place => {
              return <li key={place.id} onClick={() => toSearch(place)}>{place.name}</li>
            })}
          </ul>
        </section>
      </header>
      <main>
        <nav>
          
        </nav>
      </main>
    </>
  )
}

export default Renting