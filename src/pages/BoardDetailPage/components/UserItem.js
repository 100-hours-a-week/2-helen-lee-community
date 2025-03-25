import Button from "../../../components/Button";
import CONFIG from "../../../config";
import { navigateTo } from "../../../router";
import formatDate from "../../../utils/date/formatDate";

/** 재사용되는 유저 프로필 항목.
 * 
 * 현재 로그인 된 유저의 항목일 경우:
 * 댓글일 경우 post_id, comment_id가 parameter 로 전달되고 
 * 게시글에서 사용될 경우 comment_id가 전달되지 않아, 이를 기반으로 구분한다.
 **/
export default function UserItem ({nickname, profile_image_url, created_at,comment_id, post_id}) {

    const current_user = JSON.parse(sessionStorage.getItem("user")).nickname;
    console.log(sessionStorage.getItem("user"));
    const userItemMeta = document.createElement("div")
    userItemMeta.classList.add("userItem-meta");

    userItemMeta.innerHTML = `
    <div class= "userItem-meta-div">
        <div class="userItem-profile-placeholder"></div>
        <span class="userItem-author">${nickname}</span>
        <span class="userItem-date">${formatDate(created_at)}</span>
    </div>
        ${current_user === nickname ?  
            `<div class ="userItem-button-div">
                <div class="userItem-edit-button-div"></div>
                <div class="userItem-delete-button-div"></div>
            </div>` : `<span></span>`
        }
    `

const UserItemProfileHolder = userItemMeta.querySelector(".userItem-profile-placeholder");
const profileImageUrl = profile_image_url || null;

UserItemProfileHolder.style.backgroundImage = `url('${profileImageUrl}')`;
UserItemProfileHolder.style.backgroundSize = "cover";
UserItemProfileHolder.style.backgroundPosition = "center";
UserItemProfileHolder.style.width = "40px";
UserItemProfileHolder.style.height = "40px";
UserItemProfileHolder.style.borderRadius = "50%";
console.log(profileImageUrl);


    const UserItemButtonDiv = userItemMeta.querySelector(".userItem-button-div");

    // 계정 주인의 유저 정보일 경우
    if (UserItemButtonDiv) {
        const UserItemEditButtonDiv = userItemMeta.querySelector(".userItem-edit-button-div");

        // 댓글 항목일 경우
        if (comment_id) {
             /** 댓글 삭제 */
            const UserItemCommentDeleteButton = Button({
                text: "삭제",
                onClick: () => {deleteComment(comment_id,post_id)},
                className: "userItem-edit-button",
            });

            UserItemEditButtonDiv.appendChild(UserItemCommentDeleteButton);
        }

        // 게시글 항목일 경우
        else if (post_id) {
            const UserItemPostDeleteButton = Button({
                text: "삭제",
                onClick: () => {deletePost(post_id)},
                className: "userItem-edit-button",
            });

            UserItemEditButtonDiv.appendChild(UserItemPostDeleteButton);
        }  
    }

     /** 댓글 삭제 API FETCH */
     async function deleteComment (comment_id, post_id) {
        try {
            const res = await fetch(`${CONFIG.API_URL}/posts/${post_id}/comment/${comment_id}`,
                {method : "DELETE"}
            );
            
            if (!res.ok) throw new Error("댓글 삭제 실패");

            alert("댓글이 삭제되었습니다");
            window.location.reload();

        } catch (err) {
            console.log(err);
            alert("댓글 삭제 실패");
        }
    }

     /** 게시글 삭제 API FETCH */
     async function deletePost (post_id) {
        try {
            const res = await fetch(`${CONFIG.API_URL}/posts/${post_id}`,
                {method : "DELETE"}
            );
            
            if (!res.ok) throw new Error("게시글 삭제 실패");

            alert("게시글이 삭제되었습니다");
            navigateTo("/boards")

        } catch (err) {
            console.log(err);
            alert("댓글 삭제 실패");
        }
    }

    return userItemMeta
}
