import styled from './style.module.scss'
import { useState, useEffect } from 'react'
import { Divider, Tag, message } from 'antd';

const TagDialog = (props) => {
  const { onChoice, onClose, tags } = props
  useEffect(() => {
    setMyTag(tags)
  }, [])
  const [myTag, setMyTag] = useState([])
  const [allTag] = useState([
    {
      name: "7号线",
      id: 1
    },
    {
      name: "大阳台",
      id: 2
    },
    {
      name: "能做饭",
      id: 3
    },
    {
      name: "全自动洗衣机",
      id: 4
    },
    {
      name: "1号线",
      id: 5
    },
    {
      name: "2号线",
      id: 6
    },
    {
      name: "3号线",
      id: 7
    },
    {
      name: "4号线",
      id: 8
    },
    {
      name: "可短租",
      id: 9
    },
    {
      name: "室友nice",
      id: 10
    },
    {
      name: "两居室",
      id: 11
    },
    {
      name: "押一付一",
      id: 12
    },
  ])
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