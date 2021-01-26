import { useState, useRef } from 'react'
import http from '../../http/http'
import styled from './style.module.scss'
import Modal from '../../components/modal'
import TagDialog from './components/tagDialog'
import AccurateDialog from './components/accurateDialog'
import { PlusOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { Tag, message, Select } from 'antd';
import { dealImage } from '../../help/help'
import Router from 'next/router'
import { formVerify } from'../../help/verify'

const Publish = () => {
  const [loading, setLoading] = useState(false)
  const [tagDialog, setTagDialog] = useState(false)
  const [accurateDialog, setAccurateDialog] = useState(false)  // accurate 精准
  const [communityOptions, setCommunityOptions] = useState([])  // 街道的下拉选项
  const [accurateValue, setAccurateValue] = useState("")
  const [roomImgs, setRoomImgs] = useState([])
  const [verify, setVerify] = useState("")  // 校验失败显示的内容
  const inputRef = useRef()
  const fileRef = useRef()
  const [form, setForm] = useState({
    /**
     *  @description 小区信息,input输入后,弹出对话框,选择高德地图提供的结果,放到这里面.
     *               对象里面的几个参数都有用,例如名字,所在的区,id,坐标等等,解构后给后端
     */
    region: new Object(), 
    community: "", // 街道,通过 region.adcode 向高德申请而来
    buildNumber: "",  // 楼栋号
    cellNumber: "",  // 单元号
    houseNumber: "",  // 门牌号
    rental: "",  // 出租价格
    describe: "",  // 描述
    _phone: "",  // 因为直接 name=phone 的话 样式会有问题,提交的时候还要变成phone
    nickname: "", // 称呼方式
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
  // 精准定位的dialog成功回调,除了要赋值给input,还要请求街道信息
  function onAccurate(region) {
    setAccurateDialog(false)
    setForm({
      ...form,
      region
    })
    inputRef.current.value = region.name
    setCommunityOptions([])
    http.get("http://restapi.amap.com/v3/config/district", {
      params: {
        key: "4fb4ccdb42fc6d32764e91a17b805776",
        keywords: region.adcode,
      },
      noToken: true
    }).then(res => {
      setCommunityOptions(res.districts[0].districts.map(district => district.name))
    })
  }
  function onInput(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  function selectImage(e) {
    if (roomImgs.length + e.target.files > 6) {
      return message.warning('最多只能上传6张照片');
    }
    const imgTmp = [...roomImgs]
    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      reader.onload = function(ev) {
        imgTmp.push(ev.target.result)
        if (i === (e.target.files.length - 1)) {
          setRoomImgs(imgTmp)
        }
      }
      reader.readAsDataURL(e.target.files[i]);
    }
  }
  function removeImg(index) {
    const arr = [...roomImgs]
    arr.splice(index, 1)
    setRoomImgs(arr)
  }
  function onSubmit() {
    if (formVerify(form, roomImgs, setVerify)) return
    const { _phone, region, ...surplus } = form
    const postData = {
      phone: _phone,
      ...surplus,
      adcode: region.adcode,
      address: region.address,
      district: region.district,
      locationId: region.id,
      location: region.location,
      locationName: region.name,
      tags: tags.map(tag => tag.id)  //  
    }
    setLoading(true)
    // 利用 Promise 把所有的图片进行压缩,压缩成功后再发送请求
    Promise.all(roomImgs.map(img => {
      return dealImage(img)
    })).then(picture => {
      http.post("/house/add", {...postData, picture}).then(res => {
        setLoading(false)
        Router.push(`/room/${res.houseId}`)
      }).catch(() => {
        setLoading(false)
      })
    })
  }
  function changeCommunity(value) {
    setForm({
      ...form,
      community: value
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
            <input ref={inputRef} placeholder="请输入小区名" onBlur={openGaode} onKeyUp={onEnter} autoComplete="off"/>
          </li>
          {
            communityOptions.length ? <li>
              <span>街道</span>
              <Select 
                style={{width: "100%"}} 
                bordered={false} 
                placeholder="点击选择对应的街道" 
                onChange={changeCommunity}>
                {
                  communityOptions.map(item => <Select.Option value={item} key={item}>{item}</Select.Option>)
                }
                
              </Select>
            </li> : null
          }
          <li>
            <span>详细地址</span>
            <div className={styled.inputBox}>
              <input placeholder="请输入楼栋号" name="buildNumber" onInput={onInput} autoComplete="off"/>
              <input placeholder="请输入单元号" type="number" name="cellNumber" onInput={onInput} autoComplete="off"/>
              <input placeholder="请输入门牌号" type="number" name="houseNumber" onInput={onInput} autoComplete="off"/>
            </div>
          </li>
          <li>
            <span>出租价格</span>
            <input placeholder="单位/元,不能输入区间" type="number" name="rental" onInput={onInput} autoComplete="off"/>
          </li>
          <li>
            <span>房屋描述</span>
            <input placeholder="简单描述即可,50字以内" name="describe" onInput={onInput} autoComplete="off"/>
          </li>
          <li>
            <span>联系方式</span>
            <input placeholder="请输入手机号" type="number" name="_phone" onInput={onInput} autoComplete="off"/>
          </li>
          <li>
            <span>称呼方式</span>
            <input placeholder="李先/生张女士/奥特曼 之类的随意" name="nickname" onInput={onInput} autoComplete="off"/>
          </li>
          <li>
            <span className={styled.heightLabel}>房屋标签</span>
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
          <li>
            <span className={styled.heightLabel}>房屋图片</span>
            <div className={styled.imgBox}>
              {
                roomImgs.map((img, index) => (
                  <div key={index} className={styled.img} style={{backgroundImage: `url(${img})`}}>
                    {/* 遮罩层里面放删除icon */}
                    <CloseCircleOutlined onClick={() => removeImg(index)}/>
                  </div>
                ))
              }
              {
                roomImgs.length >= 6 ? null : (
                  <div className={styled.imgBtn}>
                    <div>
                      <PlusOutlined />
                    </div>
                    <input type="file" ref={fileRef} onChange={selectImage} accept="image/*" multiple />
                  </div>
                )
              }
            </div>
          </li>
        </ul>
        <p className={styled.verify}>{verify}</p>
      </section>
      {
        loading ? <div className={styled.submitButton}><LoadingOutlined /></div> :
        <div className={styled.submitButton} onClick={onSubmit}>发布出租委托</div>
      }
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