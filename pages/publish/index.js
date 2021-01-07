import { useState } from 'react'
import styled from './style.module.scss'
import Modal from '../../components/modal'
import TagDialog from './components/tagDialog'
import { Tag } from 'antd';
const Publish = () => {
  const [tagDialog, setTagDialog] = useState(false)
  const [form, setForm] = useState({
    region: new Object(),  // 小区信息,input输入后,弹出对话框,选择高德地图提供的结果,放到这里面.
    buildNumber: "",
    cellNumber: "",
    houseNumber: "",
    describe: "",
    phone: "",
    
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
            <input placeholder="请输入小区名"/>
          </li>
          <li>
            <span style={{lineHeight: "45px"}}>详细地址</span>
            <div className={styled.inputBox}>
              <input placeholder="请输入楼栋号" type="number"/>
              <input placeholder="请输入单元号" type="number"/>
              <input placeholder="请输入门牌号" type="number"/>
            </div>
          </li>
          <li>
            <span>出租价格</span>
            <input placeholder="单位/元,不能输入区间" type="number"/>
          </li>
          <li>
            <span>房屋描述</span>
            <input placeholder="简单描述即可,50字以内"/>
          </li>
          <li>
            <span>联系方式</span>
            <input placeholder="请输入手机号" type="number"/>
          </li>
          <li>
            <span>称呼方式</span>
            <input placeholder="李先/生张女士/奥特曼 之类的随意"/>
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
      </section>
      <div className={styled.submitButton}>发布出租委托</div>
      <div style={{height: "20px"}}></div>
      <Modal show={tagDialog} close={() => {}} title="选择房屋标签">
        <TagDialog onChoice={onChoiceTag} onClose={onCloseTagDialog} tags={tags} />
      </Modal>
    </>
  )
}
export default Publish