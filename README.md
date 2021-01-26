# 接口列表
## 用户模块
### 1.注册
请求:
```js
axios.post("user/register", {data: {
  username: "senlin",
  password: "123456"
}})
```
相应:
```json
{
  "username": "senlin",
  "id": 1
}
```
### 2.登录
API为 `user/login`,其余和注册一致.

> 注册和登录都会返回 `token` 字段,把此字段放在请求头 token 中,作为登录校验.

## 租房模块


## 标签模块
### 获取全部标签
1. 请求
```js
axios.get("tag")
```

2. 相应
```json
[
  {
    "name": "7号线",
    "id": 1
  },
  {
    "name": "大阳台",
    "id": 2
  }
]
```

# 项目相关

## 主题色
本来的主题色是链家的绿色,但是因为改不动antd的主题色,故改成antd的 `#1890ff`,如果需要高亮的话,给 `#189aff`