import Home from '../pages/Home.vue';
import Chat from '../pages/Chat.vue';
import Login from '../pages/Login.vue';
import ForgotPassword from '../pages/ForgotPassword.vue';
import Register from '../pages/Register.vue';
import MyProfile from '../pages/MyProfile.vue';
import UserProfile from '../pages/UserProfile.vue';
import PrivateChat from '../pages/PrivateChat.vue';
import Plays from '../pages/Plays.vue';
import PlayDetails from '../pages/PlayDetails.vue'; // Asegúrate de importar PlayDetails.vue aquí
import { createRouter, createWebHashHistory } from 'vue-router';
import { subscribeToAuth } from '../services/auth';

const routes = [
    { path: '/',                    component: Home },
    { path: '/iniciar-sesion',      component: Login },
    { path: '/olvide-contrasena',   component: ForgotPassword },
    { path: '/registro',            component: Register },
    { path: '/chat',                component: Chat,        meta: { requiresAuth: true } },
    { path: '/perfil',              component: MyProfile,   meta: { requiresAuth: true } },
    { path: '/usuario/:id',         component: UserProfile, meta: { requiresAuth: true } },
    { path: '/usuario/:id/chat',    component: PrivateChat, meta: { requiresAuth: true } },
    { path: '/jugadas',             component: Plays },
    { path: '/play/:id',            name: 'PlayDetails',    component: PlayDetails },
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

let authUser = {
    id: null,
    email: null,
}

subscribeToAuth(newUserData => authUser = newUserData);

router.beforeEach((to, from) => {
    if(authUser.id === null && to.meta.requiresAuth) {
        return {
            path: '/iniciar-sesion',
        };
    }
});

export default router;
