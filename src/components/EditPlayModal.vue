<template>
    <transition name="fade">
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
        <div @click.self="closeModal" class="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 class="text-2xl font-bold mb-6">Editar Jugador</h2>
            <form @submit.prevent="saveChanges">
                <div class="mb-6">
                    <label for="name" class="block text-gray-700 text-lg">Nombre</label>
                    <input v-model="player.name" id="name" type="text"
                        class="w-full p-3 border border-gray-300 rounded">
                </div>
                <div class="mb-6">
                    <label for="description" class="block text-gray-700 text-lg">Descripción</label>
                    <textarea v-model="player.description" id="description"
                        class="w-full h-32 p-3 border border-gray-300 rounded resize-none"></textarea>
                </div>
                <div class="flex justify-end space-x-3">
                    <button type="submit"
                        class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded">Guardar</button>
                    <button @click="closeModal" type="button"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-5 rounded">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</transition>


</template>

<script>
export default {
    props: {
        showModal: Boolean,
        player: Object
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        saveChanges() {
            this.$emit('save', this.player);
            this.closeModal();
        }
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>