import Button from "../../components/Button.js";
import CONFIG from "../../config.js";
import { navigateTo } from "../../router.js";

export default function ProfilePage () {
    const app = document.getElementById("app");
    app.innerHTML = `
    <div class="profile-container">
        <h2>회원정보수정</h2>
        <p>프로필 사진*</p>
        <div class="profile-picture-div">
            <div class="profile-picture">
                <button class="profile-change-btn">변경</button>
            </div>
        </div>

        <form class="profile-form">
            <label>이메일</label>
            <input type="email" value="startupcode@gmail.com" disabled>

            <label>닉네임</label>
            <input id="nickname-input" type="text" value="스타트업코드">
        </form>
        <div class="profile-completed-button-div"></div>
    </div>
    `;

    const ProfileCompletedButtonDiv = document.querySelector(".profile-completed-button-div");

    const profileCompletedButton = Button({
        text: "수정완료",
        onClick: () => {console.log('수정 완료')},
        className: "profile-completed-button"
    })

    const ProfileForm = document.querySelector(".profile-form");

    const EditButton = Button({
        text : "수정하기",
        onClick: () => {editProfile();}
    })
    const DeleteButton = Button({
        text : "회원탈퇴",
        onClick: () => {console.log(탈퇴하기)},
        className: "profile-deleted-btn"
    })

    ProfileForm.appendChild(EditButton)
    ProfileForm.appendChild(DeleteButton)
    ProfileCompletedButtonDiv.appendChild(profileCompletedButton)


    /** 회원 정보 수정 */
     async function editProfile () {
        try {
            
            const user_id = JSON.parse(sessionStorage.getItem("user")).user_id;
            const nicknameInput = document.getElementById("nickname-input");
            const res = await fetch(`${CONFIG.API_URL}/users/${user_id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nickname: nicknameInput.value.trim()
                    })
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