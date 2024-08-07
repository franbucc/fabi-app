<template>
  <Loading />

  <section v-if="user" class="relative pt-40 pb-5">
    <!-- BANNER -->
    <img src="../../fondo-perfil.jpg" alt="cover-image" class="w-full absolute top-0 left-0 z-0 h-60">
    <div class="w-full max-w-7xl mx-auto px-6 md:px-8">
      <div class="flex items-center justify-center sm:justify-start relative z-10 mb-5">
        <!-- FOTO DE PERFIL -->
        <img v-if="photoPreview || user.photoURL" :src="photoPreview || user.photoURL" alt="Foto de perfil"
          class="w-40 h-40 object-cover border-4 border-solid border-white rounded-full">
      </div>


      <div class="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
        <div class="block flex-grow">
          <!-- NOMBRE Y EMAIL -->
          <h1 class="font-manrope font-bold text-4xl text-gray-900 mb-1">{{ user.displayName }}</h1>
          <p class="font-normal text-base leading-7 text-gray-500">{{ user.email }}</p>
          <p v-if="role" class="text-gray-500">Rol: {{ role }}</p>
        </div>
        <!-- BOTONES A LA DERECHA -->
        <div class="flex gap-6 sm:gap-4 mt-4 sm:mt-0">
          <button @click="showEditPhotoModal = true"
            class="py-3.5 px-5 rounded-full bg-orange-500 text-white font-semibold text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:bg-orange-700">Editar
            Foto</button>

          <button @click="editMode = true"
            class="py-3.5 px-5 rounded-full bg-orange-500 text-white font-semibold text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:bg-orange-700">Editar
            Nombre</button>
          <button @click="editPasswordMode = true"
            class="py-3.5 px-5 rounded-full bg-orange-500 text-white font-semibold text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:bg-orange-700">
            Editar Contraseña
          </button>


        </div>
      </div>
    </div>
  </section>

  <div class="min-h-screen">
    <div class="container mx-auto py-8">
      

<!-- PUBLICACIONES -->
 <div class="mt-8">
    <h2 class="font-manrope font-bold text-4xl text-gray-900 mb-14">Mis Publicaciones</h2>
    <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
      <div v-for="player in players" :key="player.id"
        class="group cursor-pointer border border-gray-300 rounded-2xl p-5 flex flex-col transition-all duration-300 hover:border-orange-600">

        <!-- Imagen del Jugador -->
        <div class="flex flex-col flex-grow">
          <div class="flex items-center mb-6">
            <img v-if="player.photoUrl" :src="player.photoUrl" :alt="'Foto de ' + player.name"
              class="rounded-lg w-full h-48 object-cover">
            <div v-else class="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
              <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                </path>
              </svg>
            </div>
          </div>
          <h3 class="text-gray-900 font-bold text-2xl px-1 leading-8 mb-4">{{ player.name }}</h3>
          <p class="text-gray-600">{{ player.description }}</p>
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

        <!-- Botones -->
        <div class="mt-4 flex justify-end space-x-2">
          <MainButton @click="openEditModal(player)"
            class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">
            Editar
          </MainButton>
          <MainButton @click="confirmDelete(player.id)"
            class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full">
            Eliminar
          </MainButton>
        </div>
      </div>
    </div>

    <!-- Modal de Edición -->
    <EditPlayModal
      :showModal="isModalOpen"
      :player="selectedPlayer"
      @close="closeEditModal"
      @save="updatePlayer"
    />
  </div>



      <!-- Modal de Confirmación de Eliminación -->
      <div v-if="showDeleteModal"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div class="bg-white p-8 rounded-md max-w-md">
          <h1 class="text-2xl font-bold mb-4 text-center text-orange-500">Eliminar Publicación</h1>
          <p class="text-center mb-4">¿Estás seguro de que deseas eliminar esta publicación?</p>
          <div class="flex justify-center space-x-4">
            <MainButton @click="deleteConfirmed" class="bg-red-500 hover:bg-red-600">Eliminar</MainButton>
            <MainButton @click="cancelDelete" class="bg-gray-500 hover:bg-gray-600">Cancelar</MainButton>
          </div>
        </div>
      </div>

      <!-- Modal de Edición de Foto de Perfil -->
      <div v-if="showEditPhotoModal"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50 p-4">
        <div class="bg-white p-8 rounded-lg shadow-xl relative">
          <h1 class="text-3xl font-extrabold mb-6 text-center text-black">Editar Foto de Perfil</h1>
          <div class="flex flex-col items-center space-y-6 mb-6">
            <label for="photoURLModal"
              class="relative rounded-full overflow-hidden cursor-pointer w-32 h-32 bg-gray-100 border-4 border-orange-300 flex items-center justify-center">
              <img v-if="photoPreview" :src="photoPreview" alt="Preview" class="w-full h-full object-cover">
              <span v-else
                class="flex items-center justify-center w-full h-full text-gray-600 text-lg font-medium">Seleccionar</span>
              <input type="file" id="photoURLModal" class="hidden" @change="handleFileSelection">
            </label>
            <div class="flex space-x-4">
              <button
                class="py-4 px-5 rounded-full bg-orange-500 text-white font-semibold text-base leading-6 shadow-sm transition-all duration-500 hover:bg-orange-600"
                @click="handleUpload">
                Actualizar Foto
              </button>
              <button
                class="py-2 px-4 rounded-full bg-gray-500 text-white font-semibold text-base leading-6 shadow-sm transition-all duration-500 hover:bg-gray-600"
                @click="closeEditPhotoModal">
                Cancelar
              </button>
            </div>
          </div>
          <div v-if="loading" class="text-center text-orange-500 text-lg font-semibold">Subiendo...</div>
        </div>
      </div>
    </div>
  </div>

  <section class="container mx-auto">
    <h2 class="py-8 font-manrope font-bold text-3xl text-gray-900 mb-5">Mis Favoritos</h2>
  </section>



  <!-- MODAL NOMBRE -->
  <section v-if="editMode" class="py-12 w-full max-w-7xl mx-auto px-6 md:px-8">
    <div @click.self="editMode = false"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div class="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <div class="flex items-start space-x-6 mb-6">
          <label for="about" class="text-2xl font-bold text-gray-900">Editar Nombre</label>
        </div>
        <input v-model="newName" id="about" name="about" type="text"
          class="mb-6 w-full rounded-md border-gray-300 bg-gray-200 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-orange-600 sm:text-sm sm:leading-6"
          placeholder="Introduce tu nuevo nombre">
        <div class="flex space-x-4">
          <button @click="saveChanges"
            class="py-3 px-4 rounded-full bg-orange-500 text-white font-semibold text-base shadow-sm transition-all duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
            Guardar cambios
          </button>
          <button @click="editMode = false"
            class="py-3 px-4 rounded-full bg-gray-300 text-gray-800 font-semibold text-base shadow-sm transition-all duration-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- MODAL CAMBIAR CONTRASEÑA -->
  <section v-if="editPasswordMode"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
    <div @click.self="editPasswordMode = false" class="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <!-- Mensaje de éxito -->
      <div v-if="successMessage" class="mb-4 p-4 text-green-700 bg-green-100 border border-green-300 rounded">
        {{ successMessage }}
      </div>
      <div class="flex items-start space-x-6 mb-6">
        <label for="newPassword" class="text-2xl font-bold text-gray-900">Cambiar Contraseña</label>
      </div>
      <div class="relative mb-4">
        <input v-model="newPassword" :type="showNewPassword ? 'text' : 'password'" id="newPassword" name="newPassword"
          class="w-full rounded-md border-gray-300 bg-gray-200 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-orange-600 sm:text-sm sm:leading-6"
          placeholder="Nueva contraseña">
        <button @click="toggleShowNewPassword" type="button" class="absolute inset-y-0 right-0 flex items-center pr-3">
          <i :class="showNewPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
        </button>
      </div>
      <div class="relative mb-6">
        <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword"
          name="confirmPassword"
          class="w-full rounded-md border-gray-300 bg-gray-200 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-orange-600 sm:text-sm sm:leading-6"
          placeholder="Confirmar nueva contraseña">
        <button @click="toggleShowConfirmPassword" type="button"
          class="absolute inset-y-0 right-0 flex items-center pr-3">
          <i :class="showConfirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
        </button>
      </div>
      <div class="flex space-x-4">
        <button @click="editPasswordMode = false"
          class="py-3 px-4 w-full rounded-full bg-orange-500 text-white font-semibold text-base shadow-sm transition-all duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          Guardar cambios
        </button>
        <button @click="editPasswordMode = false"
          class="py-3 px-4 w-full rounded-full bg-gray-300 text-gray-800 font-semibold text-base shadow-sm transition-all duration-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
          Cancelar
        </button>
      </div>
    </div>
  </section>


</template>

<script>
import { onAuthStateChanged, updateProfile, updatePassword } from 'firebase/auth';
import { doc, getDoc, deleteDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import MainButton from '../components/MainButton.vue';
import Loading from '/src/components/Loading.vue';
import EditPlayModal from '/src/components/EditPlayModal.vue';


export default {
  name: 'MyProfile',
  components: {
    MainButton,
    Loading,
    EditPlayModal,
  },
  data() {
    return {
      user: null,
      newName: '',
      newPassword: '',
      editMode: false,
      showEditPhotoModal: false,
      showPreviewModal: false,
      showDeleteModal: false,
      photo: null,
      photoPreview: null,
      loading: false,
      players: [],
      role: '',
      deletingPlayerId: null,
      editingPlayer: null,
      editPasswordMode: false,
      confirmPassword: '',
      editPasswordMode: false,
      newPassword: '',
      confirmPassword: '',
      showNewPassword: false,
      showConfirmPassword: false,
      editPasswordMode: false,
      successMessage: '',
      isModalOpen: false,
      selectedPlayer: null,
    };
  },
  created() {
    // Cargar datos del usuario y jugadores al inicio
    this.loadUserData();
    this.fetchPlayers();
  },
  methods: {
    openEditModal(player) {
      this.selectedPlayer = { ...player };
      this.isModalOpen = true;
    },
    closeEditModal() {
      this.isModalOpen = false;
    },
    updatePlayer(updatedPlayer) {
    const index = this.players.findIndex(player => player.id === updatedPlayer.id);
    if (index !== -1) {
      // Actualiza el objeto reactivo directamente
      this.players[index] = updatedPlayer;
    }
  },
    confirmDelete(playerId) {
      // Lógica para confirmar y eliminar el jugador
    },
    toggleShowNewPassword() {
      this.showNewPassword = !this.showNewPassword;
    },
    toggleShowConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    methods: {
      async savePasswordChanges() {
        if (this.newPassword !== this.confirmPassword) {
          alert('Las contraseñas no coinciden');
          return;
        }

        try {
          const user = auth.currentUser;

          if (!user) {
            alert('No estás autenticado');
            return;
          }

          // Cambia la contraseña del usuario
          await updatePassword(user, this.newPassword);

          // Actualiza la base de datos si es necesario
          await updateDoc(doc(db, 'users', user.uid), {
            lastPasswordChange: new Date()
          });

          // Mensaje de éxito
          this.successMessage = 'Contraseña modificada con éxito';
          this.editPasswordMode = false;
        } catch (error) {
          console.error('Error al cambiar la contraseña:', error);
          alert('Error al cambiar la contraseña');
        }
      },
    },
    async loadUserData() {
      const currentUser = auth.currentUser;
      if (currentUser) {
        this.user = currentUser;
        this.user.photoURL = currentUser.photoURL;

        // Obtener datos adicionales del usuario desde Firestore si existen
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          this.role = userData.role;
        }
      }
    },
    async saveChanges() {
      try {
        const currentUser = auth.currentUser;
        if (this.newName) {
          await updateProfile(currentUser, { displayName: this.newName });
          this.user.displayName = this.newName;
        }
        if (this.newPassword) {
          await updatePassword(currentUser, this.newPassword);
        }
        this.editMode = false;
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
      }
    },
    cancelEdit() {
      this.editMode = false;
      this.newName = '';
      this.newPassword = '';
    },
    async fetchPlayers() {
      this.players = [];
      const querySnapshot = await getDocs(collection(db, 'players'));
      querySnapshot.forEach(doc => {
        const player = doc.data();
        player.id = doc.id;
        this.players.push(player);
      });
    },
    async confirmDelete(playerId) {
      this.deletingPlayerId = playerId;
      this.showDeleteModal = true;
    },
    async deleteConfirmed() {
      if (!this.deletingPlayerId) return;
      try {
        await deleteDoc(doc(db, 'players', this.deletingPlayerId));
        this.fetchPlayers();
      } catch (error) {
        console.error('Error al eliminar la publicación:', error);
      } finally {
        this.showDeleteModal = false;
        this.deletingPlayerId = null;
      }
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.deletingPlayerId = null;
    },
    handleFileSelection(event) {
      const file = event.target.files[0];
      if (!file) return;
      this.photo = file;
      this.photoPreview = URL.createObjectURL(file);
    },
    async handleUpload() {
      if (!this.photo) return;
      this.loading = true;
      const storageRef = ref(storage, `step1Images/${this.photo.name}`);
      await uploadBytes(storageRef, this.photo);
      const downloadURL = await getDownloadURL(storageRef);
      await updateProfile(auth.currentUser, { photoURL: downloadURL });
      this.loading = false;
      this.photo = null;
      this.photoPreview = null;
      this.closeEditPhotoModal();
      this.loadUserData(); // Actualiza la foto de perfil mostrada después de subir
    },
    closeEditPhotoModal() {
      this.showEditPhotoModal = false;
      this.photo = null;
      this.photoPreview = null;
    },
    editPlay(player) {
      this.editingPlayer = { ...player }; // Clonar objeto para no mutar el original
    },
    cancelPlayerEdit() {
      this.editingPlayer = null;
    },
    async savePlayerChanges() {
      if (!this.editingPlayer) return;

      try {
        const playerRef = doc(db, 'players', this.editingPlayer.id);
        await updateDoc(playerRef, {
          name: this.editingPlayer.name,
          description: this.editingPlayer.description,
          // Añade aquí otros campos que desees editar
        });
        // Actualiza la lista de jugadores después de editar
        this.fetchPlayers();
        this.editingPlayer = null; // Limpia la variable de edición
      } catch (error) {
        console.error('Error al guardar cambios del jugador:', error);
      }
    },
    openPreviewModal() {
      this.showPreviewModal = true;
    },
    closePreviewModal() {
      this.showPreviewModal = false;
    },
    savePhoto() {
      // Lógica para guardar la foto en Firebase
      // Aquí podrías añadir la lógica para guardar la foto en Firebase
      // y manejar cualquier otra acción necesaria después de guardar la foto
      this.closePreviewModal();
    },
  },
  mounted() {
    // Suscribirse al estado de autenticación para manejar cambios de usuario
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await this.loadUserData(); // Actualiza los datos del usuario al cambiar el estado de autenticación
      }
    });
  },
};
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
