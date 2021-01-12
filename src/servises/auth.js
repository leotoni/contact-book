class AuthService {
  getUser() {
    return JSON.parse(localStorage.getItem('user')) || '';
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  deleteUser() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();
