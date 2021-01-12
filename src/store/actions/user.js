function log() {
  return dispatch => fetch('http://localhost:3001/profile')
    .then(resp => resp.json())
    .then((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'ON_LOGIN', payload: user });
    });
}

function logout() {
  return (dispatch) => {
    dispatch({ type: 'ON_LOGOUT' });
  };
}

export { log, logout };
