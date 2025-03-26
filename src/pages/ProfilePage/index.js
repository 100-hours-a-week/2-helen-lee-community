import Button from "../../components/Button.js";
import CONFIG from "../../config.js";
import { navigateTo } from "../../router.js";

export default function ProfilePage () {
    const app = document.getElementById("app");
    const nickname = JSON.parse(sessionStorage.getItem("user")).nickname;
    const profile_image_url = JSON.parse(sessionStorage.getItem("user")).profile_image_url;
    app.innerHTML = `
    <div class="profile-container">
        <h2>회원정보수정</h2>
        <p>프로필 사진*</p>
         <form class="profile-form">
        <div class="profile-picture-div">
            <div class="profile-picture">
                <button class="profile-change-btn">변경</button>
            </div>
        </div>

            <label>이메일</label>
            <input type="email" value="startupcode@gmail.com" disabled>

            <label>닉네임</label>
            <input id="nickname-input" type="text" value=${nickname}>
        </form>
        <div class="profile-completed-button-div"></div>
    </div>
    `;

    const changeBtn = document.querySelector(".profile-change-btn");

    // 파일 인풋 생성 및 숨김
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    // "변경" 버튼 누르면 파일 선택창 열기
    changeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        fileInput.click();
    });

    const ProfilePicture = document.querySelector(".profile-picture");

    ProfilePicture.style.backgroundImage = `url('${profile_image_url}')`;
    ProfilePicture.style.backgroundSize = "cover";
    ProfilePicture.style.backgroundPosition = "center";
  
    const ProfileForm = document.querySelector(".profile-form");

    const EditButton = Button({
        text : "수정하기",
        onClick: () => {editProfile();}
    })
    const DeleteButton = Button({
        text : "회원탈퇴",
        onClick: () => {

            alert("정말 탈퇴하시겠어요?" );
        },
        className: "profile-deleted-btn"
    })

    ProfileForm.appendChild(EditButton)
    ProfileForm.appendChild(DeleteButton)
  


    /** 회원 정보 수정 */
     async function editProfile () {
        try {
            const form = document.getElementById("profile-form");
            const user_id = JSON.parse(sessionStorage.getItem("user")).user_id;
            const nicknameInput = document.getElementById("nickname-input");
            const formData = new FormData();
            formData.append('nickname', nicknameInput.value.trim())

            if (fileInput.files.length > 0) {
                formData.append('profile_image_url', fileInput.files[0]);
            }
            

            const res = await fetch(`${CONFIG.API_URL}/users/${user_id}`,
                {
                    method: "PATCH",
                    body: formData
                }
            )
            
            if (!res.ok) throw new Error("서버 응답 실패");

            else {
                alert("수정 완료!");
                navigateTo("boards");
            }
            
        } catch(err) {
            console.log(err);
            alert("정보 수정 실패");
        }
    }

}