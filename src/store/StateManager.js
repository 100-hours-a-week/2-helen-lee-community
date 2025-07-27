/**
 * 전역 상태 관리 시스템 (Observer 패턴)
 */
class StateManager {
  constructor(initialState = {}) {
    this.state = { ...initialState };
    this.subscribers = [];
    this.reducers = {};
  }

  /**
   * 상태 구독
   */
  subscribe(callback) {
    this.subscribers.push(callback);

    // 구독 해제 함수 반환
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    };
  }

  /**
   * 현재 상태 반환
   */
  getState() {
    return { ...this.state };
  }

  /**
   * 상태 업데이트
   */
  setState(newState) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };

    if (this._hasStateChanged(prevState, this.state)) {
      this.notifySubscribers();
    }
  }

  /**
   * 액션 디스패치
   */
  dispatch(action) {
    if (!action || !action.type) {
      throw new Error("액션은 type 속성을 가져야 합니다.");
    }

    const reducer = this.reducers[action.type];
    if (reducer) {
      const newState = reducer(this.state, action);
      this.setState(newState);
    }
  }

  /**
   * 리듀서 등록
   */
  addReducers(reducers) {
    Object.entries(reducers).forEach(([actionType, reducer]) => {
      this.reducers[actionType] = reducer;
    });
  }

  /**
   * 구독자들에게 알림
   */
  notifySubscribers() {
    this.subscribers.forEach((callback) => {
      try {
        callback(this.state);
      } catch (error) {
        console.error("구독자 콜백 실행 중 오류:", error);
      }
    });
  }

  /**
   * 상태 변경 여부 확인
   */
  _hasStateChanged(prevState, currentState) {
    return JSON.stringify(prevState) !== JSON.stringify(currentState);
  }
}

export { StateManager };
