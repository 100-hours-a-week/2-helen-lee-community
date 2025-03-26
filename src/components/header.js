import { navigateTo } from "../router.js";

export default function Header () {
    const header = document.getElementById("header");
    
    header.innerHTML = `
    <div class="header-div">
        <h1>조잘조잘</h1>
        <div id="profile"></div>
    </div>
  
    `;

    const Profile = document.getElementById("profile")
    const ProfileImage = document.createElement("img")
    ProfileImage.src = JSON.parse(sessionStorage.getItem("user")).profile_image_url;
    ProfileImage.classList.add("profile-image")
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

}