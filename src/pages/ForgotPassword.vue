<!-- ForgotPassword.vue -->

<template>
    <div>
        <MainH1>Olvidé mi contraseña</MainH1>
        
        <form @submit.prevent="handleResetPassword">
            <div class="mb-3">
                <MainLabel for="email">Email</MainLabel>
                <MainInput type="email" id="email" v-model="email" />
            </div>
            <MainButton type="submit">Enviar correo de restablecimiento</MainButton>
        </form>
    </div>
</template>

<script>
import MainButton from '../components/MainButton.vue';
import MainH1 from '../components/MainH1.vue';
import MainInput from '../components/MainInput.vue';
import MainLabel from '../components/MainLabel.vue';
import { sendPasswordResetEmail } from 'firebase/auth'; // Asegúrate de importar sendPasswordResetEmail desde firebase/auth
import { auth } from '../services/firebase'; // Asegúrate de importar auth desde tus servicios de firebase

export default {
  name: 'ForgotPassword',
  components: { MainH1, MainButton, MainInput, MainLabel },
  data() {
    return {
      email: '',
    };
  },
  methods: {
    async handleResetPassword() {
      try {
        await sendPasswordResetEmail(auth, this.email);
        console.log('Correo de restablecimiento enviado correctamente a:', this.email);
        // Aquí podrías redirigir al usuario a una página de confirmación o mostrar un mensaje de éxito
      } catch (error) {
        console.error('Error al enviar correo de restablecimiento:', error.message);
        // Aquí podrías manejar el error mostrando un mensaje al usuario o realizando alguna acción adicional
      }
    },
  },
};
</script>

<style scoped>
</style>