
import { BoardItem } from "./components/BoardItem.js";
import Button  from "../../components/Button.js";
import { navigateTo } from "../../router.js";
import CONFIG from "../../config.js";

export default function BoardListPage () {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="board-container">
            <p>안녕하세요,<span id="user-name"></span></p>
            <p>아무 말 대잔치 <strong>게시판</strong> 입니다. </p>
            <div id="board-button-div"></div>
            <div id="board-list" class="board-list"></div>
        </div>
    `;


    const uploadButton = Button({
        text : "게시글 작성",
        onClick : () => {
            navigateTo('/post')
        },
        className : "board-button"
    })

    const uploadButtonDiv = document.getElementById('board-button-div');
    uploadButtonDiv.appendChild(uploadButton);

    fetch(`${CONFIG.API_URL}/posts`,{
        method: "GET"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("게시판 데이터를 불러오는 데 실패했습니다.");
            }
            return response.json();
        })
        .then(boards => {
            const boardList = document.getElementById("board-list");
            boardList.innerHTML = ""; // 로딩 메시지 제거

            boards.forEach(board => {
            
                const boardItem = BoardItem(board);
                boardList.appendChild(boardItem);
            });
        })
        .catch(error => {
            console.error("데이터 로드 오류:", error);
            document.getElementById("board-list").innerHTML = `<p>게시판 데이터를 불러오는 데 실패했습니다.</p>`;
        });

    const nickname = document.getElementById("user-name")
    nickname.innerHTML=`${JSON.parse(sessionStorage.getItem("user")).nickname}`
}
