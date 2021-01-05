import { useRouter } from 'next/router'
import Styled from './style.module.scss'
import { Carousel } from 'antd';

const Room = () => {
  const router = useRouter()
  const { id } = router.query
  return <main className={Styled.roomWrap}>
    <h2>整租·红旗小区 2室1厅</h2>
    <small>房屋编号: 89757</small>
    <div className={Styled.roomView}>
      <Carousel className={Styled.Carousel} autoplay={true}>
        <div>
          <img src="http://app-iyoo-test.oss-cn-beijing.aliyuncs.com/app-banner/2020-10-22-18-22-38-5f915d6ecb8d9-banner.jpeg" />
        </div>
        <div>
          <img src="http://app-iyoo-test.oss-cn-beijing.aliyuncs.com/app-banner/2020-10-22-18-22-38-5f915d6ecb8d9-banner.jpeg" />
        </div>
        <div>
          <img src="http://app-iyoo-test.oss-cn-beijing.aliyuncs.com/app-banner/2020-10-22-18-22-38-5f915d6ecb8d9-banner.jpeg" />
        </div>
      </Carousel>
    </div>
  </main>
}

export default Room