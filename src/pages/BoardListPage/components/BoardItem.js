import { navigateTo } from "../../../router.js";

export function BoardItem({id, title, nickname, created_at, likes = 0, comments = 0, views = 0 }) {
    const boardItem = document.createElement("div");
    boardItem.classList.add("board-item");

    boardItem.innerHTML = `
        <h3>${title}</h3>
        <div class="board-info-div">
            <p>좋아요 ${likes}  댓글 ${comments}  조회수 ${views}</p>
            <span class="board-date">${created_at}</span>
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
        console.log("navigateTo 호출됨, URL:", `/boardDetail/${id}`);
        //navigateTo(`/boardDetail/${id}`); // 게시글 ID를 포함하여 상세 페이지로 이동
        navigateTo(`/boardDetail`);
    });

    return boardItem;
}