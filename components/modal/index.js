import Createportal from '../createPortal'
import Styled from './style.module.scss'

const Modal = (props) => {
  const { show, children, onClose } = props
  return <>
    {
      show ? <Createportal >
        <div className={Styled.modal}>
          {children}
        </div>
      </Createportal> : null
    }
  </> 
}

export default Modal