import Main from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import PostsPage from "@/pages/PostsPage";
import SocialCredits from "@/pages/SocialCredits";
import PostPage from "@/pages/PostPage";


const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostsPage
    },
    {
        path: '/social-credits',
        component: SocialCredits
    },
    {
        path: '/posts/:id',
        component: PostPage
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;