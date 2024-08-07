<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-600 to-orange-400">
    <!-- Contenedor principal del formulario -->
    <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 mx-4">
      <div class="text-center">
        <img src="/isotipo_fabi.png" alt="Imagen de perfil" class="w-20 h-20 rounded-full mx-auto mb-6">
        <MainH1 class="text-3xl mb-6">Ingresar con tu Cuenta</MainH1>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4 relative">
          <MainLabel for="email">Email</MainLabel>
          <i class="far fa-envelope input-icon-email"></i>
          <MainInput
            type="email"
            id="email"
            :readonly="loading"
            v-model="user.email"
            class="block w-full pl-12 pr-3 py-2 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50"
            placeholder="Correo electrónico"
          />
        </div>
        <div class="mb-6 relative">
          <MainLabel for="password">Contraseña</MainLabel>
          <i class="fas fa-lock input-icon-password"></i>
          <MainInput
            type="password"
            id="password"
            :readonly="loading"
            v-model="user.password"
            class="block w-full pl-12 pr-3 py-2 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50"
            placeholder="Contraseña"
          />
          <div class="mt-2">
            <router-link to="/olvide-contrasena" class="text-sm text-blue-500 hover:underline">¿Olvidaste tu contraseña?</router-link>
          </div>
        </div>
        <MainButton type="submit" class="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
          <Loader v-if="loading" />
          <template v-else>Ingresar</template>
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
          <span>Iniciar con Google</span>
        </button>
      </div>
      <div class="mt-5 text-center">
      <p>¿No tienes una cuenta? <router-link to="/registro" class="text-sm text-blue-500 hover:underline">Registrate</router-link></p> 
    </div>
    </div>
    
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import Loader from '../components/Loader.vue';
import MainButton from '../components/MainButton.vue';
import MainH1 from '../components/MainH1.vue';
import MainInput from '../components/MainInput.vue';
import MainLabel from '../components/MainLabel.vue';
import { login } from '../services/auth';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


export default {
  name: "Login",
  components: { MainH1, MainLabel, MainButton, MainInput, Loader },
  setup() {
    const user = reactive({
      email: '',
      password: '',
    });
    const loading = ref(false);
    const toast = useToast();
    const router = useRouter();

    const handleSubmit = async () => {
      // Validar los campos antes de proceder
      if (!user.email || !user.password) {
        toast.error('Por favor completa todos los campos.');
        return;
      }

      loading.value = true;
      const loadingToast = toast.info('Cargando... Iniciando sesión...', {
        timeout: false,
      });

      try {
        await login(user.email, user.password);
        toast.success('Inicio de sesión exitoso.', {
          timeout: 5000,
        });
        router.push({ path: '/perfil' });
      } catch (error) {
        toast.error('Error al iniciar sesión.');
      } finally {
        loading.value = false;
        toast.dismiss(loadingToast);
      }
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
    return { user, loading, handleSubmit, signInWithGoogle };
  }
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
  left: 0.75rem; /* Ajusta la posición horizontal del ícono */
  top: 50%; /* Ajusta la posición vertical del ícono */
  transform: translateY(-50%);
  color: #f6ad55; /* Cambia el color a naranja */
}
.input-icon-email {
  position: absolute;
  left: 0.75rem; /* Ajusta la posición horizontal del ícono */
  top: 73%; /* Ajusta la posición vertical del ícono */
  transform: translateY(-50%);
  color: #f6ad55; /* Cambia el color a naranja */
}
</style>
