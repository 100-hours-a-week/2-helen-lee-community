import { navigateTo } from "../router.js";
import backButton from "../assets/back_button.png";
import userState from "../store/UserState.js";

export default function Header() {
  const header = document.getElementById("header");

  // 렌더링 함수 - 항상 최신 상태로 렌더링
  function renderHeader() {
    const user = userState.getCurrentUser();
    const isLoggedIn = userState.isAuthenticated();

    header.innerHTML = `
        <div class="header-div">
            <img id="back-button" src="${backButton}" alt="" height="45"/>
            <h1>조잘조잘</h1>
            <div id="profile">
                ${
                  isLoggedIn && user?.profile_image_url
                    ? `<img src="${user.profile_image_url}" class="profile-image" alt="프로필" />`
                    : ""
                }
            </div>
        </div>
        `;

    // 이벤트 설정
    setupEvents();
  }

  function setupEvents() {
    // 뒤로가기
    const backBtn = document.getElementById("back-button");
    backBtn?.addEventListener("click", () => history.back());

    // 프로필 클릭
    const profileImg = document.querySelector(".profile-image");
    profileImg?.addEventListener("click", () => navigateTo("/profile"));

    // 스크롤 이벤트
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    });
  }

  // 1. 즉시 렌더링
  renderHeader();

  // 2. UserState 변화 구독 → 자동 리렌더링
  const unsubscribe = userState.subscribe(() => {
    renderHeader(); // 상태 바뀌면 다시 렌더링
  });

  // 정리 함수 저장 (필요시 사용)
  header._cleanup = unsubscribe;
}
