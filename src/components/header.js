import { navigateTo } from "../router.js";
import backButton from '../assets/back_button.png';

export default function Header () {
    const header = document.getElementById("header");
    
    header.innerHTML = `
    <div class="header-div">
        <img id="back-button" src=${backButton} alt="" height="45"/>
        <h1>조잘조잘</h1>
        <div id="profile"></div>
    </div>
  
    `;

    const Profile = document.getElementById("profile")
    const ProfileImage = document.createElement("img")

    /** 유저 프로필 */
    if (sessionStorage.getItem("user")) {
        ProfileImage.src = JSON.parse(sessionStorage.getItem("user")).profile_image_url;
        ProfileImage.classList.add("profile-image")
    }
   
    
    Profile.appendChild(ProfileImage)

    ProfileImage.addEventListener("click", ()=> navigateTo('/profile'))

    // 스크롤 시 헤더 스타일 변경
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    });

    /** 뒤로 가기 이벤트 */
    const BackButton = document.getElementById("back-button");
    BackButton.addEventListener('click', () => history.back())

}