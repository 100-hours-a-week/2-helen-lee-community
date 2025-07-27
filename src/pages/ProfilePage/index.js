import Button from "../../components/Button.js";
import CONFIG from "../../config.js";
import { navigateTo } from "../../router.js";
import userState from "../../store/UserState.js";

export default function ProfilePage() {
  const app = document.getElementById("app");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const user_id = user.user_id;

  app.innerHTML = `
        <div class="profile-container">
            <h2>회원정보수정</h2>
            <p>프로필 사진*</p>
            <form class="profile-form" id="profile-form">
                <div class="profile-picture-div">
                    <div class="profile-picture" id="profile-picture">
                        <button class="profile-change-btn">변경</button>
                    </div>
                </div>
                <label>닉네임</label>
                <input id="nickname-input" type="text" value="">
            </form>
            <div class="profile-completed-button-div"></div>
        </div>
    `;

  // 2. 요소 셀렉터들 미리 확보
  const profilePicture = document.getElementById("profile-picture");
  const nicknameInput = document.getElementById("nickname-input");
  const changeBtn = document.querySelector(".profile-change-btn");
  const profileForm = document.getElementById("profile-form");

  //     const unsubscribe = userState.subscribe((state) => {
  //         nicknameInput.
  //   });

  // 파일 인풋 생성
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  changeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fileInput.click();
  });

  /** 미리보기 설정 */
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      profilePicture.style.backgroundImage = `url('${previewUrl}')`;
      profilePicture.style.backgroundSize = "cover";
      profilePicture.style.backgroundPosition = "center";
    }
  });

  const EditButton = Button({
    text: "수정하기",
    onClick: () => {
      editProfile();
    },
  });

  const DeleteButton = Button({
    text: "회원탈퇴",
    onClick: () => {
      alert("정말 탈퇴하시겠어요?");
    },
    className: "profile-deleted-btn",
  });

  profileForm.appendChild(EditButton);
  profileForm.appendChild(DeleteButton);

  // 유저 정보 조회
  let profileData;
  async function getUserProfile() {
    try {
      const res = await fetch(`${CONFIG.API_URL}/users/${user_id}`, {
        method: "GET",
      });
      if (!res.ok) throw new Error("유저 정보 조회 실패");
      profileData = await res.json();

      // 세션 스토리지 정보 업데이트 (수정 완료 후 세션 스토리지 업데이트할 때)
      if (profileData.profileImageUrl != user.profile_image_url) {
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            nickname: profileData.nickname,
            profile_image_url: profileData.profileImageUrl,
          })
        );
        return;
      }

      profilePicture.style.backgroundImage = `url('${profileData.profileImageUrl}')`;
      profilePicture.style.backgroundSize = "cover";
      profilePicture.style.backgroundPosition = "center";
      nicknameInput.value = profileData.nickname;
    } catch (err) {
      console.error(err);
      alert("유저 정보를 불러오는 데 실패했습니다.");
    }
  }

  async function editProfile() {
    try {
      const formData = new FormData();
      formData.append("nickname", nicknameInput.value.trim());

      if (fileInput.files.length > 0) {
        formData.append("profile_image_url", fileInput.files[0]);
      }

      const res = await fetch(`${CONFIG.API_URL}/users/${user_id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) throw new Error("서버 응답 실패");

      userState.updateUser({
        user: formData,
        isLoggedIn: true,
        loginError: null,
      });

      alert("수정 완료!");
      navigateTo("boards");
      location.reload();
    } catch (err) {
      console.log(err);
      alert("정보 수정 실패");
    }
  }

  // 최초 호출
  getUserProfile();
}
