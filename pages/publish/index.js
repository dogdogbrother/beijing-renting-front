import { useState, useRef } from 'react'
import styled from './style.module.scss'
import Modal from '../../components/modal'
import TagDialog from './components/tagDialog'
import AccurateDialog from './components/accurateDialog'
import { Tag } from 'antd';
const Publish = () => {
  const [tagDialog, setTagDialog] = useState(false)
  const [accurateDialog, setAccurateDialog] = useState(false)  // accurate 精准
  const [accurateValue, setAccurateValue] = useState("")
  const [verify, setVerify] = useState("")
  const inputRef = useRef()
  const [form, setForm] = useState({
    region: new Object(),  // 小区信息,input输入后,弹出对话框,选择高德地图提供的结果,放到这里面.
    buildNumber: "",
    cellNumber: "",
    houseNumber: "",
    rental: "",
    describe: "",
    _phone: "",  // 因为直接 name=phone 的话 样式会有问题,提交的时候还要变成phone
    nickname: "",
  })
  const [tags, setTags] = useState([])
  function onChoiceTag(tags) {
    setTags(tags)
  }
  function onCloseTagDialog() {
    setTagDialog(false)
  }
  function removeTag(id) {
    setTags(tags.filter(tag => tag.id !== id))
  }
  function onEnter(e) {
    if (e.keyCode == 13) {  // 如果回车就触发失焦,也就是会有弹出框
      inputRef.current.blur()
    }
  }
  function openGaode(e) {
    if (!e.target.value) return
    setAccurateValue(e.target.value)
    setAccurateDialog(true)
  }
  function onAccurate(region) {
    setAccurateDialog(false)
    setForm({
      ...form,
      region
    })
    inputRef.current.value = region.name
  }
  function onInput(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  function onSubmit() {
    setVerify("")
    if (!form.region.id) {
      return setVerify("无效的小区名,必须从对话框中选择小区哦")
    }
    if (!form.buildNumber) {
      return setVerify("必须输入楼栋号")
    }
    if (!form.cellNumber) {
      return setVerify("必须输入单元号")
    }
    if (!form.houseNumber) {
      return setVerify("必须输入门牌号")
    }
    if (!form.rental) {
      return setVerify("必须有出租价格")
    }
    if (!form.describe) {
      return setVerify("必须房屋描述")
    }
    if (!form._phone) {
      return setVerify("请输入联系方式")
    }
    if (!form.nickname) {
      return setVerify("如何称呼您")
    }
    alert("提交代码")
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
            <input ref={inputRef} placeholder="请输入小区名" onBlur={openGaode} onKeyUp={onEnter}/>
          </li>
          <li>
            <span style={{lineHeight: "45px"}}>详细地址</span>
            <div className={styled.inputBox}>
              <input placeholder="请输入楼栋号" type="number" name="buildNumber" onInput={onInput}/>
              <input placeholder="请输入单元号" type="number" name="cellNumber" onInput={onInput}/>
              <input placeholder="请输入门牌号" type="number" name="houseNumber" onInput={onInput}/>
            </div>
          </li>
          <li>
            <span>出租价格</span>
            <input placeholder="单位/元,不能输入区间" type="number" name="rental" onInput={onInput}/>
          </li>
          <li>
            <span>房屋描述</span>
            <input placeholder="简单描述即可,50字以内" name="describe" onInput={onInput}/>
          </li>
          <li>
            <span>联系方式</span>
            <input placeholder="请输入手机号" type="number" name="_phone" onInput={onInput}/>
          </li>
          <li>
            <span>称呼方式</span>
            <input placeholder="李先/生张女士/奥特曼 之类的随意" name="nickname" onInput={onInput}/>
          </li>
          <li>
            <span className={styled.tagLabel}>房屋标签</span>
            <div className={styled.tagBox}>
              {
                tags.length
                ?
                <div style={{flex: "1"}}>
                  {tags.map(tag => <Tag className="m-y-5" key={tag.id} closable onClose={() => removeTag(tag.id)}>{tag.name}</Tag>)}
                </div>
                :
                <p className={styled.placeholder}>标签有助于租客找到您的房间,但是不实的标签会遭到举报哦</p>
              }
              <div className={styled.tagButton} onClick={() => setTagDialog(true)}>添加标签</div>
            </div>
          </li>
        </ul>
        <p className={styled.verify}>{verify}</p>
      </section>
      <div className={styled.submitButton} onClick={onSubmit}>发布出租委托</div>
      <div style={{height: "20px"}}></div>
      <Modal show={tagDialog} title="选择房屋标签" close={()=>setTagDialog(false)}>
        <TagDialog onChoice={onChoiceTag} onClose={onCloseTagDialog} tags={tags}/>
      </Modal>
      <Modal show={accurateDialog} title="选择详细地点" close={() => setAccurateDialog(false)}>
        <AccurateDialog searchKey={accurateValue} close={onAccurate}/>
      </Modal>
    </>
  )
}
export default Publish