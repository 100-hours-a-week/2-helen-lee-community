import { navigateTo } from "../router.js";

export function BoardItem({id, title, author, date, likes = 0, comments = 0, views = 0 }) {
    const BoardItem = document.createElement("div");
    BoardItem.classList.add("board-item");

    BoardItem.innerHTML = `
        <h3>${title}</h3>
        <div class="board-info-div">
            <p>좋아요 ${likes}  댓글 ${comments}  조회수 ${views}</p>
            <span class="board-date">${date}</span>
        </div>
        <hr class="board-divider" />
        <div class="board-footer">
            <div class="profile-placeholder"></div>
            <span class="board-author">${author}</span>
        </div>
    `;

    // 클릭 이벤트 추가 → 게시글 상세 페이지로 이동
    BoardItem.addEventListener("click", (event) => {
        event.stopPropagation(); // 내부 요소 클릭 시 이벤트 버블링 방지
        navigateTo("/boardItem"); // 게시글 ID를 포함하여 상세 페이지로 이동
    });

    return BoardItem;
}