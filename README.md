¿De qué se trata el proyecto?
- El proyecto es una plataforma web para gestionar jugadas deportivas. Los usuarios pueden ver, crear y editar jugadas, así como gestionar su perfil y participar en un foro. Además, permite la carga y recorte de imágenes, autenticación de usuarios, y comentarios en las jugadas.

¿Qué funcionalidades están implementadas?
- Gestión de Jugadas (Listado de jugadas, detalles de jugadas con imágenes y comentarios, creación y edición de jugadas.)
- Gestión de Perfiles (Ver y editar perfil del usuario, cargar y recortar fotos de perfil, cambiar contraseña.)
- Autenticación (Registro y login de usuarios, recuperación de contraseña, cierre de sesión.)
- Interacción Social (Participación en un foro, comentarios en jugadas.)

¿Qué tecnologías se utilizaron, qué comandos son necesarios ejecutar para instalarlas, y qué pasos son necesarios para correr el trabajo?
- Tecnologías Utilizadas:
    Frontend: Vue.js 3, Tailwind CSS.
    Backend: Firebase (Authentication, Firestore, Storage).

- Comandos para instalar:
    Instalar Node.js y npm.
    Crear proyecto Vue.js:  npm install -g @vue/cli _ vue create nombre-del-proyecto _ cd nombre-del-proyecto.
    Instalar Tailwind CSS:  npm install -D tailwindcss _ npx tailwindcss init.
    Instalar Firebase:      npm install firebase.

- Correr el proyecto:       npm run serve.