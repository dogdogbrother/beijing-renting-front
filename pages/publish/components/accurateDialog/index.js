import { useEffect, useState } from 'react'
import styled from './style.module.scss'
import { Radio } from 'antd';
import { getGaodeSite } from '../../../../http/api'
const AccurateDialog = (props) => {
  const { searchKey, close } = props
  const [searchList, setSearchList] = useState([])
  const [radioValue, setRadioValue] = useState("")
  useEffect(async () => {
    setSearchList(await getGaodeSite(searchKey))
  }, [])
  function affirm() {
    close(searchList.find(item => item.id === radioValue))
  }
  return <div className={styled.wrap}>
    <p className={styled.description}>因为需要在地图上显示您的房屋,所以要利用地图地址确认位置.如果找不到,请调整您的地址输入内容.</p>
    <Radio.Group 
      value={radioValue} 
      onChange={(e) => setRadioValue(e.target.value)}>
      {
        searchList.map(site => (
          <Radio key={site.id} className={styled.radioStyle} value={site.id}>{site.name}</Radio>
        ))
      }
    </Radio.Group>
    <div className={styled.btn} onClick={affirm}>确 定</div>
  </div>
}

export default AccurateDialog