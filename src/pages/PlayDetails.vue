<template>

  <div v-if="play" class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <svg
        class="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        aria-hidden="true">
        <defs>
          <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1"
            patternUnits="userSpaceOnUse">
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" stroke-width="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
      </svg>
    </div>

    <div
      class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
      <div
        class="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div class="lg:pr-4">
          <!-- Botón para volver atrás -->
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
          <div class="lg:max-w-lg">
            <p class="text-base font-semibold leading-7 text-orange-600">Jugada {{ play.play_type }}</p>
            <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ play.name }}</h1>
            <p class="mt-6 text-xl leading-8 text-gray-700">Aquí irá una descripción breve de la jugada.</p>
          </div>
        </div>
      </div>
      <!-- Imagen principal -->
      <div class="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
        <img v-if="play.photoUrl" :src="play.photoUrl" alt="Foto de la jugada"
          class="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          @click="openModal(play.photoUrl)">
      </div>

      <!-- Modal -->
      <div v-if="isModalOpen" @click.self="closeModal"
        class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
        <div class="relative max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
          <button @click="closeModal" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <img :src="modalImage" alt="Imagen de la jugada" class="w-full h-auto rounded-lg">
        </div>
      </div>

      <div
        class="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div class="lg:pr-4">
          <div class="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
            <p>Descripción de la jugada: {{ play.description }}</p>
            <ul role="list" class="mt-8 space-y-8 text-gray-600">
              <li class="flex gap-x-3">
                <CloudArrowUpIcon class="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                <span><strong class="font-semibold text-gray-900">Nivel de Dificultad:</strong> {{ play.play_level }}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                  iste dolor cupiditate blanditiis ratione.</span>
              </li>
              <li class="flex gap-x-3">
                <LockClosedIcon class="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                <span><strong class="font-semibold text-gray-900">Paso #1:</strong> Anim aute id magna aliqua ad ad non
                  deserunt sunt. Qui irure qui lorem cupidatat commodo.</span>
              </li>
              <li class="flex gap-x-3">
                <ArrowRightIcon class="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                <span><strong class="font-semibold text-gray-900">Paso #2:</strong> Ac tincidunt sapien vehicula erat
                  auctor pellentesque rhoncus. Et magna sit morbi lobortis.</span>
              </li>
            </ul>
            <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">Resumen de la Jugada.</h2>
            <p class="mt-6">Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum
              urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque
              id sed tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed
              diam turpis ipsum eu a sed convallis diam.</p>
          </div>
        </div>
      </div>
    </div>


    <div class="w-full max-w-4xl px-4 md:px-5 lg:px-6 mx-auto">
    <div class="max-xl:max-w-3xl max-xl:mx-auto">
      <!-- Contenedor de la cuadrícula -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Columna 1: Título -->
        <div class="flex items-center bg-white p-6 rounded-lg">
          <h2 class="font-manrope font-bold text-4xl text-black mb-2 text-left">Escribí un comentario</h2>
        </div>

        <!-- Columna 2: Formulario -->
        <div class="bg-white p-6 rounded-lg w-full">
          <form @submit.prevent="submitComment">
            <div class="mb-4">
              <label for="comment" class="block text-gray-700 font-bold mb-2">Comentario:</label>
              <textarea id="comment" v-model="newCommentText" rows="3"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Escribe tu comentario aquí..." required></textarea>
            </div>
            <button type="submit"
              class="cursor-pointer bg-orange-500 py-3 px-6 rounded-full flex items-center justify-center text-sm font-semibold text-white transition-all duration-500 focus:outline-none hover:bg-gray-600">
              <span v-if="submittingComment">Publicando comentario...</span>
              <span v-else>Enviar comentario</span>
            </button>
          </form>
        </div>
      </div>
    </div>

    <div v-for="(comment, index) in play.comments" :key="index"
      class="pt-11 pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
      <h3 class="font-manrope font-semibold text-xl sm:text-2xl leading-9 text-black mb-6">{{ comment.text }}</h3>
      <div class="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
        <div class="flex items-center gap-3">
          <img src="https://pagedone.io/asset/uploads/1704349572.png" alt="John image" class="w-8 h-8 rounded-full">
          <h6 class="text-lg leading-8 text-gray-400">{{ comment.userEmail }}</h6>
        </div>
        <p class="font-normal text-lg leading-8 text-gray-400">Nov 01, 2023</p>
      </div>
    </div>
  </div>
  </div>
  <div v-else>
    <p class="text-center">Cargando...</p>
  </div>
</template>

<script>
import { db } from '../services/firebase';
import { doc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { auth } from '../services/firebase'; // Importa el servicio de autenticación de Firebase
import { ArrowRightIcon } from "@vue-hero-icons/outline"

export default {
  name: 'PlayDetails',
  data() {
    return {
      play: null,
      newCommentText: '',
      submittingComment: false, // Variable para controlar el estado de publicación del comentario
      currentUser: null, // Variable para almacenar la información del usuario actual
      isModalOpen: false, // Controlar si el modal está abierto
      modalImage: '', // URL de la imagen que se mostrará en el modal
    };
  },
  async created() {
    const playId = this.$route.params.id; // Obtener el ID de la jugada desde los parámetros de la ruta
    await this.fetchPlayDetails(playId);
    this.fetchCurrentUser(); // Obtener información del usuario actual
  },
  methods: {
    async fetchPlayDetails(playId) {
      try {
        const playDoc = await getDoc(doc(db, 'players', playId)); // Obtener el documento de la jugada desde Firestore
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
          // Aquí podrías obtener más detalles del usuario si es necesario (como el nombre)
          this.currentUser = user;
        }
      } catch (error) {
        console.error('Error fetching current user: ', error);
      }
    },
    async submitComment() {
      try {
        const playId = this.$route.params.id;
        this.submittingComment = true; // Activar el estado de publicación del comentario
        const newComment = {
          userEmail: this.currentUser.displayName || this.currentUser.email, // Usar el nombre del usuario si está disponible, de lo contrario el email
          text: this.newCommentText,
        };
        await addDoc(collection(db, 'players', playId, 'comments'), newComment);
        this.newCommentText = ''; // Limpiar el campo de texto después de enviar el comentario
        // Actualizar la lista de comentarios mostrada en la UI (opcional, depende de cómo manejes la actualización)
        await this.fetchPlayDetails(playId);
      } catch (error) {
        console.error('Error submitting comment: ', error);
      } finally {
        this.submittingComment = false; // Desactivar el estado de publicación del comentario, independientemente del resultado
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
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
