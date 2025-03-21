
import Button from "../../components/Button.js";
import { navigateTo } from "../../router.js";
import Config from "../../config.js";
import validateEmail from "../../utils/validation/validateEmail.js";

export default function LoginPage() {
    const app = document.getElementById("app");

    app.innerHTML = `
    <div class="login-container" id= "login-container">
        <h2>로그인</h2>
        <form class="login-form" id = "login-form">
            <label>이메일</label>
            <input type="email" placeholder="이메일을 입력하세요" id="email"></input>
            <span class="error-message" id="email-error"></span>
            <label>비밀번호</label>
            <input type="password" placeholder="비밀번호를 입력하세요" id = "password"></input>
            <span class="error-message" id="password-error"></span>
        </form>
        <span class="error-message" id="login-error"></span>
        <p>
        아직 회원이 아니신가요? 
        <a href="/register" id="register-link">회원가입</a> 
        </p>
    </div>
    
    `
    const loginForm = document.getElementById("login-form")
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const loginError = document.getElementById("login-error");

    const submitButton = Button({
        type: "submit",
        text: "로그인",
    })
    loginForm.appendChild(submitButton);

     // 이메일 유효성 검사 함수
    
    // 로그인 버튼 클릭
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // 기존 에러 메시지 초기화
        emailError.textContent = "";
        passwordError.textContent = "";
        loginError.textContent = "";
      
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;

        // 이메일 유효성 검사
        if (!email) {
            emailError.textContent = "* 이메일을 입력해주세요.";
            isValid = false;
        } else if (!validateEmail(email)) {
            emailError.textContent = "* 올바른 이메일 형식을 입력해주세요.";
            isValid = false;
        }

        // 비밀번호 유효성 검사
        if (!password) {
            passwordError.textContent = "* 비밀번호를 입력해주세요.";
            isValid = false;
        }

        if (!isValid) return;

        // 로그인 요청
        try {
                
             const response = await fetch(`${Config.API_URL}/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // 로그인 성공
                const data = await response.json(); // 파싱
                sessionStorage.setItem("user",JSON.stringify(data) ); // 세션 스토리지에 로그인 정보 저장
                navigateTo("/boards");
            } else if (response.status == 401) {
                loginError.textContent = "이메일과 비밀번호를 확인해주세요.";
            } 
        } catch (error) {
            console.error("로그인 요청 중 오류 발생:", error);
            loginError.textContent = "서버 오류가 발생했습니다.";
        }
    });


    const registerLink = document.getElementById("register-link")

    registerLink.addEventListener("click", (e) => {
        e.preventDefault(); // 기본 href 이동 방지
        navigateTo("/register");
    });

}