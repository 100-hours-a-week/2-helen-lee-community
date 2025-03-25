import { navigateTo } from "../../../router.js";
import formatDate from "../../../utils/date/formatDate.js";

export function BoardItem(board) {
   
    const {post_id, title, nickname, created_at, like_count, comment_count = 0, views_count} = board;
    const boardItem = document.createElement("div");
    boardItem.classList.add("board-item");
    console.log(board);
    boardItem.innerHTML = `
        <h3>${title}</h3>
        <div class="board-info-div">
            <p>좋아요 ${like_count}  댓글 ${comment_count}</p>
            <span class="board-date">${formatDate(created_at)}</span>
        </div>
        <hr class="board-divider" />
        <div class="board-footer">
            <div class="profile-placeholder"></div>
            <span class="board-author">${nickname}</span>
        </div>
    `;

    // 클릭 이벤트 추가 → 게시글 상세 페이지로 이동
    boardItem.addEventListener("click", (event) => {
        event.stopPropagation(); // 내부 요소 클릭 시 이벤트 버블링 방지
        //navigateTo(`/boardDetail/${id}`); // 게시글 ID를 포함하여 상세 페이지로 이동
        console.log(post_id)
        console.log(`/boardDetail/${post_id}`)
        navigateTo(`/boardDetail/${post_id}`);
    });

    return boardItem;
}