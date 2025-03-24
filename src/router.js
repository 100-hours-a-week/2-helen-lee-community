
import BoardDetailPage from "./pages/BoardDetailPage/index.js";
import BoardListPage from "./pages/BoardListPage/index.js";
import LoginPage from "./pages/LoginPage/index.js";
import PostPage from "./pages/PostPage/index.js";
import ProfilePage from "./pages/ProfilePage/index.js";
import RegisterPage from "./pages/RegisterPage/index.js";

const routes = [
    { path: /^\/$/, component: LoginPage },
    { path: /^\/register$/, component: RegisterPage },
    { path: /^\/boards$/, component: BoardListPage },
    { path: /^\/post$/, component: PostPage },
    { path: /^\/profile$/, component: ProfilePage },
    { path: /^\/boardDetail\/(\d+)$/, component: BoardDetailPage },
];

export function navigateTo(path) {
    window.history.pushState({}, "", path);
    renderPage();
}


export function renderPage() {
    const path = window.location.pathname || "/";

    for (const route of routes) {
        const match = path.match(route.path);
        if (match) {
            document.getElementById("app").innerHTML = "";
            route.component(match[1]); 
            return;
        }
    }

    // 매칭 안 되면 로그인 페이지로
    LoginPage();
}




window.addEventListener("popstate", renderPage); // 뒤로 가기



/* 
export function renderPage() {
    const path = window.location.pathname || "/";

    document.getElementById("app").innerHTML = ""; 

    let matchedRoute = null;
    let params = {};

    for (const route in routes) {
        // 정규식을 이용해 동적 경로 매칭 (숫자 ID만 허용)
        const routeRegex = new RegExp(`^${route.replace(/:\w+/g, "(\\d+)")}$`);
        const match = path.match(routeRegex);
        if (match) {
            matchedRoute = routes[route];
            const paramKeys = (route.match(/:(\w+)/g) || []).map(key => key.substring(1));

            paramKeys.forEach((key, index) => {
                params[key] = match[index + 1];
            });
            break;
        }
    }

    if (matchedRoute) {
        matchedRoute(params);
    } else {
        LoginPage();
    }
} */