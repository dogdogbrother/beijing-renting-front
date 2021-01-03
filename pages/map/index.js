import { useEffect } from 'react'
const Map = () => {
  useEffect(() => {
    new AMap.Map('container', {
      zoom:11, //级别
      center: [116.397428, 39.90923], //中心点坐标
    });
  }, [])
  return (
    <>
      <div id="container" style={{height: "100vh"}}></div>
    </>
  )
}

export default Map