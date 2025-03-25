import Button from "../../components/Button.js";
import CONFIG from "../../config.js";
import { navigateTo } from "../../router.js";
import UserItem from "../BoardDetailPage/components/UserItem.js";
export default async function BoardDetailPage (post_id) {
    const app = document.getElementById("app");
    console.log(post_id);
     //  게시글 데이터
     let postData;
     try {
         const res = await fetch(`${CONFIG.API_URL}/posts/${post_id}`,
             {method: "GET"}
         );
         if (!res.ok) throw new Error("서버 응답 실패");
         postData = await res.json(); 
         console.log(postData);
         
     
     } catch (err) {
         app.innerHTML = `<p>게시글을 불러오지 못했습니다.</p>`;
         console.error(err);
         return;
     }

    

    app.innerHTML = `
         <div class="boardItem-container">
            <h2 class="boardItem-title">${postData.title}</h2>
            <div id="userItem"></div>
            <hr class="boardItem-hr"/>
            <div class="boardItem-img"></div>
            <p class="post-content">${postData.post_content}</p>
            <div class="post-stats">
                <div class="stat-item"><strong>${postData.like_count}</strong> 좋아요수</div>
                <div class="stat-item"><strong>${postData.views_count}</strong> 조회수</div>
                <div class="stat-item"><strong>${postData.views_count}</strong> 댓글</div>
            </div>
            <hr class="boardItem-hr"/>
            <div class="comment-section">
                <textarea id="comment-input" class="comment-input" placeholder="댓글을 남겨주세요!"></textarea>
                <div class="comment-button-div"></div>
            </div>
            <div class="comment-list" id="comment-list"></div>
        </div>
    `;

       // 작성자 정보 출력
       const userItem = document.getElementById("userItem");
       userItem.appendChild(UserItem({
           nickname: postData.nickname,
           created_at: postData.created_at,
           profile_image: postData.profile_image_url,
           post_id: post_id,
           comment_id: postData.comment_id
       }));

    /** 댓글 렌더링 */
    async function renderComments(post_id) {
        const commentList = document.getElementById("comment-list");
        commentList.innerHTML = ""; // 기존 댓글 초기화
    
        try {
            const res = await fetch(`${CONFIG.API_URL}/posts/${post_id}/comment`, { method: "GET" });
            if (!res.ok) throw new Error("서버 응답 실패");
            const commentData = await res.json();
    
            commentData.forEach(comment => {
                commentList.appendChild(UserItem(comment,post_id));
    
                const commentContent = document.createElement("p");
                commentContent.classList.add("comment-content");
                commentContent.innerHTML = `<p>${comment.comment_content}</p>`;
                commentList.appendChild(commentContent);
            });
    
        } catch (err) {
            commentList.innerHTML = `<p>댓글을 불러오지 못했습니다.</p>`;
            console.error(err);
        }
    }

    /** 댓글 초기 렌더링 */
    await renderComments(post_id);

    /** 댓글 작성 버튼 */
    const commentButton = Button({
        text: '댓글 등록',
        onClick: () => {
            uploadComment();
            // 댓글 등록 API 작성하면 여기에 붙이면 됨
        },
        className: "comment-button"
    });

    const commentButtonDiv = document.querySelector(".comment-button-div");
    commentButtonDiv.appendChild(commentButton);

    /** 댓글 작성 함수 */
    async function uploadComment () {
        try {
            const commentInput = document.getElementById("comment-input");
            const res = await fetch(`${CONFIG.API_URL}/posts/${post_id}/comment`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        post_id: post_id,
                        user_id: JSON.parse(sessionStorage.getItem("user")).user_id,
                        comment_content: commentInput.value.trim()
                    })
                }
            )
            
            if (!res.ok) throw new Error("서버 응답 실패");
            else {
                // 댓글 작성 후 다시 렌더링
                renderComments(post_id);
            }
            
        } catch(err) {
            console.log(err);
            alert("댓글 작성 실패");
        }
    }

}

