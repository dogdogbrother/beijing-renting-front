import Createportal from '../createPortal'
import Styled from './style.module.scss'
import { CloseOutlined } from '@ant-design/icons';
const Modal = (props) => {
  const { show, children, close } = props
  const onClose = ()=> {
    close()
  }
  return <>
    {
      show ? <Createportal >
        <div className={Styled.modal}>
          <div className={Styled.wrap}>
            <header>
              <span>登录</span>
              <CloseOutlined className={Styled.closeIcon} onClick={onClose}/>
            </header>
            {children}
          </div>
        </div>
      </Createportal> : null
    }
  </> 
}

export default Modal