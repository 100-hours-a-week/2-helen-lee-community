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
    const user_id = JSON.parse(sessionStorage.getItem("user")).user_id;

    const postForm = document.getElementById("post-form")

    const formData = new FormData();
    formData.append('post_content', post_content)
    formData.append('user_id', user_id)
    formData.append('title', title)

    if (postForm.image.files.length > 0) {
        formData.append('post_image_url', postForm.image.files[0]);
    }

    try {
        const response = await fetch(`${CONFIG.API_URL}/posts`, {
            method: "POST",
            body: formData
        })

        if (response.ok) {
            navigateTo("/boards");
        }
    }
    catch(error) {
        console.error("서버 에러 발생", error);
    }

}
