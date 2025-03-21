import Button from "../../components/Button.js";
import CONFIG from "../../config.js";
import { navigateTo } from "../../router.js";

export default function PostPage () {

    const app = document.getElementById("app");

    app.innerHTML =
    `
    <div class="post-container">
        <h2 class="post-title">게시글 작성</h2>
            <form id="post-form" class="post-form">
                <label for="title">제목*</label>
                <input type="text" id="title" placeholder="제목을 입력해주세요. (최대 26글자)" maxlength="26" required>

                <label for="content">내용*</label>
                <textarea id="content" placeholder="내용을 입력해주세요." required></textarea>

                <label for="image">이미지</label>
                <input type="file" id="image" accept="image/*">

                <div id="post-button-div"></div>
            </form>
    </div>
    `

    const postButton = Button({
        text : "완료",
        onClick: () => {requestUpload()},

    })

    const postButtonDiv = document.getElementById("post-button-div")
    postButtonDiv.appendChild(postButton);

}

// 게시글 작성 요청
async function requestUpload () {
    const title = document.getElementById("title").value;
    const post_content = document.getElementById("content").value;
    const post_image_url = document.getElementById("image").value;
    const user_id = JSON.parse(sessionStorage.getItem("user")).user_id;

    try {
        const response = await fetch(`${CONFIG.API_URL}/posts`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({title, post_content, post_image_url, user_id})
        })

        if (response.ok) {
            navigateTo("/boards");
        }
    }
    catch(error) {
        console.error("서버 에러 발생", error);
    }

}
