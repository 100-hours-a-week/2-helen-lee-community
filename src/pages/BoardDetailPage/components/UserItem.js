export default function UserItem ({nickname, profile_image, created_at}) {
    const current_user = 'hyemi'
    const userItemMeta = document.createElement("div")
    userItemMeta.classList.add("userItem-meta")

    userItemMeta.innerHTML = `
    <div class= "userItem-meta-div">
        <div class="userItem-profile-placeholder"></div>
        <span class="userItem-author">${nickname}</span>
        <span class="userItem-date">${created_at}</span>
    </div>
        ${current_user === nickname ?  
            `<div class ="userItem-button-div">
                <button class="userItem-edit-button">수정</button>
                <button class="userItem-edit-button">삭제</button>
            </div>` : `<span></span>`
        }
    `

    return userItemMeta
}
