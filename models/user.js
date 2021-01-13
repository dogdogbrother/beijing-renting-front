export default {
  namespace: 'user',
  state: {
    loginStatus: false,
    id: null,
    username: null
  },
  reducers: {
    'setStatus'(state, { payload }) {
      return { ...state, ...payload }
    },
  },
};