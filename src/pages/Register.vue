<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-600 to-orange-400">
    <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 mx-4">
      <form @submit.prevent="handleSubmit">
        <!-- Existing form fields -->
        <div class="text-center mb-9">
          <div class="relative inline-block">
            <label for="photoURL"
              class="h-24 w-24 bg-gray-300 rounded-full cursor-pointer flex items-center justify-center">
              <input type="file" id="photoURL" class="hidden" @change="handleFileSelection" />
              <img v-if="photoPreview" :src="photoPreview" alt="Preview"
                class="h-full w-full object-cover rounded-full">
              <span v-else class="text-gray-500">Añadir Foto</span>
            </label>
          </div>
          <MainH1 class="text-3xl mt-6 text-center">Crear una Cuenta</MainH1>
        </div>

        <!-- Form Fields -->
        <div class="mb-4 relative">
          <MainLabel for="displayName">Nombre</MainLabel>
          <i class="fas fa-user input-icon-email"></i>
          <MainInput type="text" id="displayName" :readonly="loading" v-model="user.displayName"
            class="block w-full pl-12 pr-3 py-2 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50"
            placeholder="Nombre" />
        </div>

        <div class="mb-4 relative">
          <MainLabel for="email">Email</MainLabel>
          <i class="far fa-envelope input-icon-email"></i>
          <MainInput type="email" id="email" :readonly="loading" v-model="user.email"
            class="block w-full pl-12 pr-3 py-2 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50"
            placeholder="Email" />
        </div>

        <div class="mb-6 relative">
          <MainLabel for="password">Contraseña</MainLabel>
          <i class="fas fa-lock input-icon-password"></i>
          <MainInput type="password" id="password" :readonly="loading" v-model="user.password"
            class="block w-full pl-12 pr-3 py-2 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50"
            placeholder="Contraseña" />
        </div>

        <MainButton type="submit"
          class="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
          <Loader v-if="loading" />
          <template v-else>Crear Cuenta</template>
        </MainButton>

        
      </form>

      <div class="flex items-center justify-center my-8 relative">
        <div class="flex items-center text-center w-full">
          <!-- Línea izquierda -->
          <div class="border-t border-gray-300 flex-grow"></div>
          <!-- Texto centrado -->
          <p class="mx-4 text-gray-700">O ingresá con</p>
          <!-- Línea derecha -->
          <div class="border-t border-gray-300 flex-grow"></div>
        </div>
      </div>

      <!-- Google Sign-In Button -->
      <div class="mt-4 text-center">
        <button @click="signInWithGoogle"
          class="w-full bg-white border border-gray-300 hover:bg-gray-800 hover:text-white text-blue-500 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center space-x-2">
          <img src="../../google-logo.png" alt="Google Logo" class="h-6">
          <span>Registrate con Google</span>
        </button>

      </div>

      <div class="mt-5 mb-5 text-center">
          <p>¿Ya tienes una cuenta? <router-link to="/iniciar-sesion"
              class="text-sm text-blue-500 hover:underline">Iniciar
              Sesión</router-link></p>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Loader from '../components/Loader.vue';
import MainButton from '../components/MainButton.vue';
import MainH1 from '../components/MainH1.vue';
import MainInput from '../components/MainInput.vue';
import MainLabel from '../components/MainLabel.vue';
import { register, updateProfile } from '../services/auth';
import { useToast } from 'vue-toastification';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../services/firebase';
import { auth } from '../services/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default {
  name: "Register",
  components: { MainH1, MainLabel, MainButton, MainInput, Loader },
  setup() {
    const user = reactive({
      displayName: '',
      email: '',
      password: '',
    });
    const loading = ref(false);
    const toast = useToast();
    const router = useRouter();
    const photo = ref(null);
    const photoPreview = ref(null);

    const handleFileSelection = (event) => {
      photo.value = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        photoPreview.value = reader.result;
      });
      reader.readAsDataURL(photo.value);
    };

    const signInWithGoogle = (event) => {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        const result = signInWithPopup(auth, provider);
        const user = result.user;
        console.log('Usuario logueado con Google:', user);
        // Redirige o realiza otras acciones después del inicio de sesión exitoso
      } catch (error) {
        console.error('Error al autenticar con Facebook:', error);
      }
    }

    const handleSubmit = async () => {
      // Validar los campos antes de proceder
      if (!user.displayName || !user.email || !user.password) {
        toast.error('Por favor completa todos los campos.');
        return;
      }

      loading.value = true;
      const loadingToast = toast.info('Cargando... Registrando...', {
        timeout: false,
      });

      try {
        await register(user.email, user.password, user.displayName);

        let photoURL = '/isotipo_fabi.png'; // Foto por defecto

        if (photo.value) {
          const currentUser = auth.currentUser;
          const storageReference = storageRef(storage, `profile_photos/${currentUser.uid}`);
          await uploadBytes(storageReference, photo.value);
          photoURL = await getDownloadURL(storageReference);
          await updateProfile(currentUser, { photoURL });
        }

        toast.success('Registro exitoso.', {
          timeout: 5000,
        });
        router.push({ path: '/perfil' });
      } catch (error) {
        toast.error('Error al registrar.');
      } finally {
        loading.value = false;
        toast.dismiss(loadingToast);
      }
    };

    return { user, loading, handleSubmit, handleFileSelection, photoPreview, signInWithGoogle };
  },
};
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.mx-4 {
  margin-left: 1rem;
  margin-right: 1rem;
}

form {
  margin-top: 2rem;
}

.MainButton {
  transition: background-color 0.3s ease;
}

.MainButton:hover {
  background-color: #e55146;
}

.bg-gradient-to-r {
  background: linear-gradient(to right, var(--tw-gradient-stops));
}

.from-orange-400 {
  --tw-gradient-from: #f6ad55;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(246, 173, 85, 0));
}

.to-orange-600 {
  --tw-gradient-to: #dd6b20;
}

.input-icon-password {
  position: absolute;
  left: 0.75rem;
  /* Ajusta la posición horizontal del ícono */
  top: 73%;
  /* Ajusta la posición vertical del ícono */
  transform: translateY(-50%);
  color: #f6ad55;
  /* Cambia el color a naranja */
}

.input-icon-email {
  position: absolute;
  left: 0.75rem;
  /* Ajusta la posición horizontal del ícono */
  top: 73%;
  /* Ajusta la posición vertical del ícono */
  transform: translateY(-50%);
  color: #f6ad55;
  /* Cambia el color a naranja */
}
</style>
