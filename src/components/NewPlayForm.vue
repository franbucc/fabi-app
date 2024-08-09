<template>
    <div v-if="showForm && isAdmin" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <form @submit.prevent="addPlay"
            class="bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg rounded-lg p-8 mb-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col">

            <!-- Campos principales de la jugada -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 flex-grow">
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
                            'text-2xl cursor-pointer mr-1',
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
            </div>
            <p class="text-right mb-4">Tamaño recomendado: 720px x 500px.</p>
            <!-- Campos para Pasos -->
            <div v-for="(step, index) in steps" :key="index" class="mb-6">
                <label :for="'step_image_' + index" class="block text-gray-900 text-lg font-semibold mb-2">Imagen del
                    Paso #{{ index + 1 }}:</label>
                <div class="flex items-center justify-center w-60 h-40 mb-4">
                    <label :for="'step_image_' + index" class="w-60 h-40 cursor-pointer relative block">
                        <div
                            class="w-70 h-40 overflow-hidden rounded-lg border-2 border-orange-400 bg-white shadow-lg transition-transform transform hover:scale-105">
                            <img v-if="step && step.photoUrl" :src="step.photoUrl"
                                :alt="'Paso #' + (index + 1) + ' Imagen'" class="mb-5 w-full h-full object-cover">
                            <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
                                <svg class="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </div>
                        </div>
                        <input :id="'step_image_' + index" type="file" accept="image/*" class="hidden"
                            @change="e => handleStepPhotoUpload(e, index)">
                    </label>
                </div>
                <label :for="'step_description_' + index">Descripción del paso #{{ index + 1 }}</label>
                <textarea v-model="steps[index].description" :id="'step_description_' + index" rows="2"
                    class="w-full px-4 py-2 my-2 border-2 border-orange-300 rounded-lg shadow-md transition duration-300"
                    placeholder="Escribe tu descripción...." required></textarea>
            </div>

            <!-- Botones -->
            <div class="flex justify-end gap-4">
                <button type="submit"
                    class="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-lg hover:bg-orange-600 transition duration-300 focus:outline-none">
                    {{ isAdding ? 'Agregando Jugada...' : 'Agregar Jugada' }}
                </button>

                <button type="button" @click="closeForm"
                    class="px-6 py-3 bg-gray-300 text-gray-700 font-bold rounded-lg shadow-lg hover:bg-gray-400 transition duration-300 focus:outline-none">
                    Cerrar Ventana
                </button>
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
            hover: [false, false, false, false, false],
            play_type: 'Ofensiva',
            steps: [
                { photo: null, photoUrl: '', description: '' },
                { photo: null, photoUrl: '', description: '' },
                { photo: null, photoUrl: '', description: '' }
            ],
            isAdding: false, // Nuevo estado
        };
    },
    methods: {
        closeForm() {
            this.$emit('closeForm');
        },
        async handleStepPhotoUpload(event, index) {
            const file = event.target.files[0];
            if (file) {
                console.log(`File selected for step ${index}:`, file); // Verificar el archivo seleccionado

                const image = new Image();
                const reader = new FileReader();
                reader.onload = (e) => {
                    image.src = e.target.result;
                };
                reader.readAsDataURL(file);

                image.onload = async () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    const canvasWidth = 720;
                    const canvasHeight = 500;
                    const aspectRatio = 5 / 4;

                    let drawWidth, drawHeight, offsetX, offsetY;

                    if (image.width / image.height > aspectRatio) {
                        drawWidth = image.height * aspectRatio;
                        drawHeight = image.height;
                        offsetX = (image.width - drawWidth) / 2;
                        offsetY = 0;
                    } else {
                        drawWidth = image.width;
                        drawHeight = image.width / aspectRatio;
                        offsetX = 0;
                        offsetY = (image.height - drawHeight) / 2;
                    }

                    canvas.width = canvasWidth;
                    canvas.height = canvasHeight;

                    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight, 0, 0, canvasWidth, canvasHeight);

                    canvas.toBlob(async (blob) => {
                        const uniqueFileName = `${Date.now()}_${file.name}`;
                        const url = await this.uploadImage(blob, uniqueFileName);
                        this.steps[index] = { ...this.steps[index], photoUrl: url };
                        console.log(`Step ${index} photo URL set:`, this.steps[index].photoUrl); // Verificar la URL
                    }, 'image/jpeg');
                };
            }
        },
        async uploadImage(blob, fileName) {
            const storageRef = ref(storage, `images/${fileName}`);
            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        },
        async addPlay() {
            this.isAdding = true; // Cambia el estado a true al iniciar el proceso
            try {
                const stepUrls = await Promise.all(this.steps.map(async (step) => {
                    if (step.photoUrl && step.photoUrl.startsWith('blob:')) {
                        const file = await fetch(step.photoUrl).then(res => res.blob());
                        const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.jpeg`;
                        const url = await this.uploadImage(file, uniqueFileName);
                        return url;
                    }
                    return step.photoUrl;
                }));

                const newPlay = {
                    name: this.name,
                    description: this.description,
                    play_type: this.play_type,
                    play_level: this.play_level,
                    steps: this.steps.map((step, index) => ({
                        ...step,
                        photoUrl: stepUrls[index] || step.photoUrl, // Usa el URL de imagen subido si existe
                    })),
                };

                const docRef = await addDoc(collection(db, 'players'), newPlay);
                console.log('Document written with ID: ', docRef.id);
                this.$emit('play-added', { ...newPlay, id: docRef.id });
                this.closeForm();
            } catch (error) {
                console.error('Error adding play: ', error);
            } finally {
                this.isAdding = false; // Cambia el estado a false al finalizar
            }
        },
        setDifficulty(level) {
            this.play_level = level;
        }
    }
};
</script>



<style scoped>
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
    outline: none;
    border-color: #F97316;
    box-shadow: 0 0 0 2px rgba(249, 115, 29, 0.3);
}
</style>
