import Button from "../../components/Button.js";
import CONFIG from "../../config.js";
import { navigateTo } from "../../router.js";
import UserItem from "../BoardDetailPage/components/UserItem.js";
export default async function BoardDetailPage (post_id) {
    const app = document.getElementById("app");
    console.log(post_id);

     //  게시글 데이터 fetch
     let postData;
     try {
         const res = await fetch(`${CONFIG.API_URL}/posts/${post_id}`,
             {method: "GET"}
         );
         if (!res.ok) throw new Error("서버 응답 실패");
         postData = await res.json(); 
         
     
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
                <div class="stat-item" id="stat-item-heart">좋아요<strong>${postData.like_count}</strong></div>
                <div class="stat-item">댓글<strong id="comment-count"></strong> </div>
            </div>
            <hr class="boardItem-hr"/>
            <div class="comment-section">
                <textarea id="comment-input" class="comment-input" placeholder="댓글을 남겨주세요!"></textarea>
                <div class="comment-button-div"></div>
            </div>
            <div class="comment-list" id="comment-list"></div>
        </div>
    `;

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

                const commentCount = document.getElementById("comment-count");
                commentCount.innerText = `${commentData.length}`
        
            } catch (err) {
                commentList.innerHTML = `<p>댓글을 불러오지 못했습니다.</p>`;
                console.error(err);
            }
        }
    
        /** 댓글 초기 렌더링 */
        await renderComments(post_id);

       // 작성자 정보 출력
       const userItem = document.getElementById("userItem");
       userItem.appendChild(UserItem({
           nickname: postData.nickname,
           created_at: postData.created_at,
           profile_image: postData.profile_image_url,
           post_id: post_id,
       }));

  

    /** 댓글 작성 버튼 */
    const commentButton = Button({
        text: '댓글 등록',
        onClick: () => {
            uploadComment();
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

  

    /** 좋아요 등록  */
    const StatItemHeart = document.getElementById("stat-item-heart");
    StatItemHeart.addEventListener('click',
        () => postHeart()
      
    )
    
    async function postHeart() {
        try {
            const res = await fetch(`${CONFIG.API_URL}/posts/${post_id}/heart`, 
            {
                method: "POST",
            })

            if(!res.ok) throw new Error("좋아요 등록 실패");
            window.location.reload();
        }
        catch (err) {
            console.log(err);
            alert("좋아요 등록 실패");
        }
    }

}

