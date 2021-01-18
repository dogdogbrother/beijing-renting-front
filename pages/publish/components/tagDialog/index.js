import styled from './style.module.scss'
import { useState, useEffect } from 'react'
import { Divider, Tag, message } from 'antd';
import http from '../../../../http/http'

const TagDialog = (props) => {
  const { onChoice, onClose, tags } = props
  useEffect(() => {
    setMyTag(tags)
    http.get("/tag").then(res => {
      setAllTag(res || [])
    })
  }, [])
  const [myTag, setMyTag] = useState([])
  const [allTag, setAllTag] = useState([])
  function addTag(tag) {
    if (myTag.length > 7) {
      return message.warning('标签最多只能有8个');
    }
    setMyTag([...myTag, tag])
  }
  function removeTag(id) {
    setMyTag(myTag.filter(tag => tag.id !== id))
  }
  function confirm() {
    onClose(false)
    onChoice(myTag)
  }
  return <div className={styled.wrap}>
    <p className={styled.description}>最多能选择8个标签,前三个标签会作为房屋展示</p>
    <section>
      <label>拥有的标签</label>
      <div className={styled.tagBox}>
        {
          myTag.map(tag => <Tag className="m-y-5" key={tag.id} closable onClose={() => removeTag(tag.id)}>{tag.name}</Tag>)
        }
      </div>
    </section>
    <Divider />
    <section>
      <label>全部的标签</label>
      <div className={styled.tagBox}>
        {
          allTag.filter(tag => !myTag.find(t => t.id === tag.id))
          .map(tag => <Tag className="m-y-5 hand" key={tag.id} onClick={() => addTag(tag)}>{tag.name}</Tag>)
        }
      </div>
    </section>
    <Divider />
    <div className={styled.btn}>
      <p onClick={confirm}>确 定</p>
    </div>
  </div>
}

export default TagDialog