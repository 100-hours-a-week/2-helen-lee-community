class BaseState {
  constructor(initialState = {}) {
    this.state = { ...initialState };
    this.listeners = new Set();
  }

  // 상태 조회
  getState() {
    return { ...this.state };
  }

  // 상태 업데이트
  setState(newState) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };
    this.notifyListeners(this.state, prevState);
  }

  // 리스너 등록
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // 리스너들에게 알림
  notifyListeners(newState, prevState) {
    this.listeners.forEach((listener) => listener(newState, prevState));
  }

  // 상태 초기화
  reset() {
    this.setState(this.constructor.getInitialState());
  }

  // 정리
  destroy() {
    this.listeners.clear();
    this.state = {};
  }
}

export { BaseState };
