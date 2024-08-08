<template>
    <div v-if="showForm && isAdmin" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <form @submit.prevent="addPlayer"
            class="bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg rounded-lg p-8 mb-4 max-w-4xl w-full">
            <div class="mb-6">
                <label for="photo" class="block text-gray-900 text-lg font-semibold mb-2">Foto de la Jugada:</label>
                <div class="flex items-center justify-center w-60 h-40 mb-4">
                    <label for="photo" class="w-60 h-40 cursor-pointer relative block">
                        <div
                            class="w-70 h-40 overflow-hidden rounded-lg border-2 border-orange-400 bg-white shadow-lg transition-transform transform hover:scale-105">
                            <img v-if="photoUrl" :src="photoUrl" alt="Foto de la jugada"
                                class="w-full h-full object-cover">
                            <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
                                <svg class="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </div>
                        </div>
                        <input type="file" id="photo" accept="image/*" class="hidden" @change="handlePhotoUpload">
                    </label>
                </div>
                <p>Tamaño recomendado: 720px x 480px.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="mb-4">
                    <label for="name" class="block text-gray-900 text-lg font-semibold mb-2">Nombre de la
                        Jugada:</label>
                    <input v-model="name" id="name" type="text"
                        class="w-full px-4 py-2 border-2 border-orange-300 rounded-lg shadow-md transition duration-300"
                        required>
                </div>
                <div class="mb-4">
                    <label for="play_level" class="block text-gray-900 text-lg font-semibold mb-2">Nivel de
                        Dificultad:</label>
                    <div class="flex items-center">
                        <font-awesome-icon v-for="i in 5" :key="i" :icon="['fas', 'basketball-ball']" :class="[
                            'text-2xl cursor-pointer mr-1', /* Agregar margen a la derecha */
                            i <= play_level ? 'text-yellow-500' : 'text-gray-400',
                            hover[i - 1] ? 'text-orange-500' : ''
                        ]" @click="setDifficulty(i)" @mouseover="hover[i - 1] = true"
                            @mouseleave="hover[i - 1] = false" />
                    </div>
                </div>
                <div class="mb-4 col-span-2">
                    <label for="description" class="block text-gray-900 text-lg font-semibold mb-2">Descripción de la
                        Jugada:</label>
                    <textarea v-model="description" id="description" rows="4"
                        class="w-full px-4 py-2 border-2 border-orange-300 rounded-lg shadow-md transition duration-300"
                        required></textarea>
                </div>
                <div class="mb-4 col-span-2">
                    <label for="play_type" class="block text-gray-900 text-lg font-semibold mb-2">Tipo de
                        Jugada:</label>
                    <select v-model="play_type" id="play_type"
                        class="w-full px-4 py-2 border-2 border-orange-300 rounded-lg shadow-md transition duration-300"
                        required>
                        <option value="Ofensiva">Ofensiva</option>
                        <option value="Defensiva">Defensiva</option>
                        <option value="Clutch">Clutch</option>
                    </select>
                </div>
                <div class="flex justify-end gap-4">
                    <button type="submit"
                        class="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-lg hover:bg-orange-600 transition duration-300 focus:outline-none">
                        Agregar Jugada
                    </button>
                    <button type="button" @click="closeForm"
                        class="px-6 py-3 bg-gray-300 text-gray-700 font-bold rounded-lg shadow-lg hover:bg-gray-400 transition duration-300 focus:outline-none">
                        Cerrar Ventana
                    </button>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../services/firebase';

export default {
    props: {
        isAdmin: {
            type: Boolean,
            required: true
        },
        showForm: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            name: '',
            play_level: '',
            description: '',
            photo: null,
            photoUrl: '',
            hover: [false, false, false, false, false],
            play_type: 'Ofensiva',
        };
    },
    methods: {
        closeForm() {
            this.$emit('closeForm');
        },
        async addPlayer() {
            try {
                if (!this.photoUrl) {
                    throw new Error("No se ha cargado ninguna foto.");
                }

                const storageRef = ref(storage, `players/${this.photo.name}`);
                await uploadBytes(storageRef, this.photo);
                this.photoUrl = await getDownloadURL(storageRef);

                const newPlayer = {
                    name: this.name,
                    play_level: this.play_level,
                    description: this.description,
                    photoUrl: this.photoUrl,
                    play_type: this.play_type,
                };

                await addDoc(collection(db, 'players'), newPlayer);

                this.$emit('playerAdded', newPlayer);

                this.name = '';
                this.play_level = '';
                this.description = '';
                this.photo = null;
                this.photoUrl = '';
                this.play_type = 'Ofensiva';

                this.closeForm();
            } catch (error) {
                console.error("Error adding player: ", error);
            }
        },
        async handlePhotoUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const image = new Image();
                const reader = new FileReader();
                reader.onload = (e) => {
                    image.src = e.target.result;
                };
                reader.readAsDataURL(file);

                image.onload = () => {
                    // Crear un canvas para recortar la imagen
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Establecer las dimensiones del canvas con proporción 4:3
                    const canvasWidth = 1440;
                    const canvasHeight = 960;
                    const aspectRatio = 4 / 3;

                    // Calcular el tamaño y posición del recorte
                    let drawWidth, drawHeight, offsetX, offsetY;

                    if (image.width / image.height > aspectRatio) {
                        // Imagen es más ancha en comparación con el canvas
                        drawWidth = image.height * aspectRatio;
                        drawHeight = image.height;
                        offsetX = (image.width - drawWidth) / 2;
                        offsetY = 0;
                    } else {
                        // Imagen es más alta en comparación con el canvas
                        drawWidth = image.width;
                        drawHeight = image.width / aspectRatio;
                        offsetX = 0;
                        offsetY = (image.height - drawHeight) / 2;
                    }

                    // Ajustar dimensiones del canvas
                    canvas.width = canvasWidth;
                    canvas.height = canvasHeight;

                    // Dibujar la imagen recortada en el canvas
                    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight, 0, 0, canvasWidth, canvasHeight);

                    // Convertir el canvas a un Blob para cargarlo
                    canvas.toBlob((blob) => {
                        this.photo = blob;
                        this.photoUrl = URL.createObjectURL(blob);
                    }, 'image/jpeg'); // Puedes ajustar el tipo de imagen según necesites
                };
            }
        },

        setDifficulty(level) {
            this.play_level = level;
        },
    },
};
</script>

<style scoped>
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
    outline: none;
    /* Elimina el contorno por defecto */
    border-color: #F97316;
    /* Color naranja de Tailwind */
    box-shadow: 0 0 0 2px rgba(249, 115, 29, 0.3);
    /* Agrega una sombra opcional para mejor visibilidad */
}
</style>
