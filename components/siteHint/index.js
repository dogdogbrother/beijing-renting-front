import { useState, useEffect } from 'react'
import styled from './style.module.scss'
import { getGaodeSite } from '../../http/api'

const SiteHint = (props) => {
  const { value, top } = props
  const [site, setSite] = useState([])
  useEffect(async () => {
    value && setSite(await getGaodeSite(value))
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