<template>
  <Loading />

  <section class="py-24">
    <div class="w-full max-w-7xl mx-auto px-6 md:px-8">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
        <!-- Título y descripción -->
        <div class="block mb-6 lg:mb-0 lg:mr-8">
          <h1 class="font-manrope font-bold text-4xl lg:text-5xl leading-tight text-gray-900 mb-3">Jugadas</h1>
          <p class="font-normal text-sm lg:text-base leading-relaxed text-gray-500">Todas las estrategias del básquet
            moderno en un solo lugar.</p>
        </div>
        <!-- Filtros y botones -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 w-full">
          <!-- Lista de filtros -->
          <ul class="flex items-center gap-2">
            <li @click="filterType = 'Ofensiva'">
              <a href="javascript:;"
                class="rounded-full text-gray-900 bg-gray-50 py-3 px-7 font-medium text-base transition-all duration-500 hover:bg-red-500 hover:text-white">Ofensivas</a>
            </li>
            <li @click="filterType = 'Defensiva'">
              <a href="javascript:;"
                class="rounded-full text-gray-900 bg-gray-50 py-3 px-7 font-medium text-base transition-all duration-500 hover:bg-green-500 hover:text-white">Defensivas</a>
            </li>
            <li @click="filterType = 'Clutch'">
              <a href="javascript:;"
                class="rounded-full text-gray-900 bg-gray-50 py-3 px-7 font-medium text-base transition-all duration-500 hover:bg-orange-500 hover:text-white">Clutch</a>
            </li>
          </ul>
          <!-- Contenedor de botones en dispositivos móviles -->
          <div class="flex sm:ml-auto sm:items-center gap-3.5 mt-3.5 sm:mt-0">
            <!-- Botón de búsqueda -->
<div class="relative text-gray-600">
  <input type="search" name="search" placeholder="Buscar"
    class="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm border border-gray-300 focus:border-orange-500 focus:ring-0 focus:outline-none">
  <button type="submit" class="absolute right-0 top-0 mt-3 mr-4 text-gray-500 hover:text-orange-700">
    <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
      viewBox="0 0 56.966 56.966" xml:space="preserve" width="512px" height="512px">
      <path
        d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
    </svg>
  </button>
</div>




            <!-- Botón de refrescar -->
            <button @click="refreshPage"
              class="flex items-center py-2.5 pr-2.5 pl-2.5 rounded-full bg-gray-100 gap-2 font-semibold text-base text-gray-700 transition-all duration-500 hover:bg-gray-300">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 2C5.582 2 2 5.582 2 10H0l3 3 3-3H4C4 6.69 6.69 4 10 4s6 2.69 6 6-2.69 6-6 6c-1.855 0-3.504-.759-4.694-1.976L3.883 15.53C5.484 17.147 7.637 18 10 18c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                  fill="gray" />
              </svg>
            </button>
          </div>
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
        <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          <div v-for="(player, index) in players[filterType]" :key="index" @click="goToDetails(player.id)"
            class="group cursor-pointer border border-gray-300 rounded-2xl p-5 flex flex-col transition-all duration-300 hover:border-orange-600">
            <div class="flex flex-col flex-grow">
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
              <h3 class="text-gray-900 font-bold text-2xl px-1 leading-8 mb-4">{{ player.name }}</h3>
              <div class="flex items-center mb-4">
                <p class="text-gray-600 mb-2 mr-4">
                  <span class="font-semibold">Dificultad:</span>
                </p>
                <div class="flex space-x-1">
                  <font-awesome-icon v-for="i in 5" :key="i" :icon="['fas', 'basketball-ball']" :class="[
                    'text-xl',
                    i <= player.play_level ? 'text-orange-500' : 'text-gray-300'
                  ]" />
                </div>
              </div>
            </div>
            <div class="flex space-x-4 justify-end">
              <button
                class="flex items-center py-4 pr-4 pl-4 rounded-full bg-gray-100 gap-2 font-semibold text-base text-gray-700 transition-all duration-500 hover:bg-gray-300">
                <i class="fa fa-heart" aria-hidden="true"></i>
              </button>
              <button
                class="cursor-pointer bg-orange-50 py-3 px-6 rounded-full flex items-center justify-center text-sm font-semibold text-orange-600 transition-all duration-500 focus:outline-none hover:bg-orange-100">
                Ver más
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>


    <button
      class="cursor-pointer border border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 flex justify-center items-center text-gray-900 font-semibold mx-auto transition-all duration-300 hover:bg-gray-100 mt-5">
      Más jugadas
    </button>






  </div>
</template>

<script>
import { db, auth, storage } from '../services/firebase';
import { collection, addDoc, getDocs, doc, getDoc, query, where, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import Loading from '/src/components/Loading.vue';


export default {
  name: 'Plays',
  components: {
    VueCropper,
    Loading
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
