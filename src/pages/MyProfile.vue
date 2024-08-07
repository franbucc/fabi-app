<template>
  <div class="min-h-screen bg-gradient-to-r from-orange-600 to-orange-400">
    <div class="container mx-auto py-8">
      <div v-if="user" class="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
        <div class="flex items-center space-x-4">
          <!-- Foto de perfil -->
          <div class="relative">
            <label for="photoURL" class="rounded-full overflow-hidden cursor-pointer w-24 h-24 bg-gray-300 border-4 border-white shadow-lg">
              <img v-if="photoPreview || user.photoURL" :src="photoPreview || user.photoURL" alt="Foto de perfil" class="w-24 h-24 object-cover">
              <input type="file" id="photoURL" class="hidden" @change="handleFileSelection">
            </label>
          </div>

          <!-- Información del usuario -->
          <div class="flex-1">
            <h1 class="text-2xl font-bold text-gray-800">{{ user.displayName }}</h1>
            <p class="text-gray-600">{{ user.email }}</p>
            <p v-if="role" class="text-gray-600">Rol: {{ role }}</p>
            <div class="mt-4">
              <div v-if="!editMode">
                <p class="text-lg text-gray-800"><span class="font-semibold">Contraseña:</span> ********</p>
                <div class="mt-4 space-x-2">
                  <MainButton @click="editMode = true" class="bg-blue-500 hover:bg-blue-600">Editar Perfil</MainButton>
                  <MainButton @click="showEditPhotoModal = true" class="bg-orange-500 hover:bg-orange-600">Editar Foto de Perfil</MainButton>
                </div>
              </div>
              <div v-else>
                <div class="flex items-center space-x-2">
                  <input v-model="newName" type="text" class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="Nuevo Nombre">
                  <MainButton @click="saveChanges" class="bg-green-500 hover:bg-green-600">Guardar</MainButton>
                  <MainButton @click="cancelEdit" class="bg-red-500 hover:bg-red-600">Cancelar</MainButton>
                </div>
                <input v-model="newPassword" type="password" class="w-full p-2 border mt-2 border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="Nueva Contraseña">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección de Publicaciones -->
      <div class="mt-8">
        <h2 class="text-3xl font-bold mb-4 text-white">Mis Publicaciones</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="player in players" :key="player.id" class="bg-white rounded-lg shadow-md overflow-hidden">
            <img v-if="player.photoUrl" :src="player.photoUrl" alt="Foto del jugador" class="w-full h-48 object-cover">
            <div class="p-4">
              <h3 class="text-xl font-bold text-gray-800">{{ player.name }}</h3>
              <p class="text-gray-600">{{ player.description }}</p>
              <div class="mt-2 space-x-2">
                <MainButton @click="editPlayer(player)" class="bg-blue-500 hover:bg-blue-600">Editar</MainButton>
                <MainButton @click="confirmDelete(player.id)" class="bg-red-500 hover:bg-red-600">Eliminar</MainButton>
              </div>
              
              <!-- Formulario de Edición -->
              <div v-if="editingPlayer && editingPlayer.id === player.id">
                <input v-model="editingPlayer.name" type="text" class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="Nombre">
                <textarea v-model="editingPlayer.description" class="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="Descripción"></textarea>
                <div class="mt-2 space-x-2">
                  <MainButton @click="savePlayerChanges" class="bg-green-500 hover:bg-green-600">Guardar</MainButton>
                  <MainButton @click="cancelPlayerEdit" class="bg-red-500 hover:bg-red-600">Cancelar</MainButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de Confirmación de Eliminación -->
      <div v-if="showDeleteModal" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
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
      <div v-if="showEditPhotoModal" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div class="bg-white p-8 rounded-md max-w-md">
          <h1 class="text-2xl font-bold mb-4 text-center text-orange-500">Editar Foto de Perfil</h1>
          <div class="flex items-center space-x-4 mb-4">
            <label for="photoURLModal" class="rounded-full overflow-hidden cursor-pointer w-24 h-24 bg-gray-300 border-4 border-white shadow-lg">
              <img v-if="photoPreview" :src="photoPreview" alt="Preview" class="w-24 h-24 object-cover">
              <span v-else class="flex items-center justify-center w-24 h-24 text-gray-500">Seleccionar</span>
              <input type="file" id="photoURLModal" class="hidden" @change="handleFileSelection">
            </label>
            <div class="space-x-2">
              <MainButton :loading="loading" @click="handleUpload" class="bg-orange-500 hover:bg-orange-600">Actualizar Foto</MainButton>
              <MainButton @click="closeEditPhotoModal" class="bg-red-500 hover:bg-red-600">Cancelar</MainButton>
            </div>
          </div>
          <div v-if="loading" class="text-center text-orange-500">Subiendo...</div>
          
        </div>
      </div>

      <!-- Modal de Previsualización de Imagen -->
      <div v-if="showPreviewModal" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div class="bg-white p-8 rounded-md max-w-md">
          <h1 class="text-2xl font-bold mb-4 text-center text-orange-500">Previsualización de Foto de Perfil</h1>
          <div class="flex items-center justify-center mb-4">
            <img :src="photoPreview" alt="Preview" class="w-64 h-64 object-cover">
          </div>
          <div class="flex justify-center">
            <MainButton @click="savePhoto" class="bg-green-500 hover:bg-green-600">Guardar Foto</MainButton>
            <MainButton @click="closePreviewModal" class="bg-red-500 hover:bg-red-600">Cancelar</MainButton>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { onAuthStateChanged, updateProfile, updatePassword } from 'firebase/auth';
import { doc, getDoc, deleteDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import MainButton from '../components/MainButton.vue';

export default {
  name: 'MyProfile',
  components: { MainButton },
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
    };
  },
  created() {
    // Cargar datos del usuario y jugadores al inicio
    this.loadUserData();
    this.fetchPlayers();
  },
  methods: {
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
    editPlayer(player) {
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
