const rootState = {
  isLoading: false,
  error: null,
  message: null,
};

const authInitialState = {
  ...rootState,
  isAuthenticated: false,
  exp: 0,
  tokens: null,
  user: null,
};


export {
  authInitialState,
}