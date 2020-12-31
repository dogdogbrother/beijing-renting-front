import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from './style.module.scss'
const SiteHint = (props) => {
  const { value, top } = props
  const [site, setSite] = useState([])
  useEffect(() => {
    value && axios.get("https://restapi.amap.com/v3/assistant/inputtips", {params: {
      key: "4fb4ccdb42fc6d32764e91a17b805776",
      keywords: value,
      city: "010",
      citylimit: true
    }}).then(res => {
      setSite(res.data.tips)
    })
  }, [value])
  
  return (
    <ul className={styled.siteList} style={{top}}>
      {site.map(place => {
        return <li key={place.id} onClick={() => toSearch(place)}>{place.name}</li>
      })}
    </ul>
  )
}

export default SiteHint