import { useState } from 'react'
import SiteHint from '../../components/siteHint'
import styled from './style.module.scss'
import { debounce } from '../../help/help'
const Publish = () => {
  const [form, setForm] = useState({
    community: "",  // 小区名
  })
  const searchCommunity = (e) => {
    setForm({
      ...form,
      community: e.target.value 
    })
  }
  return (
    <>
      <header className={styled.header}>
        <h3>发布租房房源</h3>
        <p>这里是一些规则和注意事项/这里是一些规则和注意事项/这里是一些规则和注意事项</p>
      </header>
      <section className={styled.formBox}>
        <ul className={styled.form}>
          <li>
            <span>小区</span>
            <div style={{flex: '1', position: 'relative'}}>
              <input onInput={debounce(searchCommunity, 500)} placeholder="请输入小区名"/>
              <SiteHint value={form.community} top="27px"/>
            </div>
          </li>
          <li>
            <span style={{lineHeight: "45px"}}>房屋地址</span>
            <div className={styled.tagBox}>
              <input placeholder="请输入楼栋号"/>
              <input placeholder="请输入单元号"/>
              <input placeholder="请输入门牌号"/>
            </div>
          </li>
          <li>
            <span>出租价格</span>
            <input placeholder="元为单位,不能输入区间"/>
          </li>
          <li>
            <span>房屋描述</span>
            <input placeholder="简单描述即可,50字以内"/>
          </li>
          <li>
            <span>联系方式</span>
            <input placeholder="请输入手机号"/>
          </li>
          <li>
            <span>联系方式</span>
            <input placeholder="请输入手机号"/>
          </li>
        </ul>
      </section>
      <div className={styled.submitButton}>发布出租委托</div>
      <div style={{height: "20px"}}></div>
    </>
  )
}
export default Publish