<template>
  <Navbar />
  <router-view />
  <Footer />
  <!-- <div>
    
    
    <div v-if="menuOpen" class="lg:hidden fixed inset-0 bg-gray-800 bg-opacity-80 flex flex-col items-center justify-center text-white">
      <ul class="flex flex-col gap-6 items-center">
        <li><router-link to="/" @click="toggleMenu">Inicio</router-link></li>
        <li><router-link to="/plays" @click="toggleMenu">Jugadas</router-link></li>
        <li><router-link to="/chat" @click="toggleMenu">Foro</router-link></li>
        <template v-if="authUser.id === null">
          <li><router-link to="/iniciar-sesion" @click="toggleMenu">Iniciar Sesión</router-link></li>
          <li><router-link to="/registro" @click="toggleMenu">Registrarse</router-link></li>
        </template>
        <template v-else>
          <li><router-link to="/perfil" @click="toggleMenu">Cuenta</router-link></li>
          <li>
            <form @submit.prevent="handleLogout">
              <button class="bg-white text-black py-2 px-4 rounded transition duration-300 hover:bg-gray-200">
                {{ authUser.displayName }} (Cerrar Sesión)
              </button>
            </form>
          </li>
        </template>
      </ul>
    </div>
    
    <main class="w-full">
    </main>

    <footer class="bg-gray-900 text-white flex justify-center items-center h-24">
      <p>&copy; Da Vinci 2024. Todos los derechos reservados.</p>
    </footer>
  </div> -->
</template>

<script>
import { logout, subscribeToAuth } from './services/auth';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      authUser: {
        id: null,
        email: null,
        displayName: null,
      },
      menuOpen: false
    };
  },
  methods: {
    handleLogout() {
      logout();
      this.$router.push({ path: '/iniciar-sesion' });
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  },
  mounted() {
    subscribeToAuth(newUserData => this.authUser = newUserData);
  }
};
</script>

<style scoped>
/* Puedes eliminar estilos específicos ya que Tailwind se encarga de la mayoría de ellos */
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
  font-weight: bold;
}
button {
  cursor: pointer;
}
</style>
