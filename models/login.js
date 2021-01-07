export default {
  namespace: 'login',
  state: {
    dialogStatus: false,
    loginForm: {
      username: "",
      password: ""
    },
    registerForm: {
      username: "",
      password: "",
      affirmPassword: ""
    }
  },
  reducers: {
    'setStatus'(state, {payload}) {
      return {...state, dialogStatus: payload}
    },
    'setTitle'(state, {payload}) {
      console.log(payload);
      return {...state, title: payload}
    },
    'setForm'(state, {payload}) {
      return {...state, payload}
    },
  },
};