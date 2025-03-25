import Button from "../../../components/Button";
import CONFIG from "../../../config";

export default function UserItem ({nickname, profile_image, created_at,comment_id, post_id}) {


    const current_user = JSON.parse(sessionStorage.getItem("user")).nickname;
    console.log(sessionStorage.getItem("user"));
    const userItemMeta = document.createElement("div")
    userItemMeta.classList.add("userItem-meta");

    userItemMeta.innerHTML = `
    <div class= "userItem-meta-div">
        <div class="userItem-profile-placeholder"></div>
        <span class="userItem-author">${nickname}</span>
        <span class="userItem-date">${created_at}</span>
    </div>
        ${current_user === nickname ?  
            `<div class ="userItem-button-div">
                <div class="userItem-edit-button-div"></div>
                <div class="userItem-delete-button-div"></div>
            </div>` : `<span></span>`
        }
    `
    const UserItemButtonDiv = userItemMeta.querySelector(".userItem-button-div");

    // 계정 주인의 유저 정보일 경우
    if (UserItemButtonDiv) {
          /** 댓글 삭제 */
        const UserItemDeleteButton = Button({
            text: "삭제",
            onClick: () => {deleteComment(comment_id,post_id)},
            className: "userItem-edit-button",
        });

        const UserItemEditButtonDiv = userItemMeta.querySelector(".userItem-edit-button-div");
        UserItemEditButtonDiv.appendChild(UserItemDeleteButton);
    }
    
   

    /** 댓글 수정 */
    // const UserItemEditButton = Button({
    //     text: "삭제",
    //     onClick: deleteComment(),
    //     className: "userItem-edit-button"
    // });

    // const userItemEditButtonDiv = document.getElementById("userItem-edit-button-div");
    // userItemEditButtonDiv.appendChild(userItemDeleteButton);
    

     /** 댓글 삭제 함수 */
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

    return userItemMeta
}
