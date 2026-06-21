export const initialAuthState={
  user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
}

const AuthActions={
  SIGN_UP:(state,action)=>{
     return{
      ...state,
      user:action.payload,
    }
  },
  LOG_IN:(state,action)=>{
     return{
      ...state,
      user:action.payload,
    }
  },
  LOGOUT:(state,action)=>{
        localStorage.removeItem('user')
    return{
      ...state,
      user:null
    }
  }
}


export const AuthReducer=(state,action)=>{
  const actionFunction=AuthActions[action.type];
  return actionFunction?actionFunction(state,action):state;
};