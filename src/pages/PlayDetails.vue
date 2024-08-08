<template>

  <div v-if="play">
    <section class="py-14 lg:py-24 relative z-0 bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
        <p class="text-base font-semibold leading-7 text-orange-600">Jugada {{ play.play_type }}</p>
        <h1
          class="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl  text-gray-900 mb-5 md:text-5xl md:leading-snug">
          {{ play.name }}
        </h1>
        <p class="max-w-m mx-7 text-center text-base font-normal leading-7 text-gray-500 mb-9">{{ play.description }}
        </p>
        <p class="text-gray-500 text-sm mb-4">Dificultad</p>
        <p><font-awesome-icon v-for="i in 5" :key="i" :icon="['fas', 'basketball-ball']" :class="[
          'text-3xl', 'mr-2', 'ml-2',
          i <= play.play_level ? 'text-orange-500' : 'text-gray-300'
        ]" /></p>

      </div>
    </section>

    <section class="py-14 lg:py-24 relative">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
        <router-link to="/jugadas" class="block w-full max-w-xs mt-4 mb-8">
          <button
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center w-full">
            <svg class="w-4 h-4 mr-2 transform -rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M9.293 4.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586L9.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
            Volver para atrás
          </button>
        </router-link>

        <!-- Contenido -->

        <!-- PASO 1 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-9 border-b-4 border-orange-500 pb-6 mb-6">
          <!-- Imagen -->
          <div class="img-box flex justify-center lg:justify-start">
            <img v-if="play.photoUrl" :src="play.photoUrl" alt="Foto de la jugada" class="max-lg:mx-auto"
              @click="openModal(play.photoUrl)">

            <!-- Modal -->
            <div v-if="isModalOpen" @click.self="closeModal"
              class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
              <div class="relative max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
                <button @click="closeModal" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                  </svg>
                </button>
                <img :src="modalImage" alt="Imagen de la jugada" class="w-full h-auto rounded-lg">
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-start lg:pl-[100px]">
            <div class="data w-full">
              <h2 class="font-manrope font-bold text-4xl lg:text-4xl text-black mb-3 max-lg:text-center">
                Paso #1
              </h2>
              <p class="font-normal text-lg leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                Descripción del paso #1.
              </p>
            </div>
          </div>
        </div>

        <!-- PASO 2 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-9 border-b-4 border-orange-500 pb-6 mb-6">
          <!-- Imagen -->
          <div class="img-box flex justify-center lg:justify-start">
            <img v-if="play.photoUrl" :src="play.photoUrl" alt="Foto de la jugada" class="max-lg:mx-auto"
              @click="openModal(play.photoUrl)">

            <!-- Modal -->
            <div v-if="isModalOpen" @click.self="closeModal"
              class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
              <div class="relative max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
                <button @click="closeModal" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                  </svg>
                </button>
                <img :src="modalImage" alt="Imagen de la jugada" class="w-full h-auto rounded-lg">
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-start lg:pl-[100px]">
            <div class="data w-full">
              <h2 class="font-manrope font-bold text-4xl lg:text-4xl text-black mb-3 max-lg:text-center">
                Paso #2
              </h2>
              <p class="font-normal text-lg leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                Descripción del paso #2.
              </p>
            </div>
          </div>
        </div>

        <!-- Fin Contenido -->
      </div>
    </section>

    <!-- COMENTARIOS -->
    <section class="py-24 relative">
      <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div class="w-full flex-col justify-start items-start lg:gap-10 gap-6 inline-flex">
          <h2 class="text-gray-900 text-3xl font-bold font-manrope leading-normal">Escribí tu comentario</h2>
          <div class="w-full flex-col justify-start items-start lg:gap-9 gap-6 flex">
            <!-- Formulario de comentarios -->
            <form @submit.prevent="submitComment" class="w-full relative flex justify-between gap-2">
              <input type="text" id="comment" v-model="newCommentText"
                class="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed focus-visible:outline-none focus-visible:shadow-[0px_0px_0px_2px_orange] focus-visible:border-transparent"
                placeholder="Escribí tu comentario aquí....">
              <button type="submit"
                class="cursor-pointer py-3 px-6 flex items-center justify-center text-sm font-semibold text-black transition-all duration-500 hover:text-orange-500 absolute right-6 top-[6px]">
                <span v-if="submittingComment">Publicando comentario...</span>
                <span v-else>Enviar comentario</span>
              </button>
            </form>
            <!-- Mensaje de error -->
            <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>


            <div v-for="(comment, index) in sortedComments" :key="index"
              class="w-full flex-col justify-start items-start gap-8 flex">
              <div class="w-full flex-col justify-start items-end gap-5 flex">
                <div
                  class="w-full p-6 bg-white rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
                  <div class="w-full flex-col justify-center items-start gap-3.5 flex">
                    <div class="w-full justify-between items-center inline-flex">
                      <div class="justify-start items-center gap-2.5 flex">
                        <div class="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
                          <img class="rounded-full" src="https://pagedone.io/asset/uploads/1714988283.png"
                            alt="Foto de perfil" />
                        </div>
                        <div class="flex-col justify-start items-start gap-1 inline-flex">
                          <h5 class="text-gray-900 text-sm font-semibold leading-snug">{{ comment.userEmail }}</h5>
                        </div>
                      </div>
                    </div>
                    <p class="text-gray-800 text-sm font-normal leading-snug">{{ comment.text }}</p>
                  </div>
                  <div class="w-full justify-between items-center inline-flex">
                    <div class="justify-start items-center gap-4 flex">
                      <div class="justify-start items-center gap-1.5 flex">
                        <h5 class="text-gray-900 text-sm font-normal leading-snug">{{ formatDate(comment.date) }}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>

  
  <Loading v-else />
</template>


<script>
import { db } from '../services/firebase';
import { doc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { auth } from '../services/firebase'; // Importa el servicio de autenticación de Firebase
import Loading from '/src/components/Loading.vue';

export default {
  components: {
    Loading
  },
  name: 'PlayDetails',
  data() {
    return {
      play: null,
      newCommentText: '',
      submittingComment: false,
      currentUser: null,
      isModalOpen: false,
      modalImage: '',
      errorMessage: '',
    };
  },
  async created() {
    const playId = this.$route.params.id;
    await this.fetchPlayDetails(playId);
    await this.fetchCurrentUser();
  },
  methods: {
    async fetchPlayDetails(playId) {
      try {
        const playDoc = await getDoc(doc(db, 'players', playId));
        if (playDoc.exists()) {
          const playData = playDoc.data();
          const commentsSnapshot = await getDocs(collection(db, 'players', playId, 'comments'));
          const comments = [];
          commentsSnapshot.forEach(commentDoc => {
            comments.push(commentDoc.data());
          });
          playData.comments = comments;
          this.play = playData;
        }
      } catch (error) {
        console.error('Error fetching play details: ', error);
      }
    },

    async fetchCurrentUser() {
      try {
        const user = auth.currentUser;
        if (user) {
          this.currentUser = user;
        }
      } catch (error) {
        console.error('Error fetching current user: ', error);
      }
    },

    async submitComment() {
      // Limpiar el mensaje de error
      this.errorMessage = '';

      // Validar que el comentario tenga al menos 5 caracteres
      if (this.newCommentText.length < 5) {
        this.errorMessage = 'Por favor, escribe un comentario de al menos 5 caracteres.';
        return; // Detener la función si la validación falla
      }

      try {
        const playId = this.$route.params.id;
        this.submittingComment = true;
        const newComment = {
          userEmail: this.currentUser.displayName || this.currentUser.email,
          text: this.newCommentText,
          date: new Date().toISOString()
        };
        await addDoc(collection(db, 'players', playId, 'comments'), newComment);
        this.newCommentText = '';
        await this.fetchPlayDetails(playId);
      } catch (error) {
        console.error('Error submitting comment: ', error);
      } finally {
        this.submittingComment = false;
      }
    },

    openModal(imageUrl) {
      this.modalImage = imageUrl;
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
      this.modalImage = '';
    },

    formatDate(date) {
      if (!date) {
        return 'Fecha no disponible';
      }

      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        return 'Fecha inválida';
      }

      return Intl.DateTimeFormat('es-AR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
      }).format(parsedDate).replace(',', '');
    },
  },

  computed: {
    sortedComments() {
      return this.play.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
};
</script>

<style scoped>
/* Estilo para el borde naranja al enfocar el campo de entrada */
input:focus-visible {
  outline: none;
  /* Elimina el borde azul predeterminado */
  box-shadow: 0 0 0 3px orange;
  /* Aplica un borde naranja personalizado */
}
</style>
