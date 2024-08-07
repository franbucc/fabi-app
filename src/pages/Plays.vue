<template>
  <section class="py-24">
    <div class="w-full max-w-7xl mx-auto px-6 md:px-8">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-0">
        <div class="block">
          <h1 class="font-manrope font-bold text-4xl leading-9 text-gray-900 mb-3">Jugadas</h1>
          <p class="font-normal text-sm leading-6 text-gray-500">Todas las estrategias del básquet moderno en un solo
            lugar.</p>
        </div>
        <div class="flex flex-col-reverse sm:flex-row sm:items-center gap-3.5">
          <ul class="flex items-center gap-2">
            <li @click="filterType = 'Ofensiva'">
              <a href="javascript:;"
                class="rounded-full text-gray-900 bg-gray-50 py-3 px-7 min-[470px]:px-7 font-medium text-base transition-all duration-500 hover:bg-red-500 tab-active:bg-indigo-50 hover:text-white">Ofensivas</a>
            </li>
            <li @click="filterType = 'Defensiva'">
              <a href="javascript:;"
                class="rounded-full text-gray-900 bg-gray-50 py-3 px-7 min-[470px]:px-7 font-medium text-base transition-all duration-500 hover:bg-green-500 tab-active:bg-indigo-50 hover:text-white">Defensivas</a>
            </li>
            <li @click="filterType = 'Clutch'">
              <a href="javascript:;"
                class="rounded-full text-gray-900 bg-gray-50 py-3 px-7 min-[470px]:px-7 font-medium text-base transition-all duration-500 hover:bg-yellow-500 tab-active:bg-indigo-50 hover:text-white">Clutch</a>
            </li>
          </ul>
          <button @click="searchPlays"
            class="flex items-center py-2.5 pr-2.5 pl-2.5 max-sm:w-max rounded-full bg-orange-600 gap-2 font-semibold text-base text-white transition-all duration-500 hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-4.35-4.35M10.5 18.75a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
            </svg>
          </button>



          <!-- New refresh button -->
          <button @click="refreshPage"
            class="flex items-center py-2.5 pr-2.5 pl-2.5 max-sm:w-max rounded-full bg-gray-100 gap-2 font-semibold text-base text-white transition-all duration-500 hover:bg-gray-300">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 2C5.582 2 2 5.582 2 10H0l3 3 3-3H4C4 6.69 6.69 4 10 4s6 2.69 6 6-2.69 6-6 6c-1.855 0-3.504-.759-4.694-1.976L3.883 15.53C5.484 17.147 7.637 18 10 18c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                fill="gray" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>


  <div class="container mx-auto py-8">
    <form v-if="showForm && isAdmin" @submit.prevent="addPlayer"
      class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <div class="mb-6">
        <label for="photo" class="block text-gray-700 font-bold mb-2">Foto de la Jugada:</label>
        <div class="flex items-center justify-center w-full mb-4">
          <label for="photo" class="cursor-pointer relative">
            <div class="w-64 h-40 overflow-hidden rounded-lg border border-gray-300">
              <img v-if="photoUrl" :src="photoUrl" alt="Foto de la jugada" class="w-full h-auto object-cover">
              <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
                <svg class="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                  </path>
                </svg>
              </div>
            </div>
            <input type="file" id="photo" accept="image/*" class="hidden" @change="handlePhotoUpload">
          </label>
        </div>
        <div v-if="cropperVisible" class="mb-6">
          <vue-cropper ref="cropper" :src="photoUrl" :aspect-ratio="10 / 8" guides
            style="height: 400px; width: 100%;" />
          <button @click="cropImage"
            class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 focus:outline-none">Recortar
            Imagen</button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-bold mb-2">Nombre de la Jugada:</label>
          <input v-model="name" id="name" type="text"
            class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500" required>
        </div>
        <div class="mb-4">
          <label for="play_level" class="block text-gray-700 font-bold mb-2">Nivel de Dificultad:</label>
          <div class="flex items-center">
            <font-awesome-icon v-for="i in 5" :key="i" :icon="['fas', 'basketball-ball']" :class="[
              'text-2xl cursor-pointer',
              i <= play_level ? 'text-yellow-500' : 'text-gray-300',
              hover[i - 1] ? 'text-orange-500' : ''
            ]" @click="setDifficulty(i)" @mouseover="hover[i - 1] = true" @mouseleave="hover[i - 1] = false" />
          </div>
        </div>
        <div class="mb-4 col-span-2">
          <label for="description" class="block text-gray-700 font-bold mb-2">Descripción de la jugada:</label>
          <textarea v-model="description" id="description" rows="4"
            class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            required></textarea>
        </div>
        <div class="mb-4 col-span-2">
          <label for="play_type" class="block text-gray-700 font-bold mb-2">Tipo de Jugada:</label>
          <select v-model="play_type" id="play_type"
            class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500" required>
            <option value="Ofensiva">Ofensiva</option>
            <option value="Defensiva">Defensiva</option>
            <option value="Clutch">Clutch</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button type="submit"
            class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 focus:outline-none">Agregar
            Jugada</button>
          <button type="button" @click="showForm = false"
            class="ml-4 px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300 focus:outline-none">Cerrar
            Ventana</button>
        </div>
      </div>
    </form>

    <div class="fixed bottom-6 right-9">
      <button v-if="!showForm && isAdmin" @click="showForm = true"
        class="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300 focus:outline-none">
        Nueva Jugada
      </button>
    </div>




    <div v-show="showSuccessNotification" class="notification success">Jugada cargada correctamente!</div>
    <div v-show="showLoadingNotification" class="notification loading">Estamos cargando tu jugada...</div>

    <!-- LISTA DE JUGADAS -->
    <section>
      <div v-if="filterType" :key="filterType" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="font-manrope text-4xl font-bold text-gray-900 mb-14">Jugadas {{ filterType }}s</h2>
        <div
          class="flex justify-center mb-14 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
          <div v-for="(player, index) in players[filterType]" :key="index" @click="goToDetails(player.id)"
            class="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600">
            <div class="flex items-center mb-6">
              <img v-if="player.photoUrl" :src="player.photoUrl" alt="Foto de la jugada"
                src="https://pagedone.io/asset/uploads/1696244553.png" class="rounded-lg w-full">
              <div v-else class="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                  </path>
                </svg>
              </div>
            </div>
            <div class="block">
              <h3 class="text-gray-900 font-bold text-2xl px-1 leading-8 mb-9">{{ player.name }}</h3>
              <div class="px-1 flex items-center justify-between  font-medium">
                <p class="text-gray-600 mb-2"><span class="font-semibold">Dificultad:</span> {{ player.play_level }}</p>
                <button
                  class="cursor-pointer bg-orange-50 py-3 px-6 rounded-full flex items-center justify-center text-sm font-semibold text-orange-600 transition-all duration-500 focus:outline-none hover:bg-orange-100">
                  Ver más
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
      <button
        class="cursor-pointer border border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 flex justify-center items-center text-gray-900 font-semibold mx-auto transition-all duration-300 hover:bg-gray-100">Más jugadas</button>
    </section>

  </div>
</template>

<script>
import { db, auth, storage } from '../services/firebase';
import { collection, addDoc, getDocs, doc, getDoc, query, where, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  name: 'Plays',
  components: {
    VueCropper
  },
  data() {
    return {
      showForm: false,
      name: '',
      play_level: '',
      description: '',
      photo: null,
      photoUrl: '',
      croppedPhoto: null,
      cropperVisible: false,
      players: {
        'Ofensiva': [],
        'Defensiva': [],
        'Clutch': [],
      },
      isAdmin: false,
      authUser: null,
      newCommentText: '',
      showSuccessNotification: false,
      showLoadingNotification: false,
      filterType: 'Ofensiva', // Tipo de jugada filtrada inicialmente
      hover: [false, false, false, false, false],
      play_type: 'Ofensiva', // Agregado para inicializar el tipo de jugada en el formulario
    };
  },

  created() {
    this.fetchPlayers();
    this.checkUserRole();
    this.checkAuth();
  },
  methods: {
    goToDetails(playId) {
      this.$router.push({ name: 'PlayDetails', params: { id: playId } });
    },
    async addPlayer() {
      try {
        this.showLoadingNotification = true; // Mostrar notificación de carga

        // Verificar si se ha cargado una foto
        if (!this.croppedPhoto) {
          throw new Error("No se ha cargado ninguna foto.");
        }

        // Subir la foto recortada a Firebase Storage
        const storageRef = ref(storage, `players/${this.croppedPhoto.name}`);
        await uploadBytes(storageRef, this.croppedPhoto);
        // Obtener la URL de descarga de la foto
        this.photoUrl = await getDownloadURL(storageRef);

        // Crear un nuevo jugador con la URL de la foto
        const newPlayer = {
          name: this.name,
          play_level: this.play_level,
          description: this.description,
          photoUrl: this.photoUrl,
          play_type: this.play_type
        };

        // Guardar el jugador en Firestore
        const playerRef = await addDoc(collection(db, 'players'), newPlayer);
        this.players[this.play_type].push({ ...newPlayer, id: playerRef.id, comments: [] });

        // Reiniciar los campos del formulario
        this.name = '';
        this.play_level = '';
        this.description = '';
        this.photo = null;
        this.photoUrl = '';
        this.play_type = 'Ofensiva'; // Reiniciar el tipo de jugada al valor predeterminado

        // Mostrar la notificación de éxito
        this.showSuccessNotification = true;
        setTimeout(() => {
          this.showSuccessNotification = false;
        }, 9000); // Ocultar la notificación después de 9 segundos

        // Cerrar la ventana de agregar jugadores
        this.showForm = false;
      } catch (error) {
        console.error("Error adding player: ", error);
      } finally {
        this.showLoadingNotification = false; // Ocultar notificación de carga
      }
    },
    handlePhotoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.photo = file;
        this.photoUrl = URL.createObjectURL(file); // Crear una URL temporal para la miniatura
        this.cropperVisible = true; // Mostrar el recortador de imágenes
      }
    },
    cropImage() {
      this.$refs.cropper.getCroppedCanvas({ width: 1600, height: 900 }).toBlob(blob => {
        this.croppedPhoto = new File([blob], this.photo.name, { type: 'image/jpeg' });
        this.photoUrl = URL.createObjectURL(blob); // Actualizar la miniatura con la imagen recortada
        this.cropperVisible = false; // Ocultar el recortador de imágenes
      });
    },
    async fetchPlayers() {
      try {
        const playersSnapshot = await getDocs(collection(db, 'players'));
        playersSnapshot.forEach(async (playerDoc) => {
          const player = { id: playerDoc.id, ...playerDoc.data(), comments: [] };
          const commentsSnapshot = await getDocs(query(collection(db, 'players', playerDoc.id, 'comments')));
          commentsSnapshot.forEach(commentDoc => {
            player.comments.push({ id: commentDoc.id, ...commentDoc.data() });
          });
          this.players[player.play_type].push(player);
        });
      } catch (error) {
        console.error('Error fetching players: ', error);
      }
    },
    async checkUserRole() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            this.isAdmin = userData.role === 'admin';
          }
        }
      });
    },
    checkAuth() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.authUser = user;
        } else {
          this.authUser = null;
        }
      });
    },
    setDifficulty(level) {
      this.play_level = level;
    },
    refreshPage() {
      window.location.reload();
    },

  },
  async searchPlays() {
    try {
      showLoadingNotification.value = true; // Mostrar notificación de carga

      // Obtener referencia a la colección de jugadas
      const playsRef = collection(db, 'plays');

      // Crear una consulta para filtrar jugadas por tipo
      let queryRef = query(playsRef, where('play_type', '==', filterType.value));

      // Ejecutar la consulta
      const querySnapshot = await getDocs(queryRef);

      // Limpiar la lista de jugadas actuales
      players.value[filterType.value] = [];

      // Iterar sobre los resultados y agregar a la lista de jugadas
      querySnapshot.forEach((doc) => {
        const play = doc.data();
        play.id = doc.id;
        players.value[filterType.value].push(play);
      });
      // Mostrar la notificación de éxito
      showSuccessNotification.value = true;
      setTimeout(() => {
        showSuccessNotification.value = false;
      }, 3000); // Ocultar la notificación después de 3 segundos
    } catch (error) {
      console.error("Error searching plays: ", error);
    } finally {
      showLoadingNotification.value = false; // Ocultar notificación de carga
    }
  }
};


</script>

<style scoped>
.notification.success {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.notification.loading {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #ff9800;
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.hover\:text-orange-500:hover {
  color: #f59e0b;
}
</style>
