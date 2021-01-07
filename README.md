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
