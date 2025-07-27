import { BaseState } from "./BaseState";

class UserState extends BaseState {
  static getInitialState() {
    return {
      user: null,
      isLoggedIn: false,
      loginError: null,
    };
  }

  constructor() {
    super(UserState.getInitialState());
    this.loadFromSession();
  }

  // 세션에서 사용자 정보 로드
  loadFromSession() {
    try {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      if (userData) {
        this.setState({
          user: userData,
          isLoggedIn: true,
        });
      }
    } catch (error) {
      console.error("세션 데이터 로드 실패:", error);
    }
  }

  // 로그인
  login(userData) {
    sessionStorage.setItem("user", JSON.stringify(userData));
    this.setState({
      user: userData,
      isLoggedIn: true,
      loginError: null,
    });
  }

  // 로그아웃
  logout() {
    sessionStorage.removeItem("user");
    this.setState({
      user: null,
      isLoggedIn: false,
      loginError: null,
    });
  }

  // 로그인 에러
  setLoginError(error) {
    this.setState({ loginError: error });
  }

  // 사용자 정보 업데이트
  updateUser(updates) {
    const updatedUser = { ...this.state.user, ...updates };
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
    this.setState({ user: updatedUser });
  }

  // 편의 메서드들
  getCurrentUser() {
    return this.state.user;
  }

  isAuthenticated() {
    return this.state.isLoggedIn && this.state.user;
  }

  getUserId() {
    return this.state.user?.user_id;
  }

  getNickname() {
    return this.state.user?.nickname || "게스트";
  }
}

const userState = new UserState();

export default userState;
