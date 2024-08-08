<template>
    <footer class="w-full py-14 mt-7">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto">
                <a href="#" class="flex justify-center ">
                    <img src="../../logotipo_fabi.png" alt="Logotipo de Fabi">
                </a>
                <ul
                    class="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-16 mb-10 border-b border-gray-200">

                    <router-link to="/">
                        <li>
                            <a href="#" class="text-gray-800 transition-colors hover:text-orange-500">Inicio</a>
                        </li>
                    </router-link>
                    <router-link to="/jugadas">
                        <li>
                            <a href="#" class=" text-gray-800 transition-colors hover:text-orange-500">Jugadas</a>
                        </li>
                    </router-link>
                    <router-link to="/chat">
                        <li><a href="#" class=" text-gray-800 transition-colors hover:text-orange-500">Foros</a></li>
                    </router-link>
                    <router-link to="/perfil">
                        <li><a href="#" class=" text-gray-800 transition-colors hover:text-orange-500">Mi Perfil</a>
                        </li>
                    </router-link>
                </ul>
                <div class="flex space-x-10 justify-center items-center mb-14">
                    <a href="#" class="block text-gray-900 transition-colors duration-500 hover:text-orange-600">
                        <i class="fa-brands fa-x-twitter text-3xl"></i>
                    </a>
                    <a href="#" class="block text-gray-900 transition-colors duration-500 hover:text-orange-600">
                        <i class="fa-brands fa-instagram text-3xl"></i>
                    </a>
                    <a href="#" class="block text-gray-900 transition-colors duration-500 hover:text-orange-600">
                        <i class="fa-brands fa-facebook-f text-3xl"></i>
                    </a>
                    <a href="#" class="block text-gray-900 transition-colors duration-500 hover:text-orange-600">
                        <i class="fa-brands fa-youtube text-3xl"></i>
                    </a>

                </div>
                <span class="text-lg text-gray-500 text-center block">© Fabi 2024. Todos los derechos reservados.</span>
            </div>
        </div>
    </footer>
</template>