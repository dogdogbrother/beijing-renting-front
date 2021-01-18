export function formVerify(form, roomImgs=[], setVerify) {
  setVerify("")
  if (!form.region.id) {
    return setVerify("无效的小区名,必须从对话框中选择小区哦")
  }
  if (!form.community) {
    return setVerify("请选择所在的街道")
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
  if (!roomImgs.length) {
    return setVerify("至少要传一张房间图片")
  }
  return false
}