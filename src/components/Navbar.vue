<template>
  <header class="bg-gray-900">
    <nav class="mx-auto flex max-w-9xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Fabi</span>
          <img class="h-8 w-auto" src="../../logotipo_fabi.png" alt="" />
        </a>
      </div>

      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
          @click="mobileMenuOpen = true">
          <span class="sr-only">Abrir menú principal</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <a href="#" class="text-sm font-semibold leading-6 text-gray-300">Inicio</a>

        <Popover class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-300">
            <router-link to="/jugadas">Jugadas</router-link>
            <!-- <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" /> -->
          </PopoverButton>

          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel
              class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-gray-800 shadow-lg ring-1 ring-gray-900/5">
              <div class="p-4">
                <div v-for="item in products" :key="item.name"
                  class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-700">
                  <div
                    class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-700 group-hover:bg-gray-600">
                    <component :is="item.icon" class="h-6 w-6 text-gray-400 group-hover:text-orange-400"
                      aria-hidden="true" />
                  </div>
                  <div class="flex-auto">
                    <a :href="item.href" class="block font-semibold text-gray-300">
                      {{ item.name }}
                      <span class="absolute inset-0" />
                    </a>
                    <p class="mt-1 text-gray-500">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>

        <router-link to="/chat">
          <a href="#" class="text-sm font-semibold leading-6 text-gray-300">Foros</a>
        </router-link>

        <a href="#" class="text-sm font-semibold leading-6 text-gray-300">¿Qué es Fabi?</a>
      </PopoverGroup>

      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <router-link to="/iniciar-sesion" v-if="!authUser">
          <a href="#"
            class="text-sm font-semibold leading-6 text-white bg-[#de4b13] py-2 px-4 rounded transition duration-300 hover:bg-[#f57c00]">
            Login <span aria-hidden="true">&rarr;</span>
          </a>
        </router-link>

        <router-link to="/perfil">
          <p v-if="authUser" class="pt-2.5 mr-7 text-sm font-light text-gray-400">Hola, {{ authUser.displayName }}</p>
        </router-link>

        <!-- Profile dropdown -->
        <Menu as="div" class="relative" v-if="authUser">
          <div>
            <MenuButton
              class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="absolute -inset-1.5" />
              <span class="sr-only">Open user menu</span>
              <img class="h-10 w-10 rounded-full object-cover" :src="authUser.photoURL || '../../isotipo_fabi.png'"
                alt="Foto de perfil" />
            </MenuButton>
          </div>
          <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem v-slot="{ active }">
              <router-link to="/perfil">
                <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Mi
                  Perfil</a>
              </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link to="/configuracion">
              <a href="#"
                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Configuración</a>
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
              <a href="#" @click="handleLogout"
                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Cerrar Sesión</a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </nav>

    <!-- MENU BURGER -->
    <transition name="fade-slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <Dialog v-if="mobileMenuOpen" @close="mobileMenuOpen = false" class="lg:hidden" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-10 bg-black opacity-50" @click="closeMenu"></div>
        <DialogPanel
          class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Fabi</span>
              <img v-if="!authUser" class="h-8 w-auto" src="../../logotipo_fabi.png" alt="Logo de Fabi" />
              <img v-if="authUser" class="h-10 w-9 rounded-full" :src="authUser.photoURL || '../../isotipo_fabi.png'"
                alt="Foto de perfil" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-300" @click="closeMenu">
              <span class="sr-only">Cerrar menú</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/25">
              <div class="space-y-2 py-6">
                <router-link to="/">
                  <a class="-mx-3 block rounded-lg my-1 py-2 px-3 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                    @click="closeMenu">
                    Inicio
                  </a>
                </router-link>

                <router-link to="/jugadas">
                  <a class="-mx-3 block rounded-lg my-1 py-2 px-3 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                    @click="closeMenu">
                    Jugadas
                  </a>
                </router-link>

                <router-link to="/chat">
                  <a href="#"
                    class="-mx-3 block rounded-lg my-1 py-2 px-3 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                    @click="closeMenu">
                    Foros
                  </a>
                </router-link>

                <a href="#"
                  class="-mx-3 block rounded-lg my- py-2 px-3 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                  @click="closeMenu">
                  ¿Qué es Fabi?
                </a>

              </div>
              <div class="py-6">
                <router-link to="/iniciar-sesion" v-if="!authUser">
                  <a href="#"
                    class="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-white bg-[#de4b13] transition duration-300 hover:bg-[#f57c00]"
                    @click="closeMenu">
                    Login
                  </a>
                </router-link>
                <Menu as="div" class="relative" v-if="authUser">
                  <router-link to="/perfil">
                    <a class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                      @click="closeMenu">
                      Mi Perfil
                    </a>
                  </router-link>

                  <router-link to="/configuracion">
                    <a class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                      @click="closeMenu">
                      Configuración
                    </a>
                  </router-link>
                  <router-link to="/">
                    <a class="-mx-3 block rounded-lg py-2 px-3 mt-5 text-base font-semibold leading-7 text-red-300 bg-red-700 hover:bg-red-800"
                      @click="handleLogout">
                      Cerrar Sesión
                    </a>
                  </router-link>
                  <div>
                    <MenuButton
                      class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span class="absolute -inset-1.5" />
                      <span class="sr-only">Abrir menú de</span>

                    </MenuButton>
                  </div>
                  <transition name="fade-slide">
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                      <router-link to="/perfil">
                        <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                          @click="closeMenu">
                          Mi Perfil
                        </a>
                      </router-link>
                      <router-link to="/configuracion">
                      <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                        @click="closeMenu">
                        Configuración
                      </a>
                    </router-link>

                      <a href="#" @click="handleLogout; closeMenu"
                        :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                        Cerrar Sesión
                      </a>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </transition>


  </header>
</template>

<script setup>
import { ref } from 'vue';
import { Popover, PopoverButton, PopoverPanel, PopoverGroup } from '@headlessui/vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Dialog, DialogPanel } from '@headlessui/vue';
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useRouter } from 'vue-router';

// Para el menú desplegable
// const products = [
//   {
//     name: 'Ofensivas',
//     description: 'Jugadas ofensivas',
//     href: '/jugadas/ofensivas',
//     icon: Bars3Icon,
//   },
//   {
//     name: 'Defensivas',
//     description: 'Jugadas defensivas',
//     href: '/jugadas/defensivas',
//     icon: Bars3Icon,
//   },
//   {
//     name: 'Clutch',
//     description: 'Jugadas Clutch',
//     href: '/jugadas/clutch',
//     icon: Bars3Icon,
//   },
// ];

// Para el manejo del estado de autenticación
const authUser = ref(null);
const mobileMenuOpen = ref(false);
const router = useRouter();

onAuthStateChanged(auth, (user) => {
  authUser.value = user ? user : null;
});

// Función para manejar el cierre de sesión
const handleLogout = async () => {
  try {
    await signOut(auth);
    router.push('/');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

function closeMenu() {
  mobileMenuOpen.value = false;
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter,
.fade-slide-leave-to

/* .fade-slide-leave-active en versiones anteriores */
  {
  opacity: 0;
  transform: translateX(100%);
}
</style>