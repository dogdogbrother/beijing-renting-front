import { useEffect } from 'react'
import ReactDOM from 'react-dom'
const CreatePortal = (props) => {
  const body = document.querySelector("body")
  const el = document.createElement("div")
  useEffect(() => {
    el.setAttribute("id", "portal-root")
    body.appendChild(el)
    return () => {
      body.removeChild(el)
    }
  }, [])
  return ReactDOM.createPortal(props.children, el)
}

export default CreatePortal;