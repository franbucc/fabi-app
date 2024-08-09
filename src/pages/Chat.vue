<template>
    <div class="min-h-screen bg-gray-100 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MainH1 class="text-center text-4xl font-extrabold text-gray-900">Foro Comunitario</MainH1>

            <div class="mt-8 flex gap-6">
                <!-- Lista de Mensajes -->
                <section class="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-md">
                    <h2 class="sr-only">Lista de Mensajes</h2>

                    <div class="min-h-[400px]">
                        <ul v-if="!loadingMessages">
                            <li 
                                v-for="message in messages"
                                :key="message.id"
                                class="mb-6 p-4 border-b border-gray-200"
                            >
                                <div class="flex items-center mb-2">
                                    <router-link 
                                        class="text-orange-600 font-semibold"
                                        :to="userRoute(message.userId)"
                                    >
                                        {{ message.email }}
                                    </router-link> 
                                    <span class="text-gray-500 ml-2">{{ formatDate(message.created_at) }}</span>
                                </div>
                                <p class="text-gray-800">{{ message.content }}</p>
                            </li>
                        </ul>
                        <Loader v-else class="mt-6" />
                    </div>
                </section>

                <!-- Enviar un Mensaje -->
                <section class="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-semibold mb-4">Enviar un Mensaje</h2>

                    <form @submit.prevent="sendMessage">
                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-2">Email</label>
                            <span class="block p-2 bg-gray-100 rounded">{{ authUser.email }}</span>
                        </div>
                        <div class="mb-4">
                            <MainLabel for="message">Mensaje</MainLabel>
                            <textarea
                                id="message"
                                class="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-200"
                                v-model="newMessage.content"
                                placeholder="Escribe tu mensaje aquí..."
                            ></textarea>
                        </div>
                        <MainButton 
                            type="submit"
                            text="Enviar"
                            class="w-full py-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700"
                        />
                    </form>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../components/Loader.vue';
import MainButton from '../components/MainButton.vue';
import MainH1 from '../components/MainH1.vue';
import MainLabel from '../components/MainLabel.vue';
import { subscribeToAuth } from '../services/auth';
import { saveChatMessage, subscribeToChatMessages } from '../services/chat';

export default {
    name: "Chat",
    components: { MainH1, Loader, MainLabel, MainButton },
    data() {
        return {
            messages: [],
            loadingMessages: true,
            unsubscribeFromChat: null,

            newMessage: {
                content: '',
            },

            authUser: {
                id: null,
                email: null,
            },
            unsubscribeFromAuth: null,
        };
    },
    methods: {
        sendMessage() {
            if (this.newMessage.content.trim() === '') {
                return;
            }

            saveChatMessage({
                userId: this.authUser.id,
                email: this.authUser.email,
                content: this.newMessage.content,
            });
            
            this.newMessage.content = '';
        },

        formatDate(date) {
            return Intl.DateTimeFormat('es-AR', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit',
            }).format(new Date(date)).replace(',', '');
        },

        userRoute(id) {
            return id !== this.authUser.id ?
                `/usuario/${id}` :
                '/perfil';
        }
    },
    mounted() {
        this.unsubscribeFromChat = subscribeToChatMessages(newMessages => {
            this.messages = newMessages;
            this.loadingMessages = false;
        });

        this.unsubscribeFromAuth = subscribeToAuth(newUserData => this.authUser = newUserData);
    },
    unmounted() {
        if (this.unsubscribeFromAuth) {
            this.unsubscribeFromAuth();
        }
        if (this.unsubscribeFromChat) {
            this.unsubscribeFromChat();
        }
    }
};
</script>

<style scoped>
/* Estilos opcionales para el componente */
</style>
