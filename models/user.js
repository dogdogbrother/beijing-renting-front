export default {
  namespace: 'user',
  state: {
    loginStatus: false,
    id: null,
    username: null,
    collectHouse: []  // 已收藏的房间
  },
  reducers: {
    'setStatus'(state, { payload }) {
      return { ...state, ...payload }
    },
    'setLogOut'() {
      return {
        loginStatus: false,
        id: null,
        username: null,
        collectHouse: []
      }
    }
  }
};