import Button from "../../components/Button.js";
import CONFIG from "../../config.js";
import UserItem from "../BoardDetailPage/components/UserItem.js";
export default async function BoardDetailPage (post_id) {
    const app = document.getElementById("app");
    //console.log("post id:", id);

    // ✅ 1. 게시글 데이터 불러오기
    let postData;
    try {
        const res = await fetch(`${CONFIG.API_URL}/posts/${post_id}`,
            {method: "GET"}
        );
        if (!res.ok) throw new Error("서버 응답 실패");
        postData = await res.json(); // 예: { title: "...", content: "...", likes: 1, views: 2, comments: [] }
    } catch (err) {
        app.innerHTML = `<p>게시글을 불러오지 못했습니다.</p>`;
        console.error(err);
        return;
    }

    // ✅ 2. HTML 렌더링
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
                <textarea class="comment-input" placeholder="댓글을 남겨주세요!"></textarea>
                <div class="comment-button-div"></div>
            </div>
            <div class="comment-list" id="comment-list"></div>
        </div>
    `;

    // ✅ 3. 작성자 정보 출력 (예시로 작성자 닉네임, 시간 등)
    const userItem = document.getElementById("userItem");
    userItem.appendChild(UserItem({
        nickname: postData.nickname,
        created_at: postData.created_at,
        profile_image: postData.profile_image_url
    }));

    // // ✅ 4. 댓글 출력
    // const commentList = document.getElementById("comment-list");
    // postData.comments.forEach(comment => {
    //     commentList.appendChild(UserItem(comment));

    //     const commentContent = document.createElement("p");
    //     commentContent.classList.add("comment-content");
    //     commentContent.innerHTML = `<p>${comment.content}</p>`;
    //     commentList.appendChild(commentContent);
    // });

    // ✅ 5. 댓글 작성 버튼
    const commentButton = Button({
        text: '댓글 등록',
        onClick: () => {
            console.log('댓글 작성');
            // 댓글 등록 API 작성하면 여기에 붙이면 됨
        },
        className: "comment-button"
    });

    const commentButtonDiv = document.querySelector(".comment-button-div");
    commentButtonDiv.appendChild(commentButton);
}
