import Button from "../../components/Button.js";
import CONFIG from "../../config.js";
import { navigateTo } from "../../router.js";

export default function RegisterPage() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="register-container">
            <h2>회원가입</h2>
            <form id="register-form" class="register-form">
                <label>프로필 사진</label>
                <input name="image" type="file" class="profile-upload">

                <label>이메일*</label>
                <input name="email" type="email" id="email" placeholder="이메일을 입력하세요">
                <span class="error-message" id="email-error"></span>

                <label>비밀번호*</label>
                <input name="password" type="password" id="password" placeholder="비밀번호를 입력하세요">
                <span class="error-message" id="password-error"></span>

                <label>비밀번호 확인*</label>
                <input name="password-confirm" type="password" id="password-confirm" placeholder="비밀번호를 다시 입력하세요">
                <span class="error-message" id="password-confirm-error"></span>

                <label>닉네임*</label>
                <input name="nickname" type="text" id="nickname" placeholder="닉네임을 입력하세요">
                <span class="error-message" id="nickname-error"></span>

                <div id="button-container"></div>
            </form>
            <p>이미 계정이 있으신가요? <a href="/" id="login-link">로그인</a></p>
        </div>
    `;

    // 버튼 생성 및 추가
    const registerButton = Button({
        text: "회원가입",
        onClick: (e) => {
            e.preventDefault();
            validateForm();
        },
    });
    document.getElementById("button-container").appendChild(registerButton);

    document.getElementById("login-link").addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo("/");
    });
}

function validateForm() {
    const profile_image_url = document.getElementById("profile-upload");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    const nickname = document.getElementById("nickname").value;

    let isValid = true;

    // 이메일
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        document.getElementById("email-error").textContent = "올바른 이메일 주소를 입력해주세요.";
        isValid = false;
    } else {
        document.getElementById("email-error").textContent = "";
    }

    // 비밀번호
    if (password.length < 8 || password.length > 20 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
        document.getElementById("password-error").textContent = "비밀번호는 8~20자이며, 대소문자/숫자/특수문자를 포함해야 합니다.";
        isValid = false;
    } else {
        document.getElementById("password-error").textContent = "";
    }

    // 비밀번호 확인 불일치
    if (password !== passwordConfirm) {
        document.getElementById("password-confirm-error").textContent = "비밀번호가 일치하지 않습니다.";
        isValid = false;
    } else {
        document.getElementById("password-confirm-error").textContent = "";
    }

    // 닉네임
    if (!/^[^\s]{1,10}$/.test(nickname)) {
        document.getElementById("nickname-error").textContent = "닉네임은 띄어쓰기 없이 최대 10자까지만 가능합니다.";
        isValid = false;
    } else {
        document.getElementById("nickname-error").textContent = "";
    }

    // 회원가입 요청
    if (isValid) {
       requestRegister()
    }
}

// 회원가입 요청 함수
async function requestRegister() {
    //{email,password,nickname,profile_image_url}
   

    const form = document.getElementById('register-form');
    const formData = new FormData();

    formData.append('email', form.email.value);
    formData.append('password', form.password.value);
    formData.append('nickname', form.nickname.value);

    if (form.image.files.length > 0) {
        formData.append('profile_image_url', form.image.files[0]);
    }

    try {
        const response = await fetch(`${CONFIG.API_URL}/users`, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            navigateTo("/");
        } else {
            alert("회원가입 실패: 입력을 확인하세요.");
        }
    } catch (error) {
        alert("회원가입 오류! 서버에 문제가 발생했습니다.");
    }

}
